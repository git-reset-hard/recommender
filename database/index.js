const neo4j = require('neo4j-driver').v1;
const neo = require('../config/neo.js')
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", neo.neoPassword), {maxTransactionRetryTime: 30000});
const session = driver.session();

const getList = (personName, id, location, category) => {
  console.log('called getList function');
  return session.readTransaction(tx => tx.run('MATCH (a:Person) RETURN a.name', {name: personName}));
};
const findList = (userId, location, searchTerm) => {
  const q = `
  MATCH (r:Restaurant)-[:IN_CATEGORY]->(c:Category),
  	    (r)-[:IN_ZIP]->(z:Zip),
        (u:User)-[:SIMILAR_TO]-(similar:User),
        (similar)-[:LIKES]->(r)
  WHERE u.user_id = '${userId}'
        AND c.name = '${searchTerm}'
  	    AND z.code = '${location}'
  WITH r.restaurant_id AS restaurant
  RETURN restaurant
  `
  return session.readTransaction(tx => tx.run(q));
};

const mergeCategory = (c) => {
  const q = `MERGE (:Category { name: '${c}' })`
  return session.writeTransaction(tx => tx.run(q));
};

// run single query
const runQuery = (query) => {
  session
    .run(query)
    .then(function (result) {
      console.log('done');
      session.close();
      driver.close();
    })
    .catch(function (error) {
      console.log(error);
      driver.close();
    });
}

module.exports = {
  session,
  runQuery,
  findList,
  mergeCategory
}
