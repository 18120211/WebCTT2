const express = require("express");

const Router = express.Router();

const CourseTopic = require("../models/CourseTopic.model");

const Course = require("../models/Course.model");

const CourseCategory = require('../models/CourseCategory.model');

//Danh sách khóa học người dùng truy vấn
Router.get("/search", async (req, res) => {
  const queryString = req.query.queryString;
  const idCourseTopic = req.query.courseTopicID;
  const page = +req.query.page;
  console.log("body:", req.query);
  console.log("query: ", queryString);

  //Nếu page == undefined thi page = 1
  if (page == undefined) {
    page = 1;
  }

  //Tìm các khóa học theo câu truy vấn
  //Trường hợp tìm kiếm không có idTopic
  let courses;
  if (idCourseTopic == undefined) {
    courses = await Course.find({ $text: { $search: queryString } }).skip(
      (page - 1) * 5
    );
  }
  //Trường hợp tìm kiếm có idTopic
  else if (idCourseTopic != undefined) {
    courses = await Course.find(
      { $text: { $search: queryString } },
      { idCourseTopic: idCourseTopic }
    ).skip((page - 1) * 5);
  }

  //Render trang danh sách khóa học được truy vấn
  res.render("./courses/list-courses", {
    isAuthenticated: req.isAuthenticated(),
    courses: courses,
    title: `Các khóa học ${queryString}`
  });
});

//Danh sách khóa học theo category
Router.get("/:categoryName", async (req, res) => {
  const categoryName = req.params.categoryName;
  const category = await CourseCategory.findOne({name: categoryName});

  let courses = [];
  Course.find({})
    .populate("idCourseTopic")
    .then(async (docs) => {
      for (let i = 0; i < docs.length; i++) {
        if (docs[i].idCourseTopic.idCourseCategory.toString() == category._id) {
          await courses.push(docs[i]);
        }
      }
      await res.render('./courses/list-courses', {
        isAuthenticated: req.isAuthenticated(),
        title: `${category.name} khóa học`,
        courses: courses
      })
    });
});

module.exports = Router;
