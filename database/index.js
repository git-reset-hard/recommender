const faker = require('faker');
const shortid = require('shortid');

const neo4j = require('neo4j-driver').v1;
const neo = require('../config/neo.js')
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", neo.neoPassword));
const session = driver.session();

const insertUser = `CREATE (n:User
  {
  customer_id: '${shortid.generate()}',
  star_pref: ${Math.random()},
  distance_pref: ${Math.random()},
  price_pref: ${Math.random()},
  openness: ${Math.random()},
  hometown_latitude: ${faker.address.latitude()},
  hometown_longitude: ${faker.address.longitude()},
  personality: '[${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}]',
  needs: '[${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}]',
  values: '[${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()},${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}]'
  }
)`

  session
    .run(insertUser)
    .then(function (result) {
      result.records.forEach(function (record) {
        console.log(record.get('name'));
      });
      session.close();
      driver.close();

    })
    .catch(function (error) {
      console.log(error);
      driver.close();

    });
