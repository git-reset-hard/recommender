const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index');
const esClient = require('./elasticsearch')
const app = express();
const PORT = 3000;
const shortid = require('shortid');
const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.status(200).send('hello');
});

const esTransportOpts = {
  level: 'info',
  client: esClient,
  ensureMappingTemplate: false,
  index: 'listQueryResponse',
  transformer: obj => obj
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new Elasticsearch(esTransportOpts)
  ]
});

app.get('/list', (req, res) => {
  const {userId, location, searchTerm} = req.query;
  const logid = shortid.generate();
  const startTime = new Date();

  db.findList(userId, location, searchTerm)
    .then(result => {
      res.json(result.records[0]['_fields']);
      db.session.close();
      logger.log({
        level: 'info',
        type: 'log',
        time: startTime,
        elapsed: new Date() - startTime,
        success: true,
        logid: logid
      });
    })
    .catch(err => {
      logger.log({
        level: 'info',
        type: 'log',
        time: startTime,
        elapsed: new Date() - startTime,
        success: false,
        logid: logid
      });
      res.sendStatus(400);
    });
})



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
