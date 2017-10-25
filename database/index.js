const faker = require('faker');
const shortid = require('shortid');

const neo4j = require('neo4j-driver').v1;
const neo = require('../config/neo.js')
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", neo.neoPassword));
const session = driver.session();

const batchCSV = `
USING PERIODIC COMMIT 500
LOAD CSV WITH HEADERS FROM 'file:////Users/administrator/Documents/HackReactor/HRSF81/recommender/example_data/users.csv' AS line
CREATE (:User {
  customer_id: line.customer_id,
  star_pref: line.star_pref,
  distance_pref: line.distance_pref,
  price_pref: line.price_pref,
  openness: line.openness,
  hometown_latitude: line.hometown_latitude,
  hometown_longitude: line.hometown_longitude,
  personality: line.personality,
  needs: line.needs,
  value: line.values
})`

  session
    .run(batchCSV)
    .then(function (result) {
      session.close();
      driver.close();

    })
    .catch(function (error) {
      console.log(error);
      driver.close();
    });
