const express = require("express");

const router = express.Router();

const Admin = require("../models/Admin.model");

const Lecturer = require("../models/Lecturer.model");

const Course = require("../models/Course.model");

const Category = require("../models/CourseCategory.model");

const Topic = require("../models/CourseTopic.model");

const LocalUser = require("../models/LocalUser.model");

const cloudinary = require("cloudinary").v2;

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
  res.redirect("/admin/course/coursesList");
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
    status,
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
        user.status = req.body.status;

        user.save();
    }
  });
  res.redirect("/admin/lecturer/lecturersList");
});
router.get("/lecturer/lecturerAdd",ensureAuthenticated, function (req, res) {
  
      let data = [];

      data["title"] = "Thêm giảng viên";
      
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
    status
  } = req.body; 

    const newLecturer = new Lecturer({
      email ,
      password,
      name,
      gender,
      description,
      status,
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
router.get("/course/categoryList", ensureAuthenticated, async (req, res) => {
   
  let data = [];
  let CourseTopics_array = [];
  let CourseCategories_array = [];
  let Category_array = [];

  CourseTopics_array = await Topic.find({}).populate('idCourseCategory').then(
    (CourseTopics)=>{
      if(CourseTopics){
        return CourseTopics;
      }
  });

  CourseCategories_array = await Category.find({});
  
  CourseCategories_array.forEach((Category_item) => {
    Category_array.push(Category_item);
    CourseTopics_array.forEach((Topic_item) =>{
      if(Topic_item.idCourseCategory._id.toString() == Category_item._id.toString()){
        Category_array.push(Topic_item);
      }
    })
  });
  data['Categories'] = Category_array;
  data['title'] = "Danh sách Category";
  res.render("admin/course/categoryList", {
      user: req.user, data:data
  })
  
});
router.get("/course/categoryEdit",ensureAuthenticated, async function (req, res) {
  let data = [];

  let category_info = await  Category.findById(req.query.id);;
  
  if(!category_info){
    category_info =  await  Topic.findById(req.query.id);;
  }

  var Categories = await Category.find({});

  data["category_info"] = category_info;

  data["categories_option"] = Categories;

  data["title"] = "Thông tin Category";
  
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
      category.save();
    }else{
      Topic.findById(id).then(async (topic)=>{
        if(topic){
          console.log("find topic");
          topic.name = name;
          topic.image = image;
          topic.idCourseCategory = parent;
          topic.save();
        }
      })
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
  } = req.body;  


  if(parent == 0){
    const newcategory = new Category({
      name,
    });
    newcategory.save();
  }else{
    const newTopic = new Topic({
      name,
      idCourseCategory:parent,
    });
    newTopic.save();
  }
  res.redirect("/admin/course/categoryList");
});
router.get("/course/categoryDelete",ensureAuthenticated,async function (req, res) {
  Category.findByIdAndDelete(req.query.id).then( async (category)=>{
    if(category){
      res.json(true);
    }else{
      Topic.findByIdAndDelete(req.query.id).then( async (Topic)=>{
        if(Topic){
          res.json(true);
        }else{
          res.json(false);
        }
      });
    }
  });
  
});

router.get("/course/categoryDelete-available",ensureAuthenticated,async function (req, res) {
  Category.findById(req.query.id).then( async (category)=>{
    if(category){
      const topic = await Topic.find({idCourseCategory:category._id});
      if(topic.length > 0){
        res.json(301);
      }
      else{
        res.json(100);
      }
    }else{
      Topic.findById(req.query.id).then( async (topic)=>{
        if(topic){
          const course = await Course.find({idCourseTopic:topic._id});
          if(course.length > 0){
            res.json(302);
          }else{
            res.json(100);
          }
        }else{
          res.json(303);
        }
      });
    }
  });
});
router.get("/course/categoryEdit-available",ensureAuthenticated,async function (req, res) {
  Category.findById(req.query.id).then( async (category)=>{
    if(category){
      const topic = await Topic.find({idCourseCategory:category._id});
      if(topic.length > 0){
        res.json(301);
      }
      else{
        res.json(100);
      }
    }else{
      res.json(100);
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

router.post("/student/studentEdit",ensureAuthenticated, async function (req, res) {
  const {
    id,
    gender,
    avatar, 
    name,
    password,
    status,
  } = req.body; 

  LocalUser.findById(id).then(async (user)=>{
    if(user){
        if( password !==""){
          user.password = await bcrypt.hash(req.body.password, 10);
        }
        user.name = req.body.name;
        user.gender = req.body.gender;
        user.description = req.body.description;
        user.avatar = req.body.avatar;
        user.status = req.body.status;

        user.save();
    }
  });
  res.redirect("/admin/student/studentsList");



  
  
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
    status
  } = req.body;  

  const newstudent = new LocalUser({
    email,
    name,
    gender,
    password,
    status
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
router.get("/course/coursesList", ensureAuthenticated, async  (req, res) => {
  let data = [];
  let Courses_arr = [];
  

  if(req.user.name == "admin"){
    Courses_arr  = await Course.find();
    if(req.query.lecture_filter){
      Courses_arr  = await Course.find({idLecturer:req.query.lecture_filter});
    }
    if(req.query.category_filter){
      Courses_arr  = await Course.find({idCourseTopic:req.query.category_filter});
    }
    if(req.query.lecture_filter && req.query.category_filter){
      Courses_arr  = await Course.find({idLecturer:req.query.lecture_filter,idCourseTopic:req.query.category_filter});
    }
    
  }else{
    Courses_arr  = await Course.find({idLecturer:req.user._id});
  }

  
  const CourseTopics_array = await Topic.find({}).populate('idCourseCategory').then(
    (CourseTopics)=>{
      if(CourseTopics){
        return CourseTopics;
      }
  });
  //console.log(CourseTopics_array);
  data['CourseTopics_array'] = CourseTopics_array;


  const Lecturers_array = await Lecturer.find({}).then(
    (Lecturer_arr)=>{
      if(Lecturer_arr){
        return Lecturer_arr;
      }
  });

  data['Lecturers_array'] = Lecturers_array;

  data['title'] = "Danh sách khóa học";
  
  data['category_filter'] =req.query.category_filter;
  data['lecture_filter'] =req.query.lecture_filter;

  data['title'] = "Danh sách khóa học";

  data['Courses'] = Courses_arr;
  
  res.render("admin/course/coursesList", {
      user: req.user, data:data
  })
  

    
});

router.get("/course/courseEdit",ensureAuthenticated, async function (req, res) {
  
  let data = [];
  
  data["title"] = "CHỈNH SỬA KHÓA HỌC";
  const CourseTopics_array = await Topic.find({}).populate('idCourseCategory').then(
    (CourseTopics)=>{
      if(CourseTopics){
        return CourseTopics;
      }
  });
  const Course_info = await  Course.findById(req.query.id);;

  data["course_info"] = Course_info;
  data["categories"] = CourseTopics_array;
  res.render("admin/course/courseEdit",{
    user:req.user, data:data
  });
});

router.post("/course/courseEdit", ensureAuthenticated, async (req, res) => {
  const {
    name,
    lecture_id,
    category,
    number_of_video,
    description,
    what_you_learn,
    id,
    image,
    videos,
    status,
  } = req.body;  


  //add video
  let courses_video = [];
  if(videos){
    videos.forEach((video) => {
        video_item = {
          name: video.name,
          source: video.href,
        }
        courses_video.push(video_item);

    });
  }
   Course.findById(id).then((Course_finded)=>{
    if(Course_finded){
      Course_finded.name = name;
      Course_finded.idLecturer = lecture_id;
      Course_finded.idCourseTopic = category;
      Course_finded.numberOfVideos = number_of_video;
      Course_finded.description = description;
      Course_finded.whatYoullLearn = what_you_learn;
      Course_finded.poster = image;
      Course_finded.videos = courses_video;
      Course_finded.status = status;

      Course_finded.save();
      console.log("course saved");
    } 
    });
    res.redirect("/admin/course/coursesList");
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
    status,
  } = req.body;  

  const Course_new = new Course({
    name,
    idLecturer:lecture_id,
    idCourseTopic: category,
    numberOfVideos:number_of_video,
    description,
    whatYoullLearn:what_you_learn,
    status,
  });

  Course_new.save().then(()=>{
    console.log("course save");
    res.redirect("/admin/course/courseEdit?id="+Course_new._id);
  });
});

router.get("/course/courseDelete",ensureAuthenticated,async function (req, res) {
  Course.findByIdAndDelete(req.query.id).then( async (student)=>{
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
        var avatar
        if(req.query.fileType =="video"){
           avatar =  ('/public') + folder_name  + req.query.id.toString() + '/' + 'video.mp4';
           const file_path = path.dirname(require.main.filename) + avatar;
           cloudinary.uploader.upload(file_path, {
            resource_type: "video",
            public_id: req.query.folder_cloud + '/' +req.query.id.toString() + '/video.mp4',
            chunk_size: 6000000,
          },  function(error, result) {
            if (error) {
              // handle error
            } else {
              res.json(result.url);
            }
          });
        }else{
           avatar =  ('/public') + folder_name  + req.query.id.toString() + '/' + 'avatar.png';
           const file_path = path.dirname(require.main.filename) + avatar;
           cloudinary.uploader.upload(file_path, {
            public_id: req.query.folder_cloud + '/' +req.query.id.toString() + '/avatar.png',
            chunk_size: 6000000,
          },  function(error, result) {
            if (error) {
              // handle error
            } else {
              res.json(result.url);
            }
          });
        }
        

        
      }
    });
  });
module.exports = router;