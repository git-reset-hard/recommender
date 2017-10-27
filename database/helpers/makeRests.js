const faker = require('faker');
const fs = require('fs');
const shortid = require('shortid');
const json2csv = require('json2csv');
const db = require('../index');
// Total number of restaurants inserted is NUM_OF_RESTS * CHUNK_SIZE
const NUM_OF_RESTS = 50;
const CHUNK_SIZE = 1;

// use this to make sure users like restaurants that actually exist
let restaurants = [];

const generateRests = (num) => {
  let rests = [];
  for (let i = 0; i < num; i++) {
    let id = shortid.generate();
    restaurants.push(id);
    rests.push({
        "restaurant_id": id,
        "is_closed": Math.round(Math.random()),
        "categories": {
          mexican: 1,
          japanese: 0,
          sandwiches: 1,
          french: 0,
          korean: 0,
          take_out: 1
        },
        // testing length of 10
        "catArray": Array.from({length: 10}, () => Math.round(Math.random())),
        "cats": 'sandwiches',
        "rating": Math.floor(((Math.random() * 10) % 5 ) + 1),
        "latitude": faker.address.latitude(),
        "longitude": faker.address.longitude(),
        "city": faker.address.city(),
        "zip": faker.address.zipCode(),
        "price": Math.floor(((Math.random() * 10) % 4 ) + 1)
      });
  }
  return rests;
}
const fields = ['restaurant_id', 'is_closed', 'categories', 'catArray', 'rating', 'latitude', 'longitude', 'city', 'zip', 'price'];

const batchCSV = `
USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:////Users/administrator/Documents/HackReactor/HRSF81/recommender/example_data/rests.csv' AS line
CREATE (:Rests {
  restaurant_id: line.restaurant_id,
  is_closed: line.is_closed,
  categories: line.categories,
  catArray: line.catArray,
  rating: line.rating,
  latitude: line.latitude,
  longitude: line.longitude,
  price: line.price,
  likes: line.likes
}
CREATE CONSTRAINT ON (r:Rests) ASSERT r.id IS UNIQUE
)`

const writeRests = (chunks) => {
  for (let i = 0; i < chunks; i++) {
    let fake_rests = generateRests(NUM_OF_RESTS);
    let csv = json2csv({ data: fake_rests, fields: fields });
    // from helpers folder
    fs.appendFileSync('../../example_data/rests.csv', csv, (err) => {
      if (err) throw err;
      console.log('file saved');
    });
  }
  db.runQuery(batchCSV);
  // // TODO: delete file upon complete
  return;
}

console.log(writeRests(CHUNK_SIZE));

module.exports.restaurants = restaurants;
