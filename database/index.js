const neo4j = require('neo4j-driver').v1;
const neo = require('../config/neo.js')
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", neo.neoPassword), {maxTransactionRetryTime: 30000});
const session = driver.session();

// get recommendation list for app server
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
  MATCH (r:Restaurant {restaurant_id: $restaurant_id}),
  (z:Zip { code: $zip})
  MERGE (r)-[:IN_ZIP]->(z)
  `
  const c = `MATCH (r:Restaurant {restaurant_id: $restaurant_id})
  WITH r
  UNWIND r.category AS category
  MATCH (c:Category{name:category})
  MERGE (r)-[:IN_CATEGORY]->(c)`

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
    .then(() => tx.run(z, {'zip': message.zipcode, 'restaurant_id': message.id}))
    .then(() => tx.run(c, {'restaurant_id': message.id}))
  );
};

const updateUser = (message) => {
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
  return session.writeTransaction(tx => tx.run(update,
    {
      'user_id': message.numId,
      'star_pref': message.star_pref,
      'distance_pref': message.distance_pref,
      'price_pref': message.price_pref,
      'hometown_latitude': message.latitude,
      'hometown_longitude': message.longitude,
      'zip': message.zip,
      'openness': message.openness,
      'conscientiousness': message.conscientiousness,
      'achievement': message.achievement,
      'extraversion': message.extraversion,
      'agreeableness': message.agreeableness,
      'likes': message.liked_restaurants
    })
    .then(() => tx.run(relate, {'user_id': message.user_id}))
  );
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
  driver,
  findList,
  insertRest,
  updateUser,
  runQuery,
}
