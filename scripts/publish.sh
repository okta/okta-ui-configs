#!/bin/bash

source ${OKTA_HOME}/${REPO}/scripts/setup.sh

if [ -n "${action_branch}" ];
then
  echo "Publishing from bacon task using branch ${action_branch}"
  TARGET_BRANCH=${action_branch}
else
  echo "Publishing from bacon testSuite using branch ${BRANCH}"
  TARGET_BRANCH=${BRANCH}
fi

function publish_changes() {
  # Find base git reference to build changes since
  if echo "${BRANCH}" | grep -Eq "(^master$)"; then
    CURRENT_BRANCH=`git log HEAD~1 --pretty=format:"%H" -n 50`
    BACON_SHAS=`get_bacon_shas_for_artifact $REPO master`
    BASE_REF=`grep -x -f <(echo "$CURRENT_BRANCH") <(echo "$BACON_SHAS") | head -1`
  else
    CURRENT_BRANCH=`git log --pretty=format:"%H" -n 50`
    MAIN_BRANCH=`git log origin/master --pretty=format:"%H" -n 50`
    BASE_REF=`grep -x -f <(echo "$CURRENT_BRANCH") <(echo "$MAIN_BRANCH") | head -1`
  fi

  # Set Lerna options to perform selective pubish
  if [[ -z $BASE_REF ]]; then
    LERNA_OPTIONS=""
  else
    echo "Publishing changes between $BRANCH...$BASE_REF"
    LERNA_OPTIONS="--since $BASE_REF --include-dependents"
  fi

  # Override default registry
  REGISTRY="${ARTIFACTORY_URL}/api/npm/npm-topic"
  npm config set @okta:registry ${REGISTRY}

  # Build and publish artifacts
  echo "Running publish with lerna ${LERNA_OPTIONS}"
  yarn lerna exec 'ci-append-sha --include-count' ${LERNA_OPTIONS}
  yarn lerna run build ${LERNA_OPTIONS}
  yarn lerna exec 'npm publish --verbose' ${LERNA_OPTIONS} --no-private
  FINAL_PUBLISHED_VERSIONS=$(yarn lerna ls --ndjson ${LERNA_OPTIONS} | grep "^{" | jq -j '.name, "@", .version, "\n"')

  # Upload publish receipt
  if [[ ! -z $FINAL_PUBLISHED_VERSIONS ]]; then
    if upload_job_data global publish_receipt "${FINAL_PUBLISHED_VERSIONS}"; then
      echo "Uploaded publish_receipt to s3!"
    else
      echo "Fail to upload publish_receipt to s3!" >&2
      exit ${BUILD_FAILURE}
    fi

     # Trigger downstream promotion
    if [[ "${TARGET_BRANCH}" == "master" ]]; then
      if ! trigger_and_wait_release_promotion_task 60; then
        echo "Automatic promotion failed..."
        exit ${BUILD_FAILURE}
      fi
    fi
  fi
}

if ! publish_changes; then
  exit ${BUILD_FAILURE}
fi

export TEST_SUITE_TYPE="build"
log_custom_message "Published Versions" "${FINAL_PUBLISHED_VERSIONS}"

exit ${SUCCESS}
