const express = require('express');

const Router = express.Router();

const Course = require('../models/Course.model');

const Lecturer = require('../models/Lecturer.model');

const CourseCategory = require("../models/CourseCategory.model");

Router.get('/', async (req, res) => {
    const proCourse = await Course.find({})
        .sort([['numberOfView', -1]])
        .populate('idLecturer')
        .populate('idCourseCategory')
        .limit(4);
    console.log(proCourse);
    //res.send('Hello');
    await res.render('./index/home', {
        isAuthenticated: req.isAuthenticated(),
        proCourse: proCourse
    });
});

module.exports = Router;