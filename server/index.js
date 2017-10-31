const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/list', (req, res) => {
  const {user_id, location, category} = req.query;
  // get recommended list from db
  // if err res.sendStatus(500);
  // else res.json(data)

})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
