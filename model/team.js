const mongoose = require('mongoose');
let Schema     = mongoose.Schema;

let team = new Schema({
  name: String,
  team: String,
  number: Number,
  role: String
});

module.exports = mongoose.model('Team', team);
