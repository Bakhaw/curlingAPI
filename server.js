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

//POST METHOD
app.post('/team', (req, res) => {
	let team = new Team()
	team.name   = req.body.name;
	team.team   = req.body.team;
	team.number = req.body.number;
	team.role   = req.body.role;
	team.save((err, saveTeam) => {
		if(err) res.send({error: "Cound not save the player"})
			res.send(saveTeam)
	});
});


//PUT METHOD
app.put('/team/:id', (req, res) => {
	const _id = req.params.id;
	Team.findOneAndUpdate({_id}, req.body, {new:true}, (err, updateTeam) => {
		if(err) res.json({error: 'Could not modify the player'});
		res.json({message: 'Player modified !',updateTeam})
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
