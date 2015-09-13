var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdminLogsSchema = new Schema({
    requestid: {
        type: String,
        required: 'Request ID is required'
    },
    idnumber: {
        type: String,
        required: 'ID Number is required'
    },
    name: {
        type: String,
        required: 'Name is required'
    },
    course: {
        type: String,
        required: 'Course is required'
    },
    year: {
        type: String,
        required: 'Year is required'
    },
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
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('AdminLogs', AdminLogsSchema);