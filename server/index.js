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
      res.json(result.records[0]['_fields']);
    db.session.close();
  });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
