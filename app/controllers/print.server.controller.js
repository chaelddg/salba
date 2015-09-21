var User = require('mongoose').model('User');
var Book = require('mongoose').model('Book');
var AdminLogs = require('mongoose').model('AdminLogs');
var Request = require('mongoose').model('Request');
var moment = require('moment');
var ObjectID = require("bson-objectid");
var async = require('async');

// IT BOOKS
exports.printITBooksGET = function(req, res) {

    Book.find({category: "itbooks"}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
          console.log(data);
          res.render('prints/printBooks', {
              title: 'IT Books',
              bookData: data,
              moment: moment
          });
        }
    });

};

exports.printHistoryBooksGET = function(req, res) {

    Book.find({category: "historybooks"}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
          console.log(data);
          res.render('prints/printBooks', {
              title: 'History Books',
              bookData: data,
              moment: moment
          });
        }
    });

};

exports.printLiteratureBooksGET = function(req, res) {

    Book.find({category: "literaturebooks"}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
          console.log(data);
          res.render('prints/printBooks', {
              title: 'Literature Books',
              bookData: data,
              moment: moment
          });
        }
    });

};

exports.printPsychBooksGET = function(req, res) {

    Book.find({category: "psychbooks"}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
          console.log(data);
          res.render('prints/printBooks', {
              title: 'Psychology Books',
              bookData: data,
              moment: moment
          });
        }
    });

};

exports.printReligionBooksGET = function(req, res) {

    Book.find({category: "religionbooks"}).exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
          console.log(data);
          res.render('prints/printBooks', {
              title: 'Religion Books',
              bookData: data,
              moment: moment
          });
        }
    });

};

// ** LOGS **

exports.printLogsGET = function(req, res) {
  AdminLogs.find().exec(function(err, data) {
    if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.render('prints/printLogs', {
            title: 'Borrower Logs',
            borrowerData: data,
            moment: moment
        });
      }
  });
};

exports.printLogsUserGET = function(req, res) {
  User.findOne({_id: ObjectID(req.user.id)}, function(err, user) {
        AdminLogs.find({idnumber: user.username}, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                if (req.user && req.user.role == 'user') {
                  console.log(data);
                  res.render('prints/printLogs', {
                      title: 'Borrower Logs',
                      borrowerData: data,
                      moment: moment
                  });
                } else {
                    return res.redirect('/');
                }
            }
        });
    });
};