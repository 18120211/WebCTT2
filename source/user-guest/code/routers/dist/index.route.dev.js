"use strict";

var express = require('express');

var Router = express.Router();

var Course = require('../models/Course.model');

var Lecturer = require('../models/Lecturer.model');

var CourseCategory = require("../models/CourseCategory.model");

var CourseTopic = require('../models/CourseTopic.model');

var _require = require('../config/auth.config'),
    ensureAuthenticated = _require.ensureAuthenticated,
    forwardAuthenticated = _require.forwardAuthenticated; //Trang chủ


Router.get('/', function _callee(req, res) {
  var proCourses, mostViewCourses, latestCourses;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Course.find({}, ['poster', '_id', 'name', 'idLecturer', 'evaluationPoint', 'numberOfEvaluation', 'tuition', 'numberOfStudent', 'idCourseTopic', 'numberOfView']).sort([['evaluationPoint', -1]]).populate('idLecturer').populate('idCourseTopic').limit(4));

        case 2:
          proCourses = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Course.find({}, ['poster', '_id', 'name', 'idLecturer', 'evaluationPoint', 'numberOfEvaluation', 'tuition', 'numberOfStudent', 'idCourseTopic', 'numberOfView']).sort([['numberOfView', -1]]).populate('idLecturer').populate('idCourseTopic').limit(10));

        case 5:
          mostViewCourses = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Course.find({}, ['poster', '_id', 'name', 'idLecturer', 'evaluationPoint', 'numberOfEvaluation', 'tuition', 'numberOfStudent', 'idCourseTopic', 'numberOfView']).sort([['uploadDate', 1]]).populate('idLecturer').populate('idCourseTopic').limit(10));

        case 8:
          latestCourses = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(res.render('./index/home', {
            isAuthenticated: req.isAuthenticated(),
            proCourses: proCourses,
            mostViewCourses: mostViewCourses,
            latestCourses: latestCourses
          }));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Trang danh sách khóa học yêu thích của tôi

Router.get('/my-wish-list', ensureAuthenticated, function _callee2(req, res) {
  var courses, i, course;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          courses = [];
          i = 0;

        case 2:
          if (!(i < req.user.idWishList.length)) {
            _context2.next = 11;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(Course.findOne({
            _id: req.user.idWishList[i]
          }, ['poster', '_id', 'name', 'idLecturer', 'evaluationPoint', 'numberOfEvaluation', 'tuition', 'numberOfStudent', 'idCourseTopic', 'numberOfView']).populate('idCourseTopic').populate('idLecturer'));

        case 5:
          course = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(courses.push(course));

        case 8:
          i++;
          _context2.next = 2;
          break;

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(res.render('./index/my-wish-list', {
            isAuthenticated: req.isAuthenticated(),
            courses: courses
          }));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Trang danh sách khóa học của tôi

Router.get('/my-courses', ensureAuthenticated, function _callee3(req, res) {
  var courses, i, course;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          courses = [];
          i = 0;

        case 2:
          if (!(i < req.user.idCourses.length)) {
            _context3.next = 11;
            break;
          }

          _context3.next = 5;
          return regeneratorRuntime.awrap(Course.findOne({
            _id: req.user.idCourses[i]
          }, ['poster', '_id', 'name', 'idLecturer', 'evaluationPoint', 'numberOfEvaluation', 'tuition', 'numberOfStudent', 'idCourseTopic', 'numberOfView']).populate('idCourseTopic').populate('idLecturer'));

        case 5:
          course = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(courses.push(course));

        case 8:
          i++;
          _context3.next = 2;
          break;

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(res.render('./index/my-courses', {
            isAuthenticated: req.isAuthenticated(),
            courses: courses
          }));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = Router;