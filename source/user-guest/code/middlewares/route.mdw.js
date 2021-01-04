const index = require('../routers/index');

const users = require('../routers/users');

const course = require('../routers/course');

module.exports = function(app) {
    app.use('/', index);
    app.use('/users', users);
    app.use('/course', course);
}