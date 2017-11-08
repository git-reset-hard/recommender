const neo4j = require('neo4j-driver').v1;
const neo = require('../config/neo.js')
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", neo.neoPassword), {maxTransactionRetryTime: 30000});
const session = driver.session();

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
  LIMIT 10
  `
  return session.readTransaction(tx => tx.run(q));
};
// update user from sqs


// insert restaurant from sqs
const insertRest = (message) => {
  const r = `
  MERGE (r:Restaurant {restaurant_id: $restaurant_id})
  SET
  r.is_closed = $is_closed,
  r.category = $category,
  r.rating = $rating,
  r.latitude = $latitude,
  r.longitude = $longitude,
  r.city = $city,
  r.zip = $zip,
  r.price = $price
  MERGE (z:Zip { code: $zip})
  `
  const z = `
  MERGE (r)-[:IN_ZIP]->(z)
  `
  // WITH $zip AS zip
  // WITH r
  // MERGE (r)-[:IN_ZIP]->(:Zip {code: $zip})

  // const z = `MERGE (:Zip { code: $zip})`
  // MERGE (r)-[:IN_ZIP]->(:Zip { code: zip})
  // const rc = `MATCH (r:Restaurant{restaurant_id: $restaurant_id})
  // WITH r
  // UNWIND r.category AS cat
  // MATCH (c:Category{name:cat})
  // MERGE (r)-[:IN_CATEGORY]->(c)`

  return session.writeTransaction(tx => tx.run(r,
    {
      'restaurant_id': message.id,
      'is_closed': message.is_closed,
      'category': message.categories,
      'rating': message.rating,
      'latitude': message.latitude,
      'longitude': message.longitude,
      'city': message.city,
      'zip': message.zipcode,
      'price': message.price
    })
    // .then(() => tx.run(z, {'zip': message.zipcode}))
    // .then(() => tx.run(rc, {'restaurant_id': message.id}))
  );
}

const updateUser = (msgUserObj) => {
  const update = `
  MERGE (u:User {user_id: $user_id})
  SET
    u.star_pref = $star_pref,
    u.distance_pref = $distance_pref,
    u.price_pref = $price_pref,
    u.hometown_latitude = $hometown_latitude,
    u.hometown_longitude = $hometown_longitude,
    u.zip = $zip,
    u.openness = $openness,
    u.conscientiousness = $conscientiousness,
    u.achievement = $achievement,
    u.extraversion = $extraversion,
    u.agreeableness = $agreeableness,
    u.likes = apoc.convert.fromJsonList($likes)
  `
  const relate = `
  MATCH (u:User {user_id: $user_id})
  UNWIND u.likes AS like
  MATCH (r:Restaurant {restaurant_id:toString(like)})
  MERGE (u)-[:LIKES]->(r)
  `
  return session.writeTransaction(tx => {
    tx.run(update)
    .then(() => {
      tx.run(relate)
    })
  });
}
// session.run(r,
//   {
//     'restaurant_id': message.id,
//     'is_closed': message.is_closed,
//     'category': message.category,
//     'rating': message.rating,
//     'latitude': message.latitude,
//     'longitude': message.longitude,
//     'city': message.city,
//     'zip': message.zip,
//     'price': message.price
//   }).then(() => {
//   session.close(() => {
//     console.log('Restaurant created, session closed');
//   });
// });
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
  // driver,
  session,
  findList,
  runQuery,
  insertRest
}
