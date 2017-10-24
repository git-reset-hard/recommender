const fake = require('../example_data/users.js');
const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "yelp"));


var session = driver.session();

// Run a Cypher statement, reading the result in a streaming manner as records arrive:
session
  .run("CREATE (n:Person { name: 'Andres', title: 'Developer' })")
  .subscribe({
    onNext: function (record) {
      console.log(record.get('name'));
    },
    onCompleted: function () {
      session.close();
    },
    onError: function (error) {
      console.log(error);
    }
  });
driver.close();

// {
//   "props" : [ {
//     "name" : "Andres",
//     "position" : "Developer"
//   }, {
//     "name" : "Michael",
//     "position" : "Developer"
//   } ]
// }
// UNWIND $props AS map
// CREATE (n)
// SET n = map
// const populateUsers =
// "UNWIND $users AS map \
// CREATE (n) \
// SET n = map";
