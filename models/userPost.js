let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    username: { 
        type: String,
        required: true 
    },
    content: { 
        type: String,
        required: true 
    },
}, { collection: "userPost"});

module.exports = mongoose.model('userPost', postSchema);
