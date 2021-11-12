const { resolve, join, basename, extname } = require('path');
const properties = require('properties');
const { ensureDirSync, ensureFileSync, readFileSync, writeFileSync, removeSync } = require('fs-extra');
const readdir = require('recursive-readdir');
const cachebustUtil = require('./cachebustUtil');

const convert = (baseFiles, propertiesTargetDir) => {
  for (const src of baseFiles) {
    const filename = basename(src);
    const extension = extname(src);
    const source = `${readFileSync(src)}`;

    properties.parse(source, function (error, obj) {
      // eslint-disable-next-line no-console
      if (error) { return console.error(error); }

      const targetFile = join(propertiesTargetDir, filename.replace(extension, '.json'));
      ensureFileSync(targetFile);
      writeFileSync(targetFile, JSON.stringify(obj));
    });
  }
};

/**
 * Get the properties of the file for use in generating the cache-bust mappings.
 *
 * @param src
 * @returns {{name: T, hash: *, extension: string}}
 */
function getFileProperties(src) {
  const filename = src.split('/').pop();

  return {
    name: filename,
    hash: cachebustUtil.md5(src),
    extension: `.${filename.split('.').pop()}`,
  };
}

function cachebustI18nFiles(baseFiles, contentDir, targetDir) {
  // Taken from okta-ui buildtools
  const configFile = `${contentDir}/cacheMap.json`;

  let content = '{';

  baseFiles.forEach(function (src) {
    const fileProps = getFileProperties(src);
    const filename = fileProps.name;
    const hash = fileProps.hash;
    const extension = fileProps.extension;

    if (!cachebustUtil.isCacheBusted(filename)) {
      const srcKey = filename.replace(extension, '');
      const targetKey = `${srcKey}.${hash}`;
      const target = `${targetDir}/${targetKey}${extension}`;

      ensureFileSync(target);
      writeFileSync(target, readFileSync(src));

      content += `"${srcKey}":"${targetKey}",`;
    }
  });

  content = `${content.substr(0, content.length - 1)}}`;
  ensureFileSync(configFile);
  writeFileSync(configFile, content, 'utf8');
}

async function convertPropertiesToJson() {
  const packageDir = process.cwd();
  const enduserPropertiesSourceDir = resolve(packageDir, 'src/properties');
  const propertiesTargetDir = resolve(packageDir, 'src/properties/json');
  const propertiesLocalServerDir = resolve(packageDir, 'public/assets/js/mvc/properties/json/');

  ensureDirSync(enduserPropertiesSourceDir);
  removeSync(propertiesTargetDir);
  ensureDirSync(propertiesTargetDir);
  removeSync(propertiesLocalServerDir);
  ensureDirSync(propertiesLocalServerDir);

  let baseFiles = await readdir(enduserPropertiesSourceDir);
  convert(baseFiles, propertiesTargetDir);

  baseFiles = await readdir(propertiesTargetDir);
  cachebustI18nFiles(baseFiles, propertiesTargetDir, propertiesLocalServerDir);
}

module.exports = convertPropertiesToJson;
