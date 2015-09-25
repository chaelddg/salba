module.exports = function(app) {

    var passport = require('passport');
    var admin = require('../controllers/admin.server.controller');

    // ****************** AUTHENTICATION *****************

    app.route('/admin')
        .get(admin.adminLoginGET)
        .post(passport.authenticate('local', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/admin',
            failureFlash: true
        }));

    app.route('/_restrict/addAdmin')
        .get(admin.addAdminGET)
        .post(admin.addAdminPOST);

    app.get('/signout', admin.signout);

    // ***************** FUNCTIONALITY ROUTES ****************

    app.get('/admin/dashboard', admin.adminDashboardGET);
    app.get('/admin/dashboard/borrowerreservelist', admin.adminBorrowerReserveListGET);
    app.get('/admin/dashboard/borrowers', admin.adminBorrowerListGET);
    app.get('/admin/dashboard/borrowerrequest', admin.adminBorrowerRequestGET);

    // BOOK CATEGOGIES
    app.get('/admin/dashboard/itbooks', admin.adminITBooksGET);
    app.get('/admin/dashboard/psychbooks', admin.adminPyschBooksGET);
    app.get('/admin/dashboard/religionbooks', admin.adminReligionBooksGET);
    app.get('/admin/dashboard/literaturebooks', admin.adminLiteratureBooksGET);
    app.get('/admin/dashboard/historybooks', admin.adminHistoryBooksGET);

    //BOOK REQUEST
    app.post('/admin/dashboard/borrowerrequest', admin.adminBorrowerRequestPOST);
    app.post('/admin/dashboard/borrowerresponse', admin.adminBorrowerResponsePOST);
    app.post('/admin/dashboard/returnbook', admin.adminReturnBookRequestPOST);
    app.post('/admin/dashboard/borrwerdecline', admin.adminDeclineBookRequestPOST);
    app.post('/admin/dashboard/borrwerdeleterequest', admin.adminBorrowerDeleteRequestPOST);

    // BORROWER SAVE
    app.post('/admin/dashboard/borrowers', admin.adminBorrowerListPOST);

    // USER PROFILE
    app.get('/admin/dashboard/profile/:profileId', admin.adminBorrowerProfileGET);
    app.get('/admin/dashboard/reserveprofile/:profileId', admin.adminBorrowerReserveProfileGET);

    // DELETE A BOOK
    app.post('/admin/dashboard/deletebook', admin.adminDeleteBookPOST);

    // UPDATE A BOOK
    app.post('/admin/dashboard/updatebook', admin.adminUpdateBookPOST);

    // LOGS
    app.get('/admin/dashboard/logs', admin.adminBorrowerLogsGET);

    // PDF GENERATE
    // app.get('/admin/dashboard/pdf', admin.adminGeneratePDFGET);

};
