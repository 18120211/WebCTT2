const express = require("express");

const Router = express.Router();

const Course = require("../models/Course.model");

const Lecturer = require("../models/Lecturer.model");

const CourseCategory = require("../models/CourseCategory.model");

const CourseTopic = require("../models/CourseTopic.model");

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../config/auth.config");

//Trang chủ
Router.get("/", async (req, res) => {
  //3 khóa học được quan tâm nhất(dựa trên điểm đánh giá), view trên tb
  const proCourses = await Course.find({})
    .sort([["evaluationPoint", -1]])
    .populate("idLecturer")
    .populate("idCourseTopic")
    .limit(3);

  //10 khóa học được xem nhiều nhất
  const mostViewCourses = await Course.find({})
    .sort([["numberOfView", -1]])
    .populate("idLecturer")
    .populate("idCourseTopic")
    .limit(10);

  //10 khóa học mới nhất
  const latestCourses = await Course.find({})
    .sort([["uploadDate", -1]])
    .populate("idLecturer")
    .populate("idCourseTopic")
    .limit(10);

  //5 lĩnh vực được đăng ký nhiều nhất
  const mostSignUpCategory = await CourseCategory.find({})
    .sort([["numberOfSignUp", -1]])
    .limit(5);

  await res.render("./index/home", {
    isAuthenticated: req.isAuthenticated(),
    proCourses: proCourses,
    mostViewCourses: mostViewCourses,
    latestCourses: latestCourses,
    mostSignUpCategory: mostSignUpCategory,
    user: req.user
  });
});

//Trang danh sách khóa học yêu thích của tôi
Router.get("/my-wish-list", ensureAuthenticated, async (req, res) => {
  let page = +req.query.page;

  //Nếu page == undefined thi page = 1
  if (Number.isNaN(page)) {
    page = 1;
  }

  //Lấy ra danh sách khóa học
  let courses = [];
  let numberOfPage = 0;
  for (let i = 0; i < req.user.idWishList.length; i++) {
    const course = await Course.findOne(
      {
        _id: req.user.idWishList[i],
      },
      [
        "poster",
        "_id",
        "name",
        "idLecturer",
        "evaluationPoint",
        "userEvaluations",
        "tuition",
        "numberOfStudent",
        "idCourseTopic",
        "numberOfView",
      ]
    )
      .populate("idCourseTopic")
      .populate("idLecturer");
    await courses.push(course);
  }
  numberOfPage = Math.ceil(courses.length / 2);

  //Lấy ra đúng 5 khóa học
  courses = courses.slice((page-1) * 5, (page - 1) * 5 + 5);

  await res.render("./courses/list-courses", {
    isAuthenticated: req.isAuthenticated(),
    courses: courses,
    title: `Các khóa học yêu thích`,
    page: page,
    isFilter: false,
    numberOfPage: numberOfPage,
    user: req.user
  });
});

//Trang danh sách khóa học của tôi
Router.get("/my-courses", ensureAuthenticated, async (req, res) => {
  let page = +req.query.page;

  //Nếu page == undefined thi page = 1
  if (Number.isNaN(page)) {
    page = 1;
  }

  //Lấy ra danh sách khóa học
  let courses = [];
  let numberOfPage = 0;
  for (let i = 0; i < req.user.purchasedCourses.length; i++) {
    const course = await Course.findOne(
      {
        _id: req.user.purchasedCourses[i].idCourse,
      },
      [
        "poster",
        "_id",
        "name",
        "idLecturer",
        "evaluationPoint",
        "userEvaluations",
        "tuition",
        "numberOfStudent",
        "idCourseTopic",
        "numberOfView",
      ]
    )
      .populate("idCourseTopic")
      .populate("idLecturer");
    await courses.push(course);
  }
  numberOfPage = Math.ceil(courses.length / 5);

  //Lấy ra đúng 5 khóa học 
  courses = courses.slice((page - 1) * 5, (page - 1) *5 + 5);

  //Render trang danh sách khóa học
  await res.render("./courses/list-courses", {
    isAuthenticated: req.isAuthenticated(),
    courses: courses,
    title: `Các khóa học của tôi`,
    page: page,
    isFilter: false,
    numberOfPage: numberOfPage,
    user: req.user
  });
});

module.exports = Router;
