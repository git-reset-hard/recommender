CREATE CONSTRAINT ON (u:User) ASSERT u.user_id IS UNIQUE;
CREATE CONSTRAINT ON (r:Restaurant) ASSERT r.restaurant_id IS UNIQUE;
CREATE CONSTRAINT ON (c:Category) ASSERT c.name IS UNIQUE;
CREATE INDEX ON :Zip(code);

USING PERIODIC COMMIT 10000
LOAD CSV WITH HEADERS FROM 'file:////rests.csv' AS line
MERGE (r:Restaurant {restaurant_id: line.restaurant_id})
  ON CREATE SET
  r.is_closed = line.is_closed,
  r.category = line.category,
  r.rating = line.rating,
  r.latitude = line.latitude,
  r.longitude = line.longitude,
  r.city = line.city,
  r.zip = line.zip,
  r.price = line.price
WITH line.zip AS zip
MERGE (:Zip { code: zip});

USING PERIODIC COMMIT 40000
LOAD CSV WITH HEADERS FROM
'file:///users.csv' AS line
MERGE (u:User {user_id: line.user_id})
ON CREATE SET
  u.star_pref = line.star_pref,
  u.distance_pref = line.distance_pref,
  u.price_pref = line.price_pref,
  u.openness = line.openness,
  u.hometown_latitude = line.hometown_latitude,
  u.hometown_longitude = line.hometown_longitude,
  u.zip = line.zip,
  u.openness = line.openness,
  u.conscientiousness = line.conscientiousness,
  u.achievement = line.achievement,
  u.extraversion = line.extraversion,
  u.agreeableness = line.agreeableness,
  u.likes = line.likes;

MATCH (r:Restaurant)
WITH r
MATCH (c:Category)
WHERE r.category = c.name
MERGE (r)-[:IN_CATEGORY]->(c);

MATCH (r:Restaurant)
WITH r
MATCH (z:Zip)
WHERE r.zip = z.code
MERGE (r)-[:IN_ZIP]->(z);

MATCH (u:User)
UNWIND split(u.likes, ',') AS like
MERGE (u)-[:LIKES]->(r:Rests{restaurant_id:like});

MATCH (a:User)
WITH a
OPTIONAL MATCH (b:User)
WITH a, b, apoc.algo.cosineSimilarity([tofloat(a.star_pref),toFloat(a.price_pref), toFloat(a.distance_pref),(a.openness), toFloat(a.conscientiousness), toFloat(a.achievement), toFloat(a.extraversion), toFloat(a.agreeableness)],[tofloat(b.star_pref),toFloat(b.price_pref), toFloat(b.distance_pref),toFloat(b.openness), toFloat(b.conscientiousness), toFloat(b.achievement), toFloat(b.extraversion), toFloat(b.agreeableness)]) as value
WHERE value > .9 AND a <> b
MERGE (a)-[s:SIMILAR_TO]-(b)
SET s.cosine = value;

//create relationship user to hometown long / lat
