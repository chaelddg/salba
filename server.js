process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose(),
    app = express(),
    passport = passport();

var port = Number(process.env.PORT || 4000);

app.listen(port, function() {
    console.log('server on port ' + port);
});

module.exports = app;