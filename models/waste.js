var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/toronto-waste-api", {useNewUrlParser: true});

mongoose.Promise = Promise;

var wasteSchema = new mongoose.Schema({
    title: String,
    body: String,
    favorite: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Waste", wasteSchema);