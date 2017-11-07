const faker = require('faker');
const fs = require('fs');
const json2csv = require('json2csv');
const rest = require('./makeRests');
const CHUNK_SIZE = 500;
const NUM_OF_WRITES = 2000;
faker.locale = "en_US";

const generateUsers = (num) => {
  // Assume every user likes 10 restaurants
  const restaurants = Array.from({length: 10}, () => rest.restaurants[Math.floor((Math.random() * 100) % rest.restaurants.length)])
  let users = [];
  for (let i = 0; i < num; i++) {
    users.push({
        "user_id": Math.floor(Math.random() * 10000000),
        "star_pref": Math.random(),
        "distance_pref": Math.random(),
        "price_pref": Math.random(),
        "hasReview": true,
        "hometown_latitude": faker.address.latitude(),
        "hometown_longitude": faker.address.longitude(),
        "city": faker.address.city(),
        "personality": Array.from({length: 5}, () => Math.random()),
        "openness":Math.random(),
        "conscientiousness":Math.random(),
        "achievement":Math.random(),
        "extraversion":Math.random(),
        "agreeableness": Math.random(),
        "likes": restaurants
      });
  }
  return users;
}

const fields = ['user_id', 'star_pref', 'distance_pref', 'price_pref', 'hasReview', 'hometown_latitude', 'hometown_longitude', 'hometown_longitude', 'city', 'personality', 'openness', 'conscientiousness', 'achievement', 'extraversion', 'agreeableness', 'likes'];

const writeStream = fs.createWriteStream('/import/users.csv', {flags: 'a'});
const writeUsers = (writes) => {
  for (let i = 0; i < writes; i++) {
    let fake_users = generateUsers(CHUNK_SIZE);
    let csv = json2csv({ data: fake_users, fields: fields });
    writeStream.write(csv)
  }
  writeStream.on('finish', () => {
    console.log('done with users');
    writeStream.close();
  })
  // db.runQuery(batchCSV);
  return;
}

writeUsers(NUM_OF_WRITES);
