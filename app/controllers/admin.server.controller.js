var User = require('mongoose').model('User');
var Book = require('mongoose').model('Book');
var AdminLogs = require('mongoose').model('AdminLogs');
var Request = require('mongoose').model('Request');
var moment = require('moment');
var ObjectID = require("bson-objectid");
var async = require('async');

// *********************** AUTHENTICATION ************************

var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch(err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }

    return message;
};

exports.addAdminGET = function(req, res) {
    res.render('restrict/addAdmin', {
        title: 'Add Admin'
    });
};

exports.addAdminPOST = function(req, res, next) {
    console.log("****************");
    console.log("add Admin post");
    if (!req.user) {
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';
        user.role = 'admin';

        user.save(function(err) {
            if (err) {
                message = getErrorMessage(err);
                console.log('*************');
                console.log(err);
                req.flash('error', message);
                return res.redirect('/_restrict/addAdmin');
            }

            req.login(user, function(err) {
                if (err) {
                    return next(err);
                }

                return res.redirect('/admin');
            });
        });
    } else {
        return res.redirect('/admin');
    }
};


exports.adminLoginGET = function(req, res, next) {
    if (!req.user) {
        res.render('admin/adminLogin', {
            title: 'Admin Login',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/admin/dashboard');
    }
};


exports.adminDashboardGET = function(req, res) {
    console.log("****************");
    console.log("adminDashboard");
    console.log(req.user);
    if (req.user && req.user.role == 'admin') {
      res.render('admin/adminDashboard', {
          title: 'Admin adminDashboard',
          messages: req.flash('error') || req.flash('info')
      });
    } else {
        return res.redirect('/');
    }
};

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/login');
};
// *********************** FUNCTIONALITY ************************

// IT BOOKS
exports.adminITBooksGET = function(req, res) {

    Book.find({category: "itbooks"}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        if (req.user && req.user.role == 'admin') {
          console.log(data);
          res.render('admin/adminITBooks', {
              title: 'IT Books',
              bookData: data,
              moment: moment
          });
        } else {
            return res.redirect('/');
        }
      }
    });
};

exports.adminPyschBooksGET = function(req, res) {

    Book.find({category: "psychbooks"}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        if (req.user && req.user.role == 'admin') {
          console.log(data);
          res.render('admin/adminPsychBooks', {
              title: 'Pysch Books',
              bookData: data,
              moment: moment
          });
        } else {
            return res.redirect('/');
        }
      }
    });
};

exports.adminReligionBooksGET = function(req, res) {

    Book.find({category: "religionbooks"}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        if (req.user && req.user.role == 'admin') {
          console.log(data);
          res.render('admin/adminReligionBooks', {
              title: 'Religion Books',
              bookData: data,
              moment: moment
          });
        } else {
            return res.redirect('/');
        }
      }
    });
};

exports.adminLiteratureBooksGET = function(req, res) {

    Book.find({category: "literaturebooks"}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        if (req.user && req.user.role == 'admin') {
          console.log(data);
          res.render('admin/adminLiteratureBooks', {
              title: 'Literature Books',
              bookData: data,
              moment: moment
          });
        } else {
            return res.redirect('/');
        }
      }
    });
};

exports.adminHistoryBooksGET = function(req, res) {

    Book.find({category: "historybooks"}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        if (req.user && req.user.role == 'admin') {
          console.log(data);
          res.render('admin/adminHistoryBooks', {
              title: 'History Books',
              bookData: data,
              moment: moment
          });
        } else {
            return res.redirect('/');
        }
      }
    });
};


// ************************ BORROWERS *********************

exports.adminBorrowerReserveListGET = function(req, res) {
       // _.uniq([2, 1, 2]);
        async.waterfall([
        function(callback) {
            Request.find({ status: "reserved" }).exec(function (err, reqData) {
                console.log("REQDATA");
                console.log(reqData);
                callback(null, reqData);
            });
        },
        function(arg1, callback) {
            var idContainer = [];
            arg1.forEach(function (req1, i2) {
                idContainer.push(ObjectID(req1.userid));
            });
            callback(null, idContainer);
        },
        function(arg1, callback) {
            console.log('**** USER ID ********');

            User.find({_id: {$in: arg1}}).exec(function(err, data) {
                console.log(data);
                if (err) {
                    console.log(err);
                } else {
                    if (req.user && req.user.role == 'admin') {
                      res.render('admin/adminBorrowerReserveList', {
                        title: 'Borrowers Reserved List',
                        borrowerData: data ? data : ""
                      }, callback(null, 'done'));
                    } else {
                        return res.redirect('/');
                    }
                }
            });
        }
    ], function (err, result) {
        // result now equals 'done'
        console.log(err);
    });

};

// BORROWERS LIST

exports.adminBorrowerListGET = function(req, res) {
       // _.uniq([2, 1, 2]);
        async.waterfall([
        function(callback) {
            Request.find({ status: "borrowed" }).exec(function (err, reqData) {
                console.log("REQDATA");
                console.log(reqData);
                callback(null, reqData);
            });
        },
        function(arg1, callback) {
            var idContainer = [];
            arg1.forEach(function (req1, i2) {
                idContainer.push(ObjectID(req1.userid));
            });
            callback(null, idContainer);
        },
        function(arg1, callback) {
            console.log('**** USER ID ********');

            User.find({_id: {$in: arg1}}).exec(function(err, data) {
                console.log(data);
                if (err) {
                    console.log(err);
                } else {
                    if (req.user && req.user.role == 'admin') {
                      res.render('admin/adminBorrowers', {
                        title: 'Borrowers List',
                        borrowerData: data ? data : ""
                      }, callback(null, 'done'));
                    } else {
                        return res.redirect('/');
                    }
                }
            });
        }
    ], function (err, result) {
        // result now equals 'done'
        console.log(err);
    });

};

exports.adminBorrowerRequestGET = function(req, res) {

    Request.find().exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
          if (req.user && req.user.role == 'admin') {
            console.log(data);
            res.render('admin/adminBorrowerRequest', {
              title: 'Borrowers Request',
              borrowerData: data ? data : "",
              moment: moment
            });
          } else {
              return res.redirect('/');
          }
      }
    });

};

// ********* reserved to borrower ************

exports.adminBorrowerListPOST = function(req, res) {

  console.log(req.body);
  var reqid = req.body.accept_reqid;

  Request.findOne({_id: ObjectID(reqid)}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {

        data.status = "borrowed";
        data.start_date = new Date(moment());
        data.due_date = new Date(moment().add(3, 'days'));
        data.save(function (err) {

            Book.findOne({_id: ObjectID(data.bookid)}, function (err, book) {
                // book.qty = Number(book.qty) - 1;
                console.log("*********************");
                console.log(book.qty);
                // book.qty = Number(book.qty) - 1;
                book.save(function (err) {
                    if(err) console.log(err);
                    res.redirect("/admin/dashboard/reserveprofile/" + data.userid);
                });
            });

        });
      }
    });

};

exports.adminBorrowerResponsePOST = function(req, res) {
    Request.findOne({_id: ObjectID(req.body.bookid)}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        //   PUT DATE HERE LATER
        data.status = "reserved";
        data.start_date = new Date(moment());
        data.due_date = new Date(moment().add(1, 'days'));
        data.save(function (err) {

            Book.findOne({_id: ObjectID(data.bookid)}, function (err, book) {
                // book.qty = Number(book.qty) - 1;
                console.log("*********************");
                console.log(book.qty);
                book.qty = Number(book.qty) - 1;
                book.save(function (err) {
                    if(err) console.log(err);
                    res.redirect("/admin/dashboard/borrowerrequest");
                });
            });

        });
      }
    });
};

// DECLINE REQUEST
exports.adminDeclineBookRequestPOST = function (req, res) {
    console.log("*************** decline **************");
    console.log(req.body);
    Request.remove({_id: ObjectID(req.body.declinebookid)}).exec(function(err, data) {
        if (err) {
            console.log(err);
        } else {
           res.redirect("/admin/dashboard/borrowerrequest");
        }
    });
};

exports.adminBorrowerRequestPOST = function (req, res) {
    console.log(req.body);
    var book_id = req.body.book_id,
        user_id = req.body.user_id;

    async.waterfall([
        function(callback) {
            User.findOne({_id: ObjectID(user_id)}, function (err, user) {
                callback(null, user);
            });
        },
        function(arg1, callback) {
            Book.findOne({_id: ObjectID(book_id)}, function (err, book) {
                callback(null, arg1, book);
            });
        },
        function(arg1, arg2, callback) {
            // arg1 now equals 'three'
            console.log(arg1);
            console.log(arg2);
            var request_name = arg1.firstName + " " + arg1.lastName,
                request_isbn = arg2.isbn,
                request_title = arg2.title,
                request_author = arg2.author;

            var request_info = new Request(req.body);
            request_info.name = request_name;
            request_info.isbn = request_isbn;
            request_info.title = request_title;
            request_info.author = request_author;
            request_info.status = "pending",
            request_info.bookid = book_id,
            request_info.userid = arg1._id,
            request_info.save(function (err) {
                callback(null, 'done');
            });
        }
    ], function (err, result) {
        // result now equals 'done'
        console.log(err);
    });
};

// GET PROFILE
exports.adminBorrowerReserveProfileGET = function(req, res) {
  var profileId = req.params.profileId;
  console.log('******** profile ********');
  console.log(req.params);
  Request.find({userid: ObjectID(profileId), status: "reserved" }).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        if (req.user && req.user.role == 'admin') {
          console.log(data);
          res.render('admin/adminBorrowerReserveProfile', {
              title: 'Borrowed Books',
              bookData: data,
              moment: moment
          });
        } else {
            return res.redirect('/');
        }
      }
    });

};

exports.adminBorrowerProfileGET = function(req, res) {
  var profileId = req.params.profileId;
  console.log('******** profile ********');
  console.log(req.params);
  Request.find({userid: ObjectID(profileId), status: "borrowed" }).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        if (req.user && req.user.role == 'admin') {
          console.log(data);
          res.render('admin/adminBorrowerProfile', {
              title: 'Borrowed Books',
              bookData: data,
              moment: moment
          });
        } else {
            return res.redirect('/');
        }
      }
    });

};

// DELETE A BOOK
exports.adminDeleteBookPOST = function (req, res) {
    console.log(req.body);
    var bookid = req.body.bookid,
        bookname = req.body.bookName;

    Book.findByIdAndUpdate(ObjectID(bookid), { $set: { status: 'obsolete' }}, function (err, book) {
        if (err) console.log(err);
        res.redirect('/admin/dashboard/itbooks');
    });
};

// UPDATE A BOOK
exports.adminUpdateBookPOST = function (req, res) {
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

// ****************** CREATE LOGS ******************



