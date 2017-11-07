const faker = require('faker');
const fs = require('fs');
const json2csv = require('json2csv');
const cat = require('./makeCategories')
// Total number of restaurants inserted is NUM_OF_RESTS * CHUNK_SIZE
const NUM_OF_RESTS = 5000;
const NUM_OF_ZIPS = 500;
const CHUNK_SIZE = 1;
faker.locale = "en_US";

// use this to make sure users like restaurants that actually exist
let restaurants = [];
let zips = [];

for (let i = 0; i < NUM_OF_ZIPS; i++) {
  zips.push(faker.address.zipCode());
};

const generateRests = (num) => {
  let rests = [];
  for (let i = 0; i < num; i++) {
    let id = Math.floor(Math.random() * 1000000);
    restaurants.push(id);
    rests.push({
        "restaurant_id": id,
        "is_closed": Math.round(Math.random()),
        "category": cat.categories[Math.floor((Math.random() * 100) % cat.categories.length)],
        "rating": Math.floor(((Math.random() * 10) % 5 ) + 1),
        "latitude": faker.address.latitude(),
        "longitude": faker.address.longitude(),
        "city": faker.address.city(),
        "zip": zips[Math.floor((Math.random() * 100) % zips.length)],
        "price": Math.floor(((Math.random() * 10) % 4 ) + 1)
      });
  }
  return rests;
}
const fields = ['restaurant_id', 'is_closed', 'category', 'rating', 'latitude', 'longitude', 'city', 'zip', 'price'];

const writeStream = fs.createWriteStream('/import/rests.csv', {flags: 'a'});
const writeRests = (chunks) => {
  for (let i = 0; i < chunks; i++) {
    let fake_rests = generateRests(NUM_OF_RESTS);
    let csv = json2csv({ data: fake_rests, fields: fields });
    writeStream.write(csv)
  }
  writeStream.on('finish', () => {
    console.log('done with restaurants');
    writeStream.close();
  });
  // // TODO: delete file upon complete
}

writeRests(CHUNK_SIZE);

module.exports.restaurants = restaurants;
