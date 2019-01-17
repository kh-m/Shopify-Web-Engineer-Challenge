var mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});

mongoose.Promise = Promise;

module.exports.Waste = require('./waste')