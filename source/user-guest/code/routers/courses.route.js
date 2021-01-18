const express = require("express");

const Router = express.Router();

const CourseTopic = require("../models/CourseTopic.model");

const Course = require("../models/Course.model");

const CourseCategory = require("../models/CourseCategory.model");

//Danh sách khóa học người dùng truy vấn
Router.get("/search", async (req, res) => {
  const queryString = req.query.queryString;
  const idCourseTopic = req.query.courseTopicID;
  let page = +req.query.page;

  //Nếu page == undefined thi page = 1
  if (Number.isNaN(page)) {
    page = 1;
  }

  //Tìm các khóa học theo câu truy vấn
  //Trường hợp tìm kiếm không có idTopic
  let courses;
  let numberOfPage = 0;
  if (idCourseTopic == undefined) {
    courses = await Course.find({ $text: { $search: queryString } });
    numberOfPage = Math.ceil(courses.length / 5);
  }
  //Trường hợp tìm kiếm có idTopic
  else if (idCourseTopic != undefined) {
    courses = await Course.find({
      $text: { $search: queryString },
      idCourseTopic: idCourseTopic,
    });
    numberOfPage = Math.ceil(courses.length / 5);
  }
  //Lấy đúng 5 khóa học theo số trang
  courses = courses.slice((page - 1) * 5, (page - 1) * 5 + 5);
  //Danh sách các category
  const courseCategories = await CourseCategory.find({});

  //Render trang danh sách khóa học được truy vấn
  await res.render("./courses/list-courses", {
    isAuthenticated: req.isAuthenticated(),
    courses: courses,
    title: `Các khóa học ${queryString}`,
    courseCategories: courseCategories,
    searchInput: queryString,
    page: page,
    isFilter: true, //List khóa học này cần filter
    numberOfPage: numberOfPage,
    user: req.user
  });
});

//Xử lí yêu cầu ajax thay đổi giá trị category
Router.post("/:categoryName/getTopics", async (req, res) => {
  const categoryName = req.params.categoryName;
  const courseCategory = await CourseCategory.findOne({ name: categoryName });

  const topics = await CourseTopic.find(
    {
      idCourseCategory: courseCategory._id,
    },
    ["name"]
  );
  await res.json(topics);
});

//Danh sách khóa học theo category
Router.get("/:categoryName", async (req, res) => {
  const categoryName = req.params.categoryName;
  const category = await CourseCategory.findOne({ name: categoryName });
  let page = +req.query.page;

  if (Number.isNaN(page) == true) {
    page = 1;
  }

  //Tìm khóa học theo category
  let courses = [];
  let numberOfPage = 0;
  Course.find({})
    .populate("idCourseTopic")
    .then(async (docs) => {
      for (let i = 0; i < docs.length; i++) {
        if (docs[i].idCourseTopic.idCourseCategory.toString() == category._id) {
          await courses.push(docs[i]);
        }
      }
      //Số trang của khóa học
      numberOfPage = Math.ceil(courses.length / 5);

      //Lấy đúng 5 khóa học theo số trang
      courses = courses.slice((page - 1) * 5, (page - 1) * 5 + 5);
      //Render trang danh sách khóa học
      await res.render("./courses/list-courses", {
        isAuthenticated: req.isAuthenticated(),
        title: `${category.name} khóa học`,
        courses: courses,
        page: page,
        isFilter: false, //List khóa học này không cần filter
        numberOfPage: numberOfPage,
        user: req.user
      });
    });
});

//Danh sách khóa học theo topic
Router.get("/:categoryName/:topicName", async (req, res) => {
  const topicName = req.params.topicName;
  let page = +req.query.page;

  if (Number.isNaN(page) == true) {
    page = 1;
  }

  //Tìm khóa học theo Topic
  const courseTopic = await CourseTopic.findOne({ name: topicName });
  let courses = await Course.find({ idCourseTopic: courseTopic._id });
  let numberOfPage = Math.ceil(courses.length / 5);
  //Lấy đúng 5 khóa học theo số trang
  courses = courses.slice((page - 1) * 5, (page - 1) * 5 + 5);

  //Render trang danh sách khóa học
  res.render("./courses/list-courses", {
    isAuthenticated: req.isAuthenticated(),
    title: `${courseTopic.name} khóa học`,
    courses: courses,
    page: page,
    isFilter: false, //List khóa học này không cần filter
    numberOfPage: numberOfPage,
    user: req.user
  });
});

module.exports = Router;
