const faker = require('faker');
const fs = require('fs');
const shortid = require('shortid');
const json2csv = require('json2csv');


const generateUsers = (num) => {
  let users = [];
  for (let i = 0; i < num; i++) {
    users.push({
        "customer_id": shortid.generate(),
        "star_pref": Math.random(),
        "distance_pref": Math.random(),
        "price_pref": Math.random(),
        "openness": Math.random(),
        "hometown_latitude": faker.address.latitude(),
        "hometown_longitude": faker.address.longitude(),
        "personality": [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        "needs": [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        "values": [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        });
  }
  return users;
}

const fields = ['customer_id', 'star_pref', 'distance_pref', 'price_pref', 'openness', 'hometown_latitude', 'hometown_longitude', 'hometown_longitude', 'personality', 'needs', 'values'];

let fake_users = generateUsers(50000);
let csv = json2csv({ data: fake_users, fields: fields });

fs.writeFile('../example_data/users.csv', csv, function(err) {
  if (err) throw err;
  console.log('file saved');
});
