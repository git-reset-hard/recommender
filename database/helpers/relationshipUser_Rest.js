const db = require('../index');

const q = `
MATCH (u:User)
UNWIND u.likes AS like
MATCH (r:Rests)
WHERE like CONTAINS r.restaurant_id
MERGE (u)-[:LIKES]->(r)
`
db.runQuery(q);
