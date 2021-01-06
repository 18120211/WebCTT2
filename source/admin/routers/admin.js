const express = require("express");

const router = express.Router();

const Admin = require("../models/Admin.model");

const Lecturer = require("../models/Lecturer.model");

const Course = require("../models/Course.model");

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
router.get("/", ensureAuthenticated,  (req, res) => {
    console.log(req.user);
    res.render("admin/common/home", {
      user: req.user,
    })
});

router.get("/login", function (req, res) {
  const data = [];
  res.render("admin/common/login",{
    data
  });
});



router.post(
  "/login",
  passport.authenticate("admin", {
    failureRedirect: "/admin/login",
    successRedirect: "/admin/homepage",
  })
);

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

    fs.mkdir(path.join(__dirname, '../public/avatar/'+req.query.id.toString()), () => {});

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/avatar/' + req.query.id);
        // cb(null, './public/avatar');

      },
      filename: function (req, file, cb) {
        let avatar = ('/public/avatar/') + req.query.id.toString() + '/' + 'avatar.png';
        // Lecturer.findOne({
        //   _id: req.user._id
        // }).then((user) => {
        //   user.avatar = avatar;
        //   user.save();
        // });
        cb(null, 'avatar.png');
      }
    });
    const upload = multer({
      storage
    });
    upload.single('file')(req, res, function async (err) {
      if (err) {
        console.log(err);
      } else {
        const avatar =  ('/public/avatar/') + req.query.id.toString() + '/' + 'avatar.png';
        res.json(avatar);
      }
    });
  });
module.exports = router;