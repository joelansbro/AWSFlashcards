const mongoose = require('mongoose');

const awsSchema = new mongoose.Schema({
    concept: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    keywords: {
        type: String,
        required: false
    },
    domain: {
        type: String,
        enum: ['Cloud Concepts','Security','Technology','Billing'],
        required: true
    },
})

const awsBase = mongoose.model('awsBase', awsSchema);
module.exports = awsBase;
