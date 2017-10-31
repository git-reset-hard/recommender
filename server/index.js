const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/list', (req, res) => {
  // const {user_id, location, category} = req.query;
  db.getList('joe').then(result => {
    db.session.close();
    const singleRecord = result.records[0];
    const createdNodeId = singleRecord.get(0);
    console.log('single record', singleRecord);
    console.log('Matched created node with id: ' + createdNodeId);
    res.json(createdNodeId);
  });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
