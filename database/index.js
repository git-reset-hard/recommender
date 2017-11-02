const neo4j = require('neo4j-driver').v1;
const neo = require('../config/neo.js')
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", neo.neoPassword), {maxTransactionRetryTime: 30000});
const session = driver.session();

// const getList = (personName, id, location, category) => {
//   console.log('called getList function');
//   return session.readTransaction(tx => tx.run('MATCH (a:Person) RETURN a.name', {name: personName}));
// };
const findList = (userId, location, searchTerm) => {
  const q = `
  MATCH (r:Rests)-[:IN_CATEGORY]->(c:Category),
  	    (r)-[:IN_City]->(p:City),
        (u:User)-[:SIMILARITY]-(similar:User),
        (similar)-[:LIKES]->(r)
  WHERE u.user_id = ${userID}
        AND c.name = ${searchTerm}
  	    AND p.name = ${location}
  WITH r.restaurant_id AS restaurant
  RETURN restaurant
  `
  return session.readTransaction(tx => tx.run('q'));
};


// const runQuery = (query) => {
//   session
//     .run(query)
//     // .run(restaurantCSV)
//
//     .then(function (result) {
//       console.log('done');
//       session.close();
//       driver.close();
//     })
//     .catch(function (error) {
//       console.log(error);
//       driver.close();
//     });
// }

module.exports = {
  session,
  findList
}
