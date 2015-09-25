var User = require('mongoose').model('User');
var Book = require('mongoose').model('Book');
var AdminLogs = require('mongoose').model('AdminLogs');
var Request = require('mongoose').model('Request');
var moment = require('moment');
var ObjectID = require("bson-objectid");
var async = require('async');

// ADD IT BOOKS

exports.addNewITBookPOST = function(req, res) {

    var itbook = new Book(req.body);
    itbook.category = 'itbooks';
    itbook.status = 'available';

    itbook.save(function(err) {
        if (err) {
            console.log(err);
        } else {
           if (req.user && req.user.role == 'admin') {
              res.redirect('/admin/dashboard/itbooks')
            } else {
                return res.redirect('/');
            }
        }
    });
};

// ADD PYSCH BOOKS

exports.addNewPyschBookPOST = function(req, res) {

    var itbook = new Book(req.body);
    itbook.category = 'psychbooks';
    itbook.status = 'available';

    itbook.save(function(err) {
        if (err) {
            console.log(err);
        } else {
           if (req.user && req.user.role == 'admin') {
              res.redirect('/admin/dashboard/psychbooks');
            } else {
                return res.redirect('/');
            }
        }
    });
};

// ADD RELIGION BOOKS

exports.addNewReligionBookPOST = function(req, res) {

    var itbook = new Book(req.body);
    itbook.category = 'religionbooks';
    itbook.status = 'available';

    itbook.save(function(err) {
        if (err) {
            console.log(err);
        } else {
           if (req.user && req.user.role == 'admin') {
              res.redirect('/admin/dashboard/religionbooks');
            } else {
                return res.redirect('/');
            }
        }
    });
};

// ADD LITERATURE BOOKS

exports.addNewLiteratureBookPOST = function(req, res) {

    var itbook = new Book(req.body);
    itbook.category = 'literaturebooks';
    itbook.status = 'available';

    itbook.save(function(err) {
        if (err) {
            console.log(err);
        } else {
           if (req.user && req.user.role == 'admin') {
              res.redirect('/admin/dashboard/literaturebooks');
            } else {
                return res.redirect('/');
            }
        }
    });
};

// ADD HISTORY BOOKS

exports.addNewHistoryBookPOST = function(req, res) {

    var itbook = new Book(req.body);
    itbook.category = 'historybooks';
    itbook.status = 'available';

    itbook.save(function(err) {
        if (err) {
            console.log(err);
        } else {
           if (req.user && req.user.role == 'admin') {
              res.redirect('/admin/dashboard/historybooks');
            } else {
                return res.redirect('/');
            }
        }
    });
};

// TEST PDF

exports.renderPDF = function(req, res) {
var phantom = require('phantom');

var pageUrl = "https://medium.com/i-m-h-o/sick-of-sfx-89768a5ac3a7";

phantom.create("--ignore-ssl-errors=yes", "--ssl-protocol=any", function (ph) {//mMAKE SURE WE CAN RENDER https
    ph.createPage(function (page) {
        //CREATE PAGE OBJECT
        page.set('viewportSize', {width:1280,height:900}, function(){
            page.set('clipRect', {top:0,left:0,width:1280,height:900}, function(){
                //OPEN PAGE
                page.open(pageUrl, function(status) {
                    //WAIT 15 SECS FOR WEBPAGE TO BE COMPLETELY LOADED
                    setTimeout(function(){
                        page.render('screenshot.png', function(finished){
                            console.log('rendering '+pageUrl+' done');
                            ph.exit();
                        });
                    }, 15000);
                });
                //END OF: OPEN PAGE
            });
        });
        //END OF: CREATE PAGE OBJECT
    });
});

};

// *********** DELETE BOOK *************

exports.bookDeleteITBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        bookname = req.body.bookName;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set: { status: 'obsolete' }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/itbooks');
    });
};

exports.bookDeleteHistoryBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        bookname = req.body.bookName;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set: { status: 'obsolete' }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/historybooks');
    });
};

exports.bookDeletePsychBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        bookname = req.body.bookName;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set: { status: 'obsolete' }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/psychbooks');
    });
};

exports.bookDeleteLiteratureBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        bookname = req.body.bookName;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set: { status: 'obsolete' }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/literaturebooks');
    });
};

exports.bookDeleteReligionBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        bookname = req.body.bookName;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set: { status: 'obsolete' }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/religionbooks');
    });
};


// ************ UPDATE BOOK ********************

exports.bookUpdateITBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        booktitle = req.body.title,
        bookisbn = req.body.isbn,
        bookauthor = req.body.author,
        bookstatus = req.body.status,
        bookqty = req.body.qty;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set:
        {
            status: bookstatus,
            isbn: bookisbn,
            author: bookauthor,
            qty: bookqty,
            title: booktitle
        }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/itbooks');
    });
};

exports.bookUpdateHistoryBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        booktitle = req.body.title,
        bookisbn = req.body.isbn,
        bookauthor = req.body.author,
        bookstatus = req.body.status,
        bookqty = req.body.qty;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set:
        {
            status: bookstatus,
            isbn: bookisbn,
            author: bookauthor,
            qty: bookqty,
            title: booktitle
        }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/historybooks');
    });
};

exports.bookUpdatePsychBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        booktitle = req.body.title,
        bookisbn = req.body.isbn,
        bookauthor = req.body.author,
        bookstatus = req.body.status,
        bookqty = req.body.qty;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set:
        {
            status: bookstatus,
            isbn: bookisbn,
            author: bookauthor,
            qty: bookqty,
            title: booktitle
        }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/psychbooks');
    });
};

exports.bookUpdateLiteratureBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        booktitle = req.body.title,
        bookisbn = req.body.isbn,
        bookauthor = req.body.author,
        bookstatus = req.body.status,
        bookqty = req.body.qty;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set:
        {
            status: bookstatus,
            isbn: bookisbn,
            author: bookauthor,
            qty: bookqty,
            title: booktitle
        }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/literaturebooks');
    });
};

exports.bookUpdateReligionBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        booktitle = req.body.title,
        bookisbn = req.body.isbn,
        bookauthor = req.body.author,
        bookstatus = req.body.status,
        bookqty = req.body.qty;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set:
        {
            status: bookstatus,
            isbn: bookisbn,
            author: bookauthor,
            qty: bookqty,
            title: booktitle
        }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/religionbooks');
    });
};

// ********* BOOK LIST *****************

exports.bookListGET = function(req, res) {

    Book.find().exec(function(err, books) {
        if (err) {
            console.log(err);
        } else {
            if (req.user && req.user.role == 'admin') {
                res.render('admin/adminBookList', {
                  title: 'Book List',
                  books: books
                });
              } else {
                  return res.redirect('/');
              }
          }
    });

};