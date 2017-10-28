const db = require('../index');

const q = `
MATCH (r:Rests)
WITH r
MATCH (c:City)
WHERE r.city = c.name
MERGE (r)-[:IN_City]->(c)
`
db.runQuery(q);
