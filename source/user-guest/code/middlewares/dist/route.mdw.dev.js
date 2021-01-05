"use strict";

var index = require('../routers/index.route');

var users = require('../routers/users.route');

var course = require('../routers/course.route');

var payment = require('../routers/payment.route');

module.exports = function (app) {
  app.use('/', index);
  app.use('/users', users);
  app.use('/course', course);
  app.use('/payment', payment);
};