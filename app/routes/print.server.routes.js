module.exports = function(app) {

    var print = require('../controllers/print.server.controller');


    // PRINT BOOKS
    app.get('/print/printitbooks', print.printITBooksGET);
    app.get('/print/printpsychbooks', print.printPsychBooksGET);
    app.get('/print/printreligionbooks', print.printReligionBooksGET);
    app.get('/print/printhistorybooks', print.printHistoryBooksGET);
    app.get('/print/printliteraturebooks', print.printLiteratureBooksGET);

    // PRINT LOGS
    app.get('/print/printlogs', print.printLogsGET);
    app.get('/print/user/printlogs', print.printLogsUserGET);

};