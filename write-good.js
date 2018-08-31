const fs = require('fs');
const util = require('util');
const yml = require('js-yaml');
const writeGood = require('write-good');

const data = yml.safeLoad(fs.readFileSync('./index.yml', 'utf8'));

const loopArray = data => data.map(_ => suggestions(_));
const loopObject = data => Object.keys(data).map(_ => suggestions(data[_]));

const suggestions = (data) => {
  if (typeof data === 'object') {
    return Array.isArray(data) ? loopArray(data) : loopObject(data);
  }

  return writeGood(data, { eprime: true });
};

console.log(util.inspect(suggestions(data), false, null));
