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
  var nameCourse, course, isPaid, isWishCourse, isEvaluate, myEvaluationPoint, i;
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
          //Kiểm tra khóa học đã được mua chưa

          isPaid = false;

          if (req.user != undefined && req.user.idCourses.indexOf(course._id) != -1) {
            isPaid = true;
          } //Kiểm tra khóa học có trong danh sách yêu thích không


          isWishCourse = false;

          if (req.user != undefined && req.user.idWishList.indexOf(course._id) != -1) {
            isWishCourse = true;
          } //Kiểm tra đã đánh giá chưa


          isEvaluate = false;
          myEvaluationPoint = 1;

          if (!(req.user != undefined)) {
            _context.next = 24;
            break;
          }

          i = 0;

        case 16:
          if (!(i < course.userEvaluations.length)) {
            _context.next = 24;
            break;
          }

          if (!(course.userEvaluations[i].idUser.toString() == req.user._id)) {
            _context.next = 21;
            break;
          }

          isEvaluate = true;
          myEvaluationPoint = course.userEvaluations[i].point;
          return _context.abrupt("break", 24);

        case 21:
          i++;
          _context.next = 16;
          break;

        case 24:
          res.render('./course/detail', {
            isAuthenticated: req.isAuthenticated(),
            isWishCourse: isWishCourse,
            course: course,
            isPaid: isPaid,
            isEvaluate: isEvaluate,
            myEvaluationPoint: myEvaluationPoint
          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
});
Router.post('/:nameCourse/evaluate', function _callee2(req, res) {
  var evaluationPoint, nameCourse, course, isEvaluate, i, newEvaluationPoint, _i, _newEvaluationPoint, _i2;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          evaluationPoint = +req.body.evaluationPoint;
          nameCourse = req.params.nameCourse; //Lấy ra khóa học vừa đánh giá

          _context2.next = 4;
          return regeneratorRuntime.awrap(Course.findOne({
            name: nameCourse
          }));

        case 4:
          course = _context2.sent;
          isEvaluate = false;
          i = 0;

        case 7:
          if (!(i < course.userEvaluations.length)) {
            _context2.next = 21;
            break;
          }

          if (!(course.userEvaluations[i].idUser.toString() == req.user._id)) {
            _context2.next = 18;
            break;
          }

          isEvaluate = true;
          course.userEvaluations[i].point = evaluationPoint; //Tính toán lại điểm đánh giá

          newEvaluationPoint = 0;

          for (_i = 0; _i < course.userEvaluations.length; _i++) {
            newEvaluationPoint += course.userEvaluations[_i].point;
          }

          newEvaluationPoint /= course.userEvaluations.length;
          newEvaluationPoint.toFixed(1);
          course.evaluationPoint = newEvaluationPoint; //Cập nhật lại khóa học

          course.save().then(function (doc) {
            res.json(true);
          });
          return _context2.abrupt("break", 21);

        case 18:
          i++;
          _context2.next = 7;
          break;

        case 21:
          //Nếu người dùng chưa đánh giá thì thêm đánh giá của người dùng vào
          if (!isEvaluate) {
            course.userEvaluations.push({
              idUser: req.user._id,
              point: evaluationPoint
            }); //Tính toán lại điểm đánh giá

            _newEvaluationPoint = 0;

            for (_i2 = 0; _i2 < course.userEvaluations.length; _i2++) {
              _newEvaluationPoint += course.userEvaluations[_i2].point;
            }

            _newEvaluationPoint /= course.userEvaluations.length;

            _newEvaluationPoint.toFixed(1);

            course.evaluationPoint = _newEvaluationPoint; //Cập nhật lại khóa học

            course.save().then(function (doc) {
              res.json(true);
            });
          }

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Xử lý tác vụ người dùng nhấn nút gửi bình luận

Router.post('/:nameCourse/comment', function _callee3(req, res) {
  var nameCourse, comment, course;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          nameCourse = req.params.nameCourse;
          comment = req.body.comment;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Course.findOne({
            name: nameCourse
          }));

        case 4:
          course = _context3.sent;
          course.userReviews.push({
            idUser: req.user._id,
            comment: comment
          });
          course.save().then(function (doc) {
            console.log(doc);
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = Router;