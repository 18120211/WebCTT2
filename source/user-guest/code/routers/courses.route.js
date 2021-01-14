const express = require("express");

const Router = express.Router();

const CourseTopic = require("../models/CourseTopic.model");

const Course = require("../models/Course.model");

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
    queryString: queryString
  });
});

module.exports = Router;
