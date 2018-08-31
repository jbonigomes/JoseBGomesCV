const fs = require('fs');
const util = require('util');
const yml = require('js-yaml');
const writeGood = require('write-good');

const data = yml.safeLoad(fs.readFileSync('./index.yml', 'utf8'));

const suggestions = (data) => {
  if (Array.isArray(data)) {
    return data.map(_ => suggestions(_));
  }
  else if (typeof data === 'object') {
    return Object.keys(data).map(_ => suggestions(data[_]));
  }

  return writeGood(data, { eprime: true });
};

console.log(util.inspect(suggestions(data), false, null));
