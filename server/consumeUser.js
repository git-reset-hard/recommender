const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/config.json');
const consumeUser = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/321889521012/usersToRecommender',
  handleMessage: (message, done) => {
    let msg = JSON.parse(message.Body);
    console.log(msg);
    db.updateUser(msg)
      .then(() => {
        done();
        db.session.close();
      })
      .catch(err => console.error(err));
  }
});

consumeUser.on('error', (err) => {
  console.log(err.message);
});

consumeUser.start();
