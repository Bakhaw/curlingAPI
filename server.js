const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const cors       = require('cors');

let Team         = require('./model/team');

// setup mongoose
mongoose.connect('mongodb://localhost/curling');//mongoosejs.com

// setup cors
app.use(cors());

// setup bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes

// GET METHOD
app.get('/team', (req, res) => {
  Team.find({}, (err, team) => {
    if (err) res.send({error: 'could not get the team'})
    res.send(team)
  });
});

// DELETE METHOD
app.delete('/team/:id', (req, res) => {
  const _id = req.params.id;
  Team.remove({_id}, (err, deletedTeam) => {
    if (err) res.send({error: 'could not delete the product'});
    res.send(deletedTeam);
  })
});

// connection au port
app.listen(3004, () => {
  console.log('Curling API running on port 3004...');
})
