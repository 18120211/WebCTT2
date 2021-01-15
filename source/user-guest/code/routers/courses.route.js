const express = require("express");

const Router = express.Router();

const CourseTopic = require("../models/CourseTopic.model");

const Course = require("../models/Course.model");

const CourseCategory = require("../models/CourseCategory.model");

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
  //Danh sách các category
  const courseCategories = await CourseCategory.find({});
  //Danh sách các topic theo category[0]
  let courseTopics = await CourseTopic.find({
    idCourseCategory: courseCategories[0]._id,
  });
  console.log("courseTopics", courseTopics);

  //Render trang danh sách khóa học được truy vấn
  await res.render("./courses/list-courses", {
    isAuthenticated: req.isAuthenticated(),
    courses: courses,
    title: `Các khóa học ${queryString}`,
    courseCategories: courseCategories,
    courseTopics: courseTopics,
  });
});

//Xử lí yêu cầu ajax thay đổi giá trị category
Router.post("/:categoryName/getTopics", async (req, res) => {
  const categoryName = req.body.categoryName;
  const courseCategory = await CourseCategory.findOne({ name: categoryName });

  const topics = await CourseTopic
});

//Danh sách khóa học theo category
Router.get("/:categoryName", async (req, res) => {
  const categoryName = req.params.categoryName;
  const category = await CourseCategory.findOne({ name: categoryName });

  //Tìm khóa học theo category
  let courses = [];
  Course.find({})
    .populate("idCourseTopic")
    .then(async (docs) => {
      for (let i = 0; i < docs.length; i++) {
        if (docs[i].idCourseTopic.idCourseCategory.toString() == category._id) {
          await courses.push(docs[i]);
        }
      }
      //Render trang danh sách khóa học
      await res.render("./courses/list-courses", {
        isAuthenticated: req.isAuthenticated(),
        title: `${category.name} khóa học`,
        courses: courses,
      });
    });
});

//Danh sách khóa học theo topic
Router.get("/:categoryName/:topicName", async (req, res) => {
  const topicName = req.params.topicName;

  //Tìm khóa học theo Topic
  const courseTopic = await CourseTopic.findOne({ name: topicName });
  const courses = await Course.find({ idCourseTopic: courseTopic._id });

  //Render trang danh sách khóa học
  res.render("./courses/list-courses", {
    isAuthenticated: req.isAuthenticated(),
    title: `${courseTopic.name} khóa học`,
    courses: courses,
  });
});

module.exports = Router;
