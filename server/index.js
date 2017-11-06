const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/list', (req, res) => {
  const {userId, location, searchTerm} = req.query;
  db.findList(userId, location, searchTerm).then(result => {
    console.log('result' + result);
    res.json(result);
    db.session.close();
    // const singleRecord = result.records[0];
    // const createdNodeId = singleRecord.get(0);
  });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
