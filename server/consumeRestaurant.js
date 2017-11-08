
const db = require('../database/index')
const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/config.json');
const consumeRestaurant = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/213354805027/restaurantProfileToRecommender',
  handleMessage: (message, done) => {
    let msg = JSON.parse(message.Body);
    console.log(msg);
    db.insertRest(msg)
      .then(() => {
        done();
    //     db.session.close(() => {
    //       console.log('Restaurant created, session closed');
    //     });
      })
      .catch(err => console.error(err));
    //INSERT INTO DB THEN CALL DONE
  }
  // sqs: new AWS.SQS()
});

consumeRestaurant.on('error', (err) => {
  console.log(err.message);
});

consumeRestaurant.start();
