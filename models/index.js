var mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connect(DATABASEURL, {useNewUrlParser: true});

mongoose.Promise = Promise;

module.exports.Waste = require('./waste')