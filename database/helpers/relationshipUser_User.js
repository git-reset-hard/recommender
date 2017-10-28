const db = require('../index');

const q = `
MATCH (a:User)
WITH a
MATCH (b:User)
WITH a, b, apoc.algo.cosineSimilarity([toFloat(a.openness), toFloat(a.conscientiousness), toFloat(a.achievement), toFloat(a.extraversion), toFloat(a.agreeableness)],[toFloat(b.openness), toFloat(b.conscientiousness), toFloat(b.achievement), toFloat(b.extraversion), toFloat(b.agreeableness)]) as value
WHERE value > .9 AND a <> b
MERGE (a)-[s:SIMILARITY]-(b)
SET s.cosine = value
`
db.runQuery(q);
