var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect("mongodb://localhost:27017/toronto-waste-api", {useNewUrlParser: true});

mongoose.Promise = Promise;

module.exports.Waste = require('./waste')