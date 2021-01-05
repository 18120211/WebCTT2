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
    forwardAuthenticated = _require.forwardAuthenticated; //Bấm vào nút mua luôn ở trang chi tiết khóa học


Router.get('/:nameCourse/checkout', ensureAuthenticated, function _callee(req, res) {
  var course, now, date;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Course.findOne({
            name: req.params.nameCourse
          }));

        case 2:
          course = _context.sent;
          now = new Date(Date.now());
          date = "".concat(now.getDate(), "/").concat(now.getMonth() + 1, "/").concat(now.getFullYear());
          res.render('./payment/checkout', {
            course: course,
            date: date
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Bấm vào nút thanh toán

Router.post('/:nameCourse/checkout', ensureAuthenticated, function _callee2(req, res) {
  var course, name, success, fail, create_payment_json;
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
          //Tạo thanh toán
          name = course.name.split(' ').join('%20');
          success = 'http://localhost:8000/payment/' + name + '/success';
          fail = 'http://localhost:8000/payment/' + name + '/fail';
          create_payment_json = {
            intent: "sale",
            payer: {
              payment_method: "paypal"
            },
            redirect_urls: {
              return_url: success,
              cancel_url: fail
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

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Thanh toán thành công trả về trang ds khóa học

Router.get('/:nameCourse/success', function _callee3(req, res) {
  var course;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Course.findOne({
            name: req.params.nameCourse
          }).populate('idCourseTopic'));

        case 2:
          course = _context3.sent;
          //Tăng học sinh khóa học, tăng đăng kí của Topic, category
          course.numberOfStudent += 1;
          course.save();
          CourseTopic.findOne({
            _id: course.populated('idCourseTopic')
          }).then(function (doc) {
            doc.numberOfSignUp += 1;
            doc.save();
          });
          CourseCategory.findOne({
            _id: course.idCourseTopic.idCourseCategory
          }).then(function (doc) {
            doc.numberOfSignUp += 1;
            doc.save();
          }); //Thêm khóa học vào danh sách khóa học

          req.user.idCourses.push(course._id);
          req.user.save().then(console.log('Mua thành công')); //CHuyển hướng về danh sách khóa học

          res.redirect('/my-courses');

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //Thanh toán thất bại trả về trang ds khóa học

Router.get('/:nameCourse/fail', function (req, res) {
  res.redirect('/my-courses');
});
module.exports = Router;