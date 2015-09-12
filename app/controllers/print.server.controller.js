var User = require('mongoose').model('User');
var Book = require('mongoose').model('Book');
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
          res.render('admin/adminITBooks', {
              title: 'IT Books',
              bookData: data,
              moment: moment
          });
        }
    });
};
