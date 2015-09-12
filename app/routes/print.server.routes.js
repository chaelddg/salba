module.exports = function(app) {

    var print = require('../controllers/print.server.controller');

    app.get('/print/printitbooks', print.printITBooksGET);

};