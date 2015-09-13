var User = require('mongoose').model('User');
var Book = require('mongoose').model('Book');
var AdminLogs = require('mongoose').model('AdminLogs');
var Request = require('mongoose').model('Request');
var ObjectID = require("bson-objectid");
var async = require('async');
var moment = require('moment');

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

exports.addUserGET = function(req, res) {
    res.render('restrict/addUser', {
        title: 'Add User'
    });
};

exports.addUserPOST = function(req, res, next) {
    console.log("****************");
    console.log("add User post");
    if (!req.user) {
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';
        user.role = 'user';

        user.save(function(err) {
            if (err) {
                message = getErrorMessage(err);
                console.log('*************');
                console.log(err);
                req.flash('error', message);
                return res.redirect('/_restrict/addUser');
            }

            req.login(user, function(err) {
                if (err) {
                    return next(err);
                }

                return res.redirect('/login');
            });
        });
    } else {
        return res.redirect('/login');
    }
};

exports.userDashboardGET = function(req, res, next) {
    if (req.user) {
        res.render('user/userDashboard', {
            title: 'Index',
            user: req.user ? req.user.fullName: "",
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/login');
    }
};

exports.userLoginGET = function(req, res, next) {
    if (!req.user) {
        res.render('user/userLogin', {
            title: 'User Login',
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
exports.userITBooksGET = function(req, res) {

    async.waterfall([
        function(callback) {
            Request.find({userid: req.user.id, $or:[ { status: "borrowed" }, { status: "pending" }, { status: "reserved" } ]}).exec(function (err, reqData) {
                callback(null, reqData);
            });
        },
        function(arg1, callback) {
            var idContainer = [];
            arg1.forEach(function (req1, i2) {
                idContainer.push(ObjectID(req1.bookid));
            });
            callback(null, idContainer);
        },
        function(arg1, callback) {
            console.log('****BOOK ID ********');


            Book.find({_id: {$nin: arg1}, category: "itbooks", qty: { $gt: 0}, status: "available" }).exec(function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    if (req.user && req.user.role == 'user') {
                      res.render('user/userITBooks', {
                          title: 'IT Books',
                          bookData: data,
                          user: req.user ? req.user.fullName: "",
                          userid: req.user.id ? req.user.id : "",
                          moment: moment
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

// PSYCH BOOKS
exports.userPsychBooksGET = function(req, res) {

    async.waterfall([
        function(callback) {
            Request.find({userid: req.user.id, $or:[ { status: "borrowed" }, { status: "pending" }, { status: "reserved" } ]}).exec(function (err, reqData) {
                callback(null, reqData);
            });
        },
        function(arg1, callback) {
            var idContainer = [];
            arg1.forEach(function (req1, i2) {
                idContainer.push(ObjectID(req1.bookid));
            });
            callback(null, idContainer);
        },
        function(arg1, callback) {
            console.log('****BOOK ID ********');


            Book.find({_id: {$nin: arg1}, category: "psychbooks", qty: { $gt: 0}, status: "available" }).exec(function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    if (req.user && req.user.role == 'user') {
                      res.render('user/userPsychBooks', {
                          title: 'Psych Books',
                          bookData: data,
                          user: req.user ? req.user.fullName: "",
                          userid: req.user.id ? req.user.id : "",
                          moment: moment
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

// Religon BOOKS
exports.userReligionBooksGET = function(req, res) {

    async.waterfall([
        function(callback) {
            Request.find({userid: req.user.id, $or:[ { status: "borrowed" }, { status: "pending" }, { status: "reserved" } ]}).exec(function (err, reqData) {
                callback(null, reqData);
            });
        },
        function(arg1, callback) {
            var idContainer = [];
            arg1.forEach(function (req1, i2) {
                idContainer.push(ObjectID(req1.bookid));
            });
            callback(null, idContainer);
        },
        function(arg1, callback) {
            console.log('****BOOK ID ********');


            Book.find({_id: {$nin: arg1}, category: "religionbooks", qty: { $gt: 0}, status: "available" }).exec(function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    if (req.user && req.user.role == 'user') {
                      res.render('user/userReligionBooks', {
                          title: 'Religon Books',
                          bookData: data,
                          user: req.user ? req.user.fullName: "",
                          userid: req.user.id ? req.user.id : "",
                          moment: moment
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

// Literature BOOKS
exports.userLiteratureBooksGET = function(req, res) {

    async.waterfall([
        function(callback) {
            Request.find({userid: req.user.id, $or:[ { status: "borrowed" }, { status: "pending" }, { status: "reserved" } ]}).exec(function (err, reqData) {
                callback(null, reqData);
            });
        },
        function(arg1, callback) {
            var idContainer = [];
            arg1.forEach(function (req1, i2) {
                idContainer.push(ObjectID(req1.bookid));
            });
            callback(null, idContainer);
        },
        function(arg1, callback) {
            console.log('****BOOK ID ********');


            Book.find({_id: {$nin: arg1}, category: "literaturebooks", qty: { $gt: 0}, status: "available" }).exec(function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    if (req.user && req.user.role == 'user') {
                      res.render('user/userLiteratureBooks', {
                          title: 'Literature Books',
                          bookData: data,
                          user: req.user ? req.user.fullName: "",
                          userid: req.user.id ? req.user.id : "",
                          moment: moment
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


// History BOOKS
exports.userHistoryBooksGET = function(req, res) {

    async.waterfall([
        function(callback) {
            Request.find({userid: req.user.id, $or:[ { status: "borrowed" }, { status: "pending" }, { status: "reserved" } ]}).exec(function (err, reqData) {
                callback(null, reqData);
            });
        },
        function(arg1, callback) {
            var idContainer = [];
            arg1.forEach(function (req1, i2) {
                idContainer.push(ObjectID(req1.bookid));
            });
            callback(null, idContainer);
        },
        function(arg1, callback) {
            console.log('****BOOK ID ********');


            Book.find({_id: {$nin: arg1}, category: "historybooks", qty: { $gt: 0}, status: "available" }).exec(function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    if (req.user && req.user.role == 'user') {
                      res.render('user/userHistoryBooks', {
                          title: 'History Books',
                          bookData: data,
                          user: req.user ? req.user.fullName: "",
                          userid: req.user.id ? req.user.id : "",
                          moment: moment
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

// RESERVED BOOKS

exports.userReservedBooksGET = function(req, res) {

    Request.find({userid: ObjectID(req.user._id), $or:[ { status: "" }, { status: "pending" }, { status: "reserved" } ]}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        if (req.user && req.user.role == 'user') {
          console.log(data);
          res.render('user/userReservedBooks', {
              title: 'Reserved Books',
              bookData: data,
              user: req.user ? req.user.fullName: "",
              moment: moment
          });
        } else {
            return res.redirect('/');
        }
      }
    });

};

// BORROWED BOOKS

exports.userBorrowedBooksGET = function(req, res) {

    Request.find({userid: ObjectID(req.user._id), status: "borrowed" }).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        if (req.user && req.user.role == 'user') {
          console.log(data);
          res.render('user/userBorrowedBooks', {
              title: 'Reserved Books',
              bookData: data,
              user: req.user ? req.user.fullName: "",
              moment: moment
          });
        } else {
            return res.redirect('/');
        }
      }
    });

};

exports.userBorrowerLogsGET = function(req, res) {
    User.findOne({_id: ObjectID(req.user.id)}, function(err, user) {
        AdminLogs.find({idnumber: user.username}, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                if (req.user && req.user.role == 'user') {
                  console.log(data);
                  res.render('user/userBorrowerLogs', {
                      title: 'Logs',
                      borrowerData: data,
                      user: req.user ? req.user.fullName: "",
                      moment: moment
                  });
                } else {
                    return res.redirect('/');
                }
            }
        });
    });
};