
const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/config.json');
const consumeRestaurant = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/213354805027/restaurantProfileToRecommender',
  handleMessage: (message, done) => {
    console.log(message);
    done();
  }
});

consumeRestaurant.on('error', (err) => {
  console.log(err.message);
});

consumeRestaurant.start();
