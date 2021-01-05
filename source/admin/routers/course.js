const express = require('express');

const Router = express.Router();

const Course = require('../models/Course.model');

const Lecturer = require('../models/Lecturer.model');

const CourseCategory = require('../models/CourseCategory.model');

Router.get('/:nameCourse', async (req, res) => {
    let nameCourse = req.params.nameCourse.toString();

    const course = await Course.findOne({
            name: nameCourse
        })
        .populate('idLecturer')
        .populate('idCourseCategory')
    let isWishCourse = false;
    if (req.user != undefined && req.user.idWishList.indexOf(course._id) != -1) {
        isWishCourse = true
    }
    res.render('./course/detail', {
        isAuthenticated: req.isAuthenticated(),
        isWishCourse: isWishCourse,
        course: course
    });
});

module.exports = Router;