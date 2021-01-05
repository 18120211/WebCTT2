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
    forwardAuthenticated = _require.forwardAuthenticated; //Trang thông tin chi tiết khóa học


Router.get('/:nameCourse', function _callee(req, res) {
  var nameCourse, course, isPaid, isWishCourse;
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
          //Tăng view Topic và Category
          course.numberOfView += 1;
          course.save();
          CourseTopic.findOne({
            _id: course.populated('idCourseTopic')
          }).then(function (doc) {
            doc.numberOfView += 1;
            doc.save();
          });
          CourseCategory.findOne({
            _id: course.idCourseTopic.idCourseCategory
          }).then(function (doc) {
            doc.numberOfView += 1;
            doc.save();
          }); //Render trang chi tiết khóa học

          isPaid = false;

          if (req.user != undefined && req.user.idCourses.indexOf(course._id) != -1) {
            isPaid = true;
          }

          isWishCourse = false;

          if (req.user != undefined && req.user.idWishList.indexOf(course._id) != -1) {
            isWishCourse = true;
          }

          res.render('./course/detail', {
            isAuthenticated: req.isAuthenticated(),
            isWishCourse: isWishCourse,
            course: course,
            isPaid: isPaid
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = Router;