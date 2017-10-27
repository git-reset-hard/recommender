const faker = require('faker');
const fs = require('fs');
const shortid = require('shortid');
const json2csv = require('json2csv');
const db = require('../index');
const rest = require('./makeRests');
const CHUNK_SIZE = 500;
const NUM_OF_WRITES = 1;

const generateUsers = (num) => {
  // Assume every user likes 10 restaurants
  const restaurants = Array.from({length: 10}, () => rest.restaurants[Math.floor((Math.random() * 100) % rest.restaurants.length)])
  let users = [];
  for (let i = 0; i < num; i++) {
    users.push({
        "user_id": shortid.generate(),
        "star_pref": Math.random(),
        "distance_pref": Math.random(),
        "price_pref": Math.random(),
        "openness": Math.random(),
        "hometown_latitude": faker.address.latitude(),
        "hometown_longitude": faker.address.longitude(),
        "personality": Array.from({length: 5}, () => Math.random()),
        "traits": Array.from({length: 12}, () => Math.round(Math.random())),
        "needs": Array.from({length: 12}, () => Math.random()),
        "values": Array.from({length: 12}, () => Math.random()),
        "likes": restaurants
      });
  }
  return users;
}

const fields = ['user_id', 'star_pref', 'distance_pref', 'price_pref', 'openness', 'hometown_latitude', 'hometown_longitude', 'hometown_longitude', 'personality', 'needs', 'values', 'likes'];

const batchCSV = `
USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:////Users/administrator/Documents/HackReactor/HRSF81/recommender/example_data/users.csv' AS line
MERGE (:User {user_id: line.user_id})
ON CREATE SET {
  star_pref: line.star_pref,
  distance_pref: line.distance_pref,
  price_pref: line.price_pref,
  openness: line.openness,
  hometown_latitude: line.hometown_latitude,
  hometown_longitude: line.hometown_longitude,
  personality: line.personality,
  needs: line.needs,
  values: line.values,
  likes: line.likes
}
CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE
CREATE INDEX ON :User(user_id)
`
// merge restaurant from likes
// merge relationship between users and restaurants

// chunk size is 50,000
const writeUsers = (writes) => {
  for (let i = 0; i < writes; i++) {
    let fake_users = generateUsers(CHUNK_SIZE);
    let csv = json2csv({ data: fake_users, fields: fields });
    // from helpers folder
    fs.appendFileSync('../../example_data/users.csv', csv, (err) => {
      if (err) throw err;
      console.log('file saved');
    });
  }
  db.runQuery(batchCSV);
  return;
}

console.log(writeUsers(NUM_OF_WRITES));
