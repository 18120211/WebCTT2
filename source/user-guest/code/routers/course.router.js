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
        .populate('idCourseTopic')
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

Router.get('/:nameCourse/checkout', async (req, res) => {
    const now = new Date(Date.now());
    const date = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
    res.render('./course/checkout', {
        date: date
    })
});

module.exports = Router;