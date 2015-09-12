module.exports = function(app) {

    var passport = require('passport');
    var user = require('../controllers/user.server.controller');

    app.get('/', user.userDashboardGET);

    // ****************** AUTHENTICATION *****************

    app.route('/login')
        .get(user.userLoginGET)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));

    app.route('/_restrict/addUser')
        .get(user.addUserGET)
        .post(user.addUserPOST);

    app.get('/signout', user.signout);

    // BOOK CATEGOGIES
    app.get('/dashboard/itbooks', user.userITBooksGET);
    app.get('/dashboard/pyschbooks', user.userPsychBooksGET);
    app.get('/dashboard/religion', user.userReligionBooksGET);
    app.get('/dashboard/literature', user.userLiteratureBooksGET);
    app.get('/dashboard/history', user.userHistoryBooksGET);

    // BORROWED BOOKS
    app.get('/dashboard/reserved', user.userReservedBooksGET);

};
