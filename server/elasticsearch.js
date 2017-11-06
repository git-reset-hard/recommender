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

module.exports = client;
