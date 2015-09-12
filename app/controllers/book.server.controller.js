var Book = require('mongoose').model('Book');

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
              res.redirect('/admin/dashboard/pyschbooks');
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
              res.redirect('/admin/dashboard/religion');
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
              res.redirect('/admin/dashboard/literature');
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
              res.redirect('/admin/dashboard/history');
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