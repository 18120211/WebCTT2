const index = require('../routers/index');

const users = require('../routers/users');

const course = require('../routers/course');

const admin = require("../routers/admin");

module.exports = function(app) {
    app.use('/', index);
    app.use("/admin", admin);
}