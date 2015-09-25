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
        global_data = data.userid.toString();
        primus.send('notif', { book: notif_msg });
    });


    spark.on('join', function(room) {
        console.log('*******ROOM*********');
        console.log(room.data);
        console.log(room.word);
        var roomData = room.word;

        if (room.word == "declined") {
            spark.join(room.data, function() {
               console.log('**** SERVER ====> user ACCEPT ********* ' );
                primus.send('user-notif', 'request declined');
            });
        } else {
            spark.join(room.data, function() {
               console.log('**** SERVER ====> user ACCEPT ********* ' );
                primus.send('user-notif', 'request accepted');
            });
        }

            // console.log(room);
    });



    // spark.on('user-notif', function(spark) {
    //     // primus.send('')
    // });
});

server.listen(port, function() {
    console.log('server on port ' + port);
});

module.exports = app;