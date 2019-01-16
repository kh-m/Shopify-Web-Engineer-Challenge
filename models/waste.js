var mongoose = require('mongoose');

var wasteSchema = new mongoose.Schema({
    title: String,
    body: String,
    keywords: String,
    favorite: {
        type: Boolean,
        default: false
    }
});

var Waste = mongoose.model('Waste', wasteSchema);

module.exports = Waste;