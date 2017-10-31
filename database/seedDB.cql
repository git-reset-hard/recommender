// index
CREATE INDEX ON :User(user_id)
CREATE INDEX ON :Restaurant(restaurant_id)
CREATE INDEX ON :Category(name)
CREATE INDEX ON :City(name)


// add contraints
CREATE CONSTRAINT ON (u:User) ASSERT u.user_id IS UNIQUE
CREATE CONSTRAINT ON (r:Restaurant) ASSERT u.restaurant_id IS UNIQUE
CREATE CONSTRAINT ON (c:Category) ASSERT u.restaurant_id IS UNIQUE

// create restaurants
USING PERIODIC COMMIT 10000
LOAD CSV WITH HEADERS FROM 'file:////Users/administrator/Documents/HackReactor/HRSF81/recommender/example_data/rests.csv' AS line
MERGE (r:Rests {restaurant_id: line.restaurant_id})
  ON CREATE SET {
  is_closed: line.is_closed,
  category: line.category,
  rating: line.rating,
  latitude: line.latitude,
  longitude: line.longitude,
  city: line.city,
  zip: line.zip,
  price: line.price
}
WITH line
MERGE (:City { name: line.city})

// create users
USING PERIODIC COMMIT 40000
LOAD CSV WITH HEADERS FROM 'file:////Users/administrator/Documents/HackReactor/HRSF81/recommender/example_data/users.csv' AS line
MERGE (:User {user_id: line.user_id})
ON CREATE SET {
  star_pref: line.star_pref,
  distance_pref: line.distance_pref,
  price_pref: line.price_pref,
  openness: line.openness,
  hometown_latitude: line.hometown_latitude,
  hometown_longitude: line.hometown_longitude,
  zip: line.zip,
  openness: line.openness,
  conscientiousness: line.conscientiousness,
  achievement: line.achievement,
  extraversion: line.extraversion,
  agreeableness: line.agreeableness,
  likes: line.likes
}

// create relationship restaurant - category
MATCH (r:Rests)
WITH r
MATCH (c:Category)
WHERE r.category = c.name
MERGE (r)-[:IN_CATEGORY]->(c)

// create relationship restaurant - city
MATCH (r:Rests)
WITH r
MATCH (c:City)
WHERE r.city = c.name
MERGE (r)-[:IN_City]->(c)

// create relationship user - restaurant
MATCH (u:User)
UNWIND split(u.likes, ',') AS like
MERGE (u)-[:LIKES]->(r:Rests{restaurant_id:like})

// create relationship user - user
MATCH (a:User)
WITH a
OPTIONAL MATCH (b:User)
WITH a, b, apoc.algo.cosineSimilarity([tofloat(a.star_pref),toFloat(a.price_pref), toFloat(a.distance_pref),(a.openness), toFloat(a.conscientiousness), toFloat(a.achievement), toFloat(a.extraversion), toFloat(a.agreeableness)],[tofloat(b.star_pref),toFloat(b.price_pref), toFloat(b.distance_pref),toFloat(b.openness), toFloat(b.conscientiousness), toFloat(b.achievement), toFloat(b.extraversion), toFloat(b.agreeableness)]) as value
WHERE value > .9 AND a <> b
MERGE (a)-[s:SIMILAR_TO]-(b)
SET s.cosine = value

//create relationship user to hometown long / lat
