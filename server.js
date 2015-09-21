process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    Primus = require('primus.io'),
    http = require('http'),
    passport = require('./config/passport');

var db = mongoose(),
    app = express(),
    passport = passport();

var port = Number(process.env.PORT || 4000);

server = http.createServer(app);
var primus = new Primus(server, { transformer: 'websockets', parser: 'JSON' });

primus.on('connection', function(spark) {
    spark.on('admin-notif', function(data) {
        console.log(data);
        var notif_msg = data.book.toString();
        primus.send('notif', { book: notif_msg });
    });
});

server.listen(port, function() {
    console.log('server on port ' + port);
});

module.exports = app;