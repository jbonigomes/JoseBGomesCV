const fs = require('fs');
const util = require('util');
const path = require('path');
const yml = require('js-yaml');
const Nodehun = require('nodehun');
const spellcheck = require('nodehun-sentences');

const data = yml.safeLoad(fs.readFileSync('./data.yml', 'utf8'));

const dictionaryPath = path.join(
  __dirname,
  'node_modules',
  'dictionary-en-gb'
);

const hunspell = new Nodehun(
  fs.readFileSync(path.join(dictionaryPath, 'index.aff')),
  fs.readFileSync(path.join(dictionaryPath, 'index.dic'))
);

const spellchecker = (text) => {
  return new Promise((resolve, reject) => {
    spellcheck(hunspell, text, (err, typos) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(typos);
      }
    });
  });
};

const addWords = (words) => {
  const promises = [];

  for (let i = 0; i < words.length; i++) {
    promises.push(new Promise((resolve, reject) => {
      hunspell.addWord(words[i], (err, word) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(word);
        }
      });
    }));
  }

  return Promise.all(promises);
};

const spellCheckJobs = async (jobs) => {
  const res = [];

  for (let i = 0; i < jobs.length; i++) {
    res.push({
      position: await spellchecker(jobs[i].position),
      description: await spellchecker(jobs[i].description),
    });
  }

  return res;
};

const spellCheckEdu = async (edu) => {
  const res = [];

  for (let i = 0; i < edu.length; i++) {
    res.push({
      grade: await spellchecker(edu[i].grade),
      subject: await spellchecker(edu[i].subject),
      description: await spellchecker(edu[i].description),
    });
  }

  return res;
};

const spellcheckComplex = async (skills) => {
  const res = [];

  for (let i = 0; i < skills.length; i++) {
    const innerSkills = [];

    for (let j = 0; j < skills[0].inner_skill.length; j++) {
      innerSkills.push({
        title: await spellchecker(skills[i].inner_skill[j].title),
        stars: await spellchecker(skills[i].inner_skill[j].stars.map(star => {
          return star.title;
        }).join(', ')),
      });
    }

    res.push({
      inner_skill: innerSkills,
      title: await spellchecker(skills[i].title),
    });
  }

  return res;
};

const spellcheckSimple = async (skills) => {
  const res = [];

  for (let i = 0; i < skills.length; i++) {
    res.push({
      title: await spellchecker(skills[i].title),
      stars: await spellchecker(skills[i].stars.map(_ => _.title).join(', '))
    });
  }

  return res;
};

const spellcheckOther = async (skills) => {
  const res = [];

  for (let i = 0; i < skills.length; i++) {
    res.push(await spellchecker(skills[i].label));
  }

  return res;
};

const res = async () => ({
  profession: await spellchecker(data.profession),
  personal_statement: await spellchecker(data.personal_statement),
  employment: await spellCheckJobs(data.employment),
  other: await spellchecker(data.other),
  education: await spellCheckEdu(data.education),
  complex_skills: await spellcheckComplex(data.complex_skills),
  simple_skills: await spellcheckSimple(data.simple_skills),
  other_skills: await spellcheckOther(data.other_skills)
});

(async () => {
  await addWords([
    'UX',
    'UI',
    'JS',
    'PHP',
    'BSc',
    'RBS',
    'NHS',
    'CLI',
    'VBA',
    'JLL',
    'CSS',
    'SSRS',
    'CSS3',
    'ePOS',
    'Cyber',
    'noSQL',
    'MySQL',
    'HTML5',
    'Aviva',
    'jQuery',
    'Upcast',
    'Symfony',
    'GraphQL',
    'Cordova',
    'MongoDB',
    'Laravel',
    'Nominent',
    'Firebase',
    'Greenergy',
    'MediaMath',
    'GraphCool',
    'Cybertill',
    'CFS-Europe',
    'Thinkup.io',
    'JavaScript',
    'Codeigniter',
    'RushHourCrush',
  ]);

  console.log(util.inspect(await res(), false, null));
})();
