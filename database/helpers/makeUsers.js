const faker = require('faker/locale/en_US');
const fs = require('fs');
const json2csv = require('json2csv');
const zipcodes = require('zipcodes');
const PD = require("probability-distributions");
const rest = require('./makeRests');
const CHUNK_SIZE = 2000;
const NUM_OF_WRITES = 2000;


const generateUsers = (num) => {
  const traitO = PD.rnorm(num, .5, .15);
  const traitC = PD.rnorm(num, .5, .15);
  const traitAc = PD.rnorm(num, .5, .15);
  const traitE = PD.rnorm(num, .5, .15);
  const traitAg = PD.rnorm(num, .5, .15);

  // Assume every user likes 10 restaurants
  const restaurants = Array.from({length: 10}, () => rest.restaurants[Math.floor((Math.random() * 100) % rest.restaurants.length)])
  let users = [];
  for (let i = 0; i < num; i++) {
    users.push({
        "user_id": Math.floor(Math.random() * 10000000),
        "star_pref": Math.random(),
        "distance_pref": Math.random(),
        "price_pref": Math.random(),
        "hometown_latitude": faker.address.latitude(),
        "hometown_longitude": faker.address.longitude(),
        "zip": faker.address.zipCode(),
        "openness":Math.abs(traitO[i]),
        "conscientiousness":Math.abs(traitC[i]),
        "achievement":Math.abs(traitAc[i]),
        "extraversion":Math.abs(traitE[i]),
        "agreeableness": Math.abs(traitAg[i]),
        "likes": restaurants
      });
  }
  return users;
}

const fields = ['user_id', 'star_pref', 'distance_pref', 'price_pref', 'hometown_latitude', 'hometown_longitude', 'zip', 'openness', 'conscientiousness', 'achievement', 'extraversion', 'agreeableness', 'likes'];

const writeStream = fs.createWriteStream('import/users.csv', {flags: 'a'});
const writeUsers = (writes) => {
  for (let i = 0; i < writes; i++) {
    let fake_users = generateUsers(CHUNK_SIZE);
    let csv = json2csv({ data: fake_users, fields: fields });
    writeStream.write(csv)
  }
  writeStream.on('finish', () => {
    console.log('done with users');
    writeStream.close();
  });
  // db.runQuery(batchCSV);
}

writeUsers(NUM_OF_WRITES);
