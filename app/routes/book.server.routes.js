module.exports = function(app) {

    var book = require('../controllers/book.server.controller');

    app.post('/addNewITBook', book.addNewITBookPOST);
    app.post('/addNewPyschBook', book.addNewPyschBookPOST);
    app.post('/addNewReligionBook', book.addNewReligionBookPOST);
    app.post('/addNewLiteratureBook', book.addNewLiteratureBookPOST);
    app.post('/addNewHistoryBook', book.addNewHistoryBookPOST);

    // test
    app.get('/renderpdf', book.renderPDF);

};