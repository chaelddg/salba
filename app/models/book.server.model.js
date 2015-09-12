var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
    isbn: {
        type: String,
        required: 'ISBN is required'
    },
    title: {
        type: String,
        required: 'Title is required'
    },
    author: {
        type: String,
        required: 'Author is required'
    },
    category: {
        type: String,
        required: 'Category is required'
    },
    status: {
        type: String,
        required: 'Status is required'
    },
    qty: {
        type: String,
        required: 'Quantity is required'
    },
    added: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Book', BookSchema);