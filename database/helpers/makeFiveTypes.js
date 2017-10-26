const db = require('../index');

var createType = (weights) => {
  let q = `
  CREATE (:Personality {
    openness: ${weights[0]},
    conscientiousness: ${weights[1]},
    achievment: ${weights[2]},
    extraversion: ${weights[3]},
    agreeableness: ${weights[4]}
  })
  `
  return q;
}

const personTypes = () => {
  let options = [0, 1];
  let allTypes = [];

  const buildType = (num, type = []) => {
    if (num === 0) {
      allTypes.push(type);
      db.runQuery(createType(type));
      return;
    }
    options.forEach(o => buildType(num - 1, type.concat(o)));
  }
  buildType(5);
  return allTypes;
}

personTypes();
