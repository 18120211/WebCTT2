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
    res.render("admin/account/edit", {
      user: req.user,
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
        
        res.render("admin/lecturer/lecturersList", {
            user: req.user, data:data
        })
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

router.post("/account/edit", async  (req, res) => {
    console.log(req.user.email);
    Admin.findOne({email:req.user.email}).then((user)=>{
        if(user){
            user.name = req.body.name;
            user.gender = req.body.gender;
            user.description = req.body.description;
            user.avatar = req.body.avatar;
            user.save();
        }
    });
    Lecturer.findOne({email:req.user.email}).then((user)=>{
        if(user){
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

router.get("/is-user-available", function (req, res) {
    Admin.findOne({email:req.query.email}).then((user)=>{
        if(user){
            res.json(false);
            return;
        }
    });
    Lecturer.findOne({email:req.query.email}).then((user)=>{
        if(user){
          res.json(false);
          return;
        }
    });
    res.json(true);
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

    console.log(req.user._id);
    fs.mkdir(path.join(__dirname, '../public/avatar/'+req.user._id.toString()), () => {});
  
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/avatar/' + req.user._id);
      },
      filename: function (req, file, cb) {
        let avatar = ('/public/avatar/') + req.user._id.toString() + '/' + 'avatar.png';
        Lecturer.findOne({
          _id: req.user._id
        }).then((user) => {
          user.avatar = avatar;
          user.save();
        });
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
        const avatar =  ('/public/avatar/') + req.user._id.toString() + '/' + 'avatar.png';
        res.json(avatar);
      }
    });
  });
module.exports = router;