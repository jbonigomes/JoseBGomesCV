const fs = require('fs');
const util = require('util');
const yml = require('js-yaml');
const writeGood = require('write-good');

const data = yml.safeLoad(fs.readFileSync('./data.yml', 'utf8'));

const suggestions = {
  profession: writeGood(data.profession, { eprime: true }),
  personal_statement: writeGood(data.personal_statement, { eprime: true }),
  employment: data.employment.map(job => ({
    position: writeGood(job.position, { eprime: true }),
    description: writeGood(job.description, { eprime: true }),
  })),
  other: writeGood(data.other, { eprime: true }),
  education: data.education.map(edu => ({
    suject: writeGood(edu.subject, { eprime: true }),
    description: writeGood(edu.description, { eprime: true }),
  })),
};

console.log(util.inspect(suggestions, false, null));
