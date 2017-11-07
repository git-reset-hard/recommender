const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/config.json');
const consumeUser = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/321889521012/usersToRecommender',
  handleMessage: (message, done) => {
    // do some work with `message`

    // const {
    //   user_id,
    //   star_pref,
    //   distance_pref,
    //   price_pref,
    //   hometown_latitude,
    //   hometown_longitude,
    //   zip,
    //   openness,
    //   conscientiousness,
    //   achievement,
    //   extraversion,
    //   agreeableness,
    //   likes
    // } = message;

    {
      "user_id": message.user_id,
      "star_pref": message.star_pref,
      "distance_pref": message.distance_pref,
      "price_pref": message.price_pref,
      "hometown_latitude": message.hometown_latitude,
      "hometown_longitude": message.hometown_longitude,
      "zip": message.zip,
      "openness": message.openness,
      "conscientiousness": message.conscientiousness,
      "achievement": message.achievement,
      "extraversion": message.extraversion,
      "agreeableness": message.agreeableness,
      "likes": message.likes
    }

    // update user in db
    MERGE (u:User {user_id: $user_id})
    SET
      u.star_pref = $star_pref,
      u.distance_pref = $distance_pref,
      u.price_pref = $price_pref,
      u.hometown_latitude = $hometown_latitude,
      u.hometown_longitude = $hometown_longitude,
      u.zip = $zip,
      u.openness = $openness,
      u.conscientiousness = $conscientiousness,
      u.achievement = $achievement,
      u.extraversion = $extraversion,
      u.agreeableness = $agreeableness,
      u.likes = apoc.convert.fromJsonList($likes)

    // merge relationships
    WITH (u)
    UNWIND u.likes AS like
    MATCH (r:Restaurant {restaurant_id:toString(like)})
    MERGE (u)-[:LIKES]->(r);

    done();
  },
  sqs: new AWS.SQS()
});

consumeUser.on('error', (err) => {
  console.log(err.message);
});

consumeUser.start();
