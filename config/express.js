var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.secret
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static('./public'));

    require('../app/routes/user.server.routes')(app);
    require('../app/routes/admin.server.routes')(app);
    require('../app/routes/book.server.routes')(app);
    require('../app/routes/print.server.routes')(app);

    return app;
};