"use strict";

var express = require('express');

var Router = express.Router();

var Course = require('../models/Course.model');

var Lecturer = require('../models/Lecturer.model');

var CourseCategory = require('../models/CourseCategory.model');

var CourseTopic = require('../models/CourseTopic.model');

var paypal = require('paypal-rest-sdk');

var _require = require('../config/auth.config'),
    ensureAuthenticated = _require.ensureAuthenticated,
    forwardAuthenticated = _require.forwardAuthenticated;

Router.get('/:nameCourse', function _callee(req, res) {
  var nameCourse, course, isWishCourse;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          nameCourse = req.params.nameCourse.toString();
          _context.next = 3;
          return regeneratorRuntime.awrap(Course.findOne({
            name: nameCourse
          }).populate('idLecturer').populate('idCourseTopic'));

        case 3:
          course = _context.sent;
          isWishCourse = false;

          if (req.user != undefined && req.user.idWishList.indexOf(course._id) != -1) {
            isWishCourse = true;
          }

          res.render('./course/detail', {
            isAuthenticated: req.isAuthenticated(),
            isWishCourse: isWishCourse,
            course: course
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
Router.get('/:nameCourse/checkout', ensureAuthenticated, function _callee2(req, res) {
  var course, now, date;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Course.findOne({
            name: req.params.nameCourse
          }));

        case 2:
          course = _context2.sent;
          now = new Date(Date.now());
          date = "".concat(now.getDate(), "/").concat(now.getMonth() + 1, "/").concat(now.getFullYear());
          res.render('./course/checkout', {
            course: course,
            date: date
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
Router.post('/:nameCourse/checkout', ensureAuthenticated, function _callee3(req, res) {
  var course, return_url, cancel_url, create_payment_json;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Course.findOne({
            name: req.params.nameCourse
          }));

        case 2:
          course = _context3.sent;
          console.log(course); //Tạo thanh toán

          console.log("paypal handler");
          return_url = 'http://localhost:8000/course/' + course.name + '/payment-success';
          cancel_url = 'http://localhost:8000/course/' + course.name + '/payment-fail';
          create_payment_json = {
            intent: "sale",
            payer: {
              payment_method: "paypal"
            },
            redirect_urls: {
              return_url: return_url,
              cancel_url: cancel_url
            },
            transactions: [{
              item_list: {
                items: [{
                  name: course.name,
                  sku: "001",
                  price: course.tuition,
                  currency: "USD",
                  quantity: 1
                }]
              },
              amount: {
                currency: "USD",
                total: course.tuition
              },
              description: "Thanh toán khóa học online của Minh Võ Store"
            }]
          };
          paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
              throw error;
            } else {
              for (var i = 0; i < payment.links.length; i++) {
                //console.log(payment);
                if (payment.links[i].rel === "approval_url") {
                  res.redirect(payment.links[i].href);
                }
              }
            }
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
Router.get('/:nameCourse/payment-success', function (req, res) {
  console.log('Payment success');
  res.send('Payment success');
});
Router.get('/:nameCourse/payment-fail', function (req, res) {
  console.log('Payment fail');
  res.send('Payment fail');
});
module.exports = Router;