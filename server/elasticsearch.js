const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'https://search-recommender-xld7vndlcrik5c5tmqqetf6lda.us-west-1.es.amazonaws.com'
});
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

// MATCH (n:User)
// OPTIONAL MATCH (n)-[r]-()
// call apoc.es.post("https://search-recommender-xld7vndlcrik5c5tmqqetf6lda.us-west-1.es.amazonaws.com","recommender","user",toString(id(n)),null,{openness:n.openness, agreeableness:n.agreeableness, conscientiousness:n.conscientiousness,achievement:n.achievement,extraversion:n.extraversion}) yield value
// return *


module.exports = client;
