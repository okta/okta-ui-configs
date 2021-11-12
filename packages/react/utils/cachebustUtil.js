const crypto = require('crypto');
const { readFileSync } = require('fs-extra');

const md5Buffer = function (buffer) {
  const md5Hash = crypto.createHash('md5');
  md5Hash.update(buffer);

  return md5Hash.digest('hex');
};

/**
 * Generate md5 hash for the given file
 * @param src file path
 * @returns string hex hash
 */
const md5 = function (src) {
  return md5Buffer(readFileSync(src));
};

/**
 * Check if the given file name is already cache-busted (has a md5 sha)
 * @param fileName
 * @returns {boolean}
 */
const isCacheBusted = function (fileName) {
  const fileNameArray = fileName.split('.');
  const length = fileNameArray.length;

  return length > 2 && fileNameArray[length - 2].length === 32;
};

module.exports = {
  md5: md5,
  isCacheBusted: isCacheBusted,
};
