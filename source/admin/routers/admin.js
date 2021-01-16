const express = require("express");

const router = express.Router();

const Admin = require("../models/Admin.model");

const Lecturer = require("../models/Lecturer.model");

const Course = require("../models/Course.model");

const Category = require("../models/CourseCategory.model");

const Topic = require("../models/CourseTopic.model");

const LocalUser = require("../models/LocalUser.model");



const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

const passport = require("passport");

const multer = require('multer');

const fs = require('fs');

const path = require('path');

const {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../config/auth_admin");


// Home Page


router.get("/homepage", ensureAuthenticated,  (req, res) => {
  res.render("admin/common/home", {
    user: req.user,
  })
});

router.get("/account/edit", ensureAuthenticated,  (req, res) => {
    let data = [];
    data["title"] = "Thông tin tài khoản";
    res.render("admin/account/edit", {
      user: req.user,data :data
    })
});

router.post("/account/edit", ensureAuthenticated,  (req, res) => {
  Admin.findOne({email:req.user.email}).then( async (user)=>{
      if(user){
          if( req.body.password !==""){
            user.password =await bcrypt.hash(req.body.password, 10);
          }
          user.name = req.body.name;
          user.gender = req.body.gender;
          user.description = req.body.description;
          user.avatar = req.body.avatar;
          user.save();
      }
  });
  Lecturer.findOne({email:req.user.email}).then(async (user)=>{
      if(user){
          if( req.body.password !==""){
            user.password = await bcrypt.hash(req.body.password, 10);
          }
          user.name = req.body.name;
          user.gender = req.body.gender;
          user.description = req.body.description;
          user.avatar = req.body.avatar;
          user.save();
      }
  });
  res.redirect("/admin/account/edit");
});

//route for lecturers
router.get("/lecturer/lecturersList", ensureAuthenticated,  (req, res) => {
   
    Lecturer.find({}, function(err, Lecturers) {
        let data = [];
        let Lecturers_arr = [];

    
        Lecturers.forEach(function(Lecturer) {

            Lecturers_arr.push(Lecturer);

        });

        data['Lecturers'] = Lecturers_arr;

        data["title"] = "Danh sách giảng viên";

        res.render("admin/lecturer/lecturersList", {
            user: req.user, data:data
        })
    });

    
});
router.get("/lecturer/lecturerEdit",ensureAuthenticated, function (req, res) {

  
  Lecturer.findById(req.query.id).then((user)=>{
      let data = [];
      let Lecturer_info;

      if(user){
        Lecturer_info = user;
      }

      data["Lecturer_info"] = Lecturer_info;

      data["title"] = "Thông tin giảng viên";
      
      res.render("admin/lecturer/lecturerEdit",{
        user:req.user, data:data
      });
  });
});
router.post("/lecturer/lecturerEdit",ensureAuthenticated,async function (req, res) {
  const {
    id,
    name,
    gender,
    password,
    description,
    avatar, 
  } = req.body; 

  Lecturer.findById(id).then(async (user)=>{
    if(user){
        if( password !==""){
          user.password = await bcrypt.hash(req.body.password, 10);
        }
        user.name = req.body.name;
        user.gender = req.body.gender;
        user.description = req.body.description;
        user.avatar = req.body.avatar;
        user.save();
    }
  });
  res.redirect("/admin/lecturer/lecturersList");
});
router.get("/lecturer/lecturerAdd",ensureAuthenticated, function (req, res) {
  
      let data = [];

      data["title"] = "Thông tin giảng viên";
      
      res.render("admin/lecturer/lecturerAdd",{
        user:req.user, data:data
      });
 
});
router.post("/lecturer/lecturerAdd",ensureAuthenticated,async function (req, res) {
  const {
    email,
    name,
    gender,
    password,
    description,
  } = req.body; 

    const newLecturer = new Lecturer({
      email ,
      password,
      name,
      gender,
      description,
    });

    newLecturer.password =  await bcrypt.hash(newLecturer.password, 10);
    newLecturer.save().then(()=>{
      console.log("user save");
    });
  res.redirect("/admin/lecturer/lecturersList");
});
router.get("/lecturer/lecturerDelete",ensureAuthenticated,async function (req, res) {
  Lecturer.findByIdAndDelete(req.query.id).then( async (user)=>{
    if(user){
      res.json(true);
    }else{
      res.json(false);
    }
  });
});

//route for Category
router.get("/course/categoryList", ensureAuthenticated,  (req, res) => {
   
  Category.find({}, function(err, Categories) {
      let data = [];
      let Categories_arr = [];

      Categories.forEach(function(Category) {

        Categories_arr.push(Category);

      });

      data['Categories'] = Categories_arr;
      data['title'] = "Danh sách Category";
      res.render("admin/course/categoryList", {
          user: req.user, data:data
      })
  });

  
});
router.get("/course/categoryEdit",ensureAuthenticated, async function (req, res) {
  let data = [];

  let category_info = await  Category.findById(req.query.id);;
  
  var Categories = await Category.find({});

  data["category_info"] = category_info;

  data["categories_option"] = Categories;

  data["title"] = "Thông tin giảng viên";
  
  res.render("admin/course/categoryEdit",{
    user:req.user, data:data
  });
});

router.post("/course/categoryEdit",ensureAuthenticated,async function (req, res) {
  const {
    name,
    image,
    parent,
    id
  } = req.body; 

  Category.findById(id).then(async (category)=>{
    if(category){
      category.name = name;
      category.image = image;
      category.parent = parent;
      category.save();
    }
  });
  res.redirect("/admin/course/categoryList");
});
router.get("/course/categoryAdd",ensureAuthenticated,async function (req, res) {
  
      let data = [];
      
      var Categories = await Category.find({});
    
    
      data["categories_option"] = Categories;
    
      data["title"] = "Tạo Category";
      
      res.render("admin/course/categoryAdd",{
        user:req.user, data:data
      });
 
});
router.post("/course/categoryAdd",ensureAuthenticated,async function (req, res) {
  const {
    name,
    image,
    parent,
    id
  } = req.body;  

  const newcategory = new Category({
    name,
    image,
    parent,
    id
  });
  newcategory.save().then(()=>{
    console.log("Category save");
  });
  res.redirect("/admin/course/categoryList");
});
router.get("/course/categoryDelete",ensureAuthenticated,async function (req, res) {
  Category.findByIdAndDelete(req.query.id).then( async (category)=>{
    if(category){
      res.json(true);
    }else{
      res.json(false);
    }
  });
});


//route for Student
router.get("/student/studentsList", ensureAuthenticated,  (req, res) => {
   
  LocalUser.find({}, function(err, students) {
      let data = [];
      let students_arr = [];

      students.forEach(function(student) {

        students_arr.push(student);

      });

      data['students'] = students_arr;
      data['title'] = "Danh sách học viên";
      res.render("admin/student/studentsList", {
          user: req.user, data:data
      })
  });

  
});
router.get("/student/studentEdit",ensureAuthenticated, async function (req, res) {
  let data = [];

  let student_info = await  LocalUser.findById(req.query.id);;
  

  data["student_info"] = student_info;

  data["title"] = "Thông tin học viên";
  
  res.render("admin/student/studentEdit",{
    user:req.user, data:data
  });
});

router.get("/student/studentAdd",ensureAuthenticated,async function (req, res) {
  let data = [];
  
  data["title"] = "Tạo student";
  
  res.render("admin/student/studentAdd",{
    user:req.user, data:data
  });
});
router.post("/student/studentAdd",ensureAuthenticated,async function (req, res) {
  const {
    email,
    name,
    gender,
    password,
  } = req.body;  

  const newstudent = new LocalUser({
    email,
    name,
    gender,
    password,
  });

  newstudent.save().then(()=>{
    console.log("student save");
  });
  res.redirect("/admin/student/studentsList");
});
router.get("/student/studentDelete",ensureAuthenticated,async function (req, res) {
  LocalUser.findByIdAndDelete(req.query.id).then( async (student)=>{
    if(student){
      res.json(true);
    }else{
      res.json(false);
    }
  });
});




//route for Courses
router.get("/course/coursesList", ensureAuthenticated,  (req, res) => {
   
    Course.find({}, function(err, Courses) {
        let data = [];
        let Courses_arr = [];

    
        Courses.forEach(function(Course) {

            Courses_arr.push(Course);

        });

        data['Courses'] = Courses_arr;
        
        res.render("admin/course/coursesList", {
            user: req.user, data:data
        })
    });

    
});

router.get("/course/courseEdit",ensureAuthenticated, async function (req, res) {
  
  let data = [];
  
  data["title"] = "CHỈNH SỬA KHÓA HỌC";
  const CourseTopics_array = await Topic.find({}).populate('idCourseCategory').then(
    (CourseTopics)=>{
      let CourseTopics_array = [];
      if(CourseTopics){
        return CourseTopics;
      
      }
  });
  console.log("got into course edit");
  const Course_info = await  Course.findById(req.query.id);;
  
  data["course_info"] = Course_info;
  data["categories"] = CourseTopics_array;
  res.render("admin/course/courseEdit",{
    user:req.user, data:data
  });
});

router.post("/course/courseEdit", ensureAuthenticated,  (req, res) => {
    Admin.findOne({email:req.user.email}).then( async (user)=>{
        if(user){
            if( req.body.password !==""){
              user.password =await bcrypt.hash(req.body.password, 10);
            }
            user.name = req.body.name;
            user.gender = req.body.gender;
            user.description = req.body.description;
            user.avatar = req.body.avatar;
            user.save();
        }
    });
    Lecturer.findOne({email:req.user.email}).then(async (user)=>{
        if(user){
            if( req.body.password !==""){
              user.password = await bcrypt.hash(req.body.password, 10);
            }
            user.name = req.body.name;
            user.gender = req.body.gender;
            user.description = req.body.description;
            user.avatar = req.body.avatar;
            user.save();
        }
    });
    res.redirect("/admin/account/edit");
});

router.get("/course/courseAdd",ensureAuthenticated,async function (req, res) {
  let data = [];
  
  data["title"] = "TẠO KHÓA HỌC";
  const CourseTopics_array = await Topic.find({}).populate('idCourseCategory').then(
    (CourseTopics)=>{
      let CourseTopics_array = [];
      if(CourseTopics){
        return CourseTopics;
      
      }
  });

  data["categories"] = CourseTopics_array;

  res.render("admin/course/courseAdd",{
    user:req.user, data:data
  });
 

});
router.post("/course/courseAdd",ensureAuthenticated,async function (req, res) {
  const {
    name,
    lecture_id,
    category,
    number_of_video,
    description,
    what_you_learn,
  } = req.body;  

  const Course_new = new Course({
    name,
    idLecturer:lecture_id,
    idCourseTopic: category,
    numberOfVideos:number_of_video,
    description,
    whatYoullLearn:what_you_learn,
  });

  Course_new.save().then(()=>{
    console.log("student save");
  });
  res.redirect("/admin/course/courseEdit?id="+Course_new._id);
});

router.get("/course/courseDelete",ensureAuthenticated,async function (req, res) {
  LocalUser.findByIdAndDelete(req.query.id).then( async (student)=>{
    if(student){
      res.json(true);
    }else{
      res.json(false);
    }
  });
});

router.get("/test",async function (req, res) {
   const CourseTopics_array = await Topic.find({}).populate('idCourseCategory').then(
    (CourseTopics)=>{
      let CourseTopics_array = [];
      if(CourseTopics){
        return CourseTopics;
      
      }
    });

    console.log(CourseTopics_array);
});



router.post(
  "/login",
  passport.authenticate("admin", {
    failureRedirect: "/admin/login",
    successRedirect: "/admin/homepage",
  })
);

router.get("/login",forwardAuthenticated,async function (req, res) {
  let data = [];
  res.render("admin/common/login",{
    data:data
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/admin/login");
});

router.get("/register", function (req, res) {
  let data = [];
  const user = [];
  res.render("admin/common/register",{
    user,data
  });
});

router.get("/is-user-available", ensureAuthenticated, function (req, res) {
    Admin.findOne({email:req.query.email}).then((user)=>{
        if(user){
            res.json(false);
            return;
        }else{
          Lecturer.findOne({email:req.query.email}).then((user)=>{
            if(user){
              res.json(false);
            }else{
              res.json(true);
            }
          });
        }
    });
   
});

router.get("/is-local-user-available", ensureAuthenticated, function (req, res) {
  LocalUser.findOne({email:req.query.email}).then((user)=>{
      if(user){
          res.json(false);
      }else{
          res.json(true);
      }
  });
});






router.post("/register",async function (req, res) {
  const {
    email,
    password,
    re_password
  } = req.body; 
  if(password == re_password){

    const name = "minh";
    const gender = "nam";

    const newUser = new Lecturer({
      email ,
      password,
      name,
      gender
    });

    newUser.password =  await bcrypt.hash(newUser.password, 10);
    newUser.save().then(()=>{
      console.log("user save");
    });
  }
  res.redirect("/admin/register");
});

router.post('/upload', function (req, res) {

  console.log("send fiel");
  
    folder_name = req.query.folder;
    // fs.mkdir(path.join(__dirname, '../public/avatar/'+req.query.id.toString()), () => {});
    fs.mkdir(path.join(__dirname, '../public' + folder_name + req.query.id.toString()), () => {});

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // cb(null, './public/avatar/' + req.query.id);
        cb(null, './public' + folder_name + req.query.id);
        
        // cb(null, './public/avatar');

      },
      filename: function (req, file, cb) {
        let avatar = ('/public') + folder_name + req.query.id.toString() + '/' + 'avatar.png';

        // Lecturer.findOne({
        //   _id: req.user._id
        // }).then((user) => {
        //   user.avatar = avatar;
        //   user.save();
        // });
        if(req.query.fileType =="video"){
          cb(null, 'video.mp4');
        }else{
          cb(null, 'avatar.png');
        }
      }
    });
    const upload = multer({
      storage
    });
    upload.single('file')(req, res, function async (err) {
      if (err) {
        console.log(err);
      } else {
        var link;
        if(req.query.fileType =="video"){
           link =  ('/public') + folder_name  + req.query.id.toString() + '/' + 'video.mp4';
        }else{
           link =  ('/public') + folder_name  + req.query.id.toString() + '/' + 'avatar.png';
        }
        res.json(link);
      }
    });
  });
module.exports = router;