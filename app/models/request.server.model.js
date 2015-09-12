var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
    userid: {
        type: String,
        required: 'User ID is required'
    },
    bookid: {
        type: String
    },
    name: {
        type: String,
        required: 'User name is required'
    },
    isbn: {
        type: String,
        required: 'ISBN is required'
    },
    title: {
        type: String,
        required: 'Title is required'
    },
    status: {
        type: String,
        required: 'Status is required'
    },
    author: {
        type: String,
        required: 'Author is required'
    },
    start_date: {
        type: Date
    },
    due_date: {
        type: Date
    },
    added: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Request', RequestSchema);
