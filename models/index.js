var mongoose = require('mongoose');
mongoose.set('debug', true);

var url = process.env.TWASTEDATABASEURL || "mongodb://localhost:27017/toronto-waste-api"

mongoose.connect(url, {useNewUrlParser: true});

mongoose.Promise = Promise;

module.exports.Waste = require('./waste')