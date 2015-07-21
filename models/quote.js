var mongoose = require("mongoose");

var QuoteSchema = mongoose.Schema({
    quote: {
        type: String,
        requried: true
    },
    author: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Quote', QuoteSchema);

