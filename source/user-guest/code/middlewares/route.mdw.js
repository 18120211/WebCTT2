const index = require('../routers/index.route');

const users = require('../routers/users.route');

const course = require('../routers/course.route');

const payment = require('../routers/payment.route');

const courses = require('../routers/courses.route');

module.exports = function(app) {
    app.use('/', index);
    app.use('/users', users);
    app.use('/course', course);
    app.use('/payment', payment);
    app.use('/courses', courses);
}