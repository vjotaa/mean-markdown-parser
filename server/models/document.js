var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

var Document = (module.exports = mongoose.model('documents', DocumentSchema));
