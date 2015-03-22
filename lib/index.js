'use strict';

module.exports = function (apiKey, options) {
  if (!apiKey || (typeof apiKey !== 'string')) {
    throw new Error('not provided or invalid API KEY, must be non empty string');
  }

  if (options) {
    validateOptions(options);
  }

  return {};
};

function validateOptions(options) {
}
