module.exports = function(app) {

    var book = require('../controllers/book.server.controller');

    app.post('/addNewITBook', book.addNewITBookPOST);
    app.post('/addNewPyschBook', book.addNewPyschBookPOST);
    app.post('/addNewReligionBook', book.addNewReligionBookPOST);
    app.post('/addNewLiteratureBook', book.addNewLiteratureBookPOST);
    app.post('/addNewHistoryBook', book.addNewHistoryBookPOST);

    // test
    app.get('/renderpdf', book.renderPDF);

    // delete routes

    app.post('/deletebook/itbooks', book.bookDeleteITBookPOST);
    app.post('/deletebook/history', book.bookDeleteHistoryBookPOST);
    app.post('/deletebook/literature', book.bookDeleteLiteratureBookPOST);
    app.post('/deletebook/psych', book.bookDeletePsychBookPOST);
    app.post('/deletebook/religion', book.bookDeleteReligionBookPOST);


    // update routes

    app.post('/updatebook/itbooks', book.bookUpdateITBookPOST);
    app.post('/updatebook/history', book.bookUpdateHistoryBookPOST);
    app.post('/updatebook/literature', book.bookUpdateLiteratureBookPOST);
    app.post('/updatebook/psych', book.bookUpdatePsychBookPOST);
    app.post('/updatebook/religion', book.bookUpdateReligionBookPOST);

    // GET ALL BOOKS
    app.get('/book/booklist', book.bookListGET);

};