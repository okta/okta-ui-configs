#!/bin/bash

echo "installing node v16.14.0"
if setup_service node v16.14.0; then
  echo "Installed node v16.14.0 successfully"
else
  echo "node v16.14.0 installation failed."
  exit ${FAILED_SETUP}
fi

echo "installing yarn 1.21.1"
if setup_service yarn 1.21.1; then
  echo "Yarn v1.21.1 installed."
else
  echo "Yarn installation failed!"
  exit ${FAILED_SETUP}
fi

cd ${OKTA_HOME}/${REPO}

#!/bin/bash
YARN_REGISTRY=https://registry.yarnpkg.com
OKTA_REGISTRY=${ARTIFACTORY_URL}/api/npm/npm-okta-master

# Yarn does not utilize the npmrc/yarnrc registry configuration
# if a lockfile is present. This results in `yarn install` problems
# for private registries. Until yarn@2.0.0 is released, this is our current
# workaround.
#
# Related issues:
#  - https://github.com/yarnpkg/yarn/issues/5892
#  - https://github.com/yarnpkg/yarn/issues/3330

# Replace yarn artifactory with Okta's
echo "Replacing $YARN_REGISTRY with $OKTA_REGISTRY within yarn.lock files..."
sed -i "s#${YARN_REGISTRY}#${OKTA_REGISTRY}#g" yarn.lock

if ! yarn install; then
  echo "yarn install command failed! Exiting..."
  exit ${FAILED_SETUP}
fi

# Revert the original change
echo "Replacing $OKTA_REGISTRY with $YARN_REGISTRY within yarn.lock files..."
sed -i "s#${OKTA_REGISTRY}#${YARN_REGISTRY}#" yarn.lock
