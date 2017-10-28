const db = require('../index');

const q = `
MATCH (r:Rests)
WITH r
MATCH (c:Category)
WHERE r.category = c.name
MERGE (r)-[:IN_CATEGORY]->(c)
`
db.runQuery(q);
