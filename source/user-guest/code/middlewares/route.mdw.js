const index = require('../routers/index.route');

const users = require('../routers/users.route');

const course = require('../routers/course.router');

module.exports = function(app) {
    app.use('/', index);
    app.use('/users', users);
    app.use('/course', course);
}