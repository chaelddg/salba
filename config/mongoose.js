var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    require('../app/models/user.server.model');
    require('../app/models/book.server.model');
    require('../app/models/adminlogs.server.model');
    require('../app/models/request.server.model');

    return db;
};
