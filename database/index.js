const faker = require('faker');
const shortid = require('shortid');

const neo4j = require('neo4j-driver').v1;
const neo = require('../config/neo.js')
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", neo.neoPassword));
const session = driver.session();

const runQuery = (query) => {
  session
    .run(query)
    .then(function (result) {
      session.close();
      driver.close();
    })
    .catch(function (error) {
      console.log(error);
      driver.close();
    });
}

module.exports.runQuery = runQuery;
