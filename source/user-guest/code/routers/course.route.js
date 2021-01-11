const express = require('express');

const Router = express.Router();

const Course = require('../models/Course.model');

const Lecturer = require('../models/Lecturer.model');

const CourseCategory = require('../models/CourseCategory.model');

const CourseTopic = require('../models/CourseTopic.model');

const paypal = require('paypal-rest-sdk');

const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth.config');

//Trang thông tin chi tiết khóa học
Router.get('/:nameCourse', async (req, res) => {
    let nameCourse = req.params.nameCourse.toString();
   
    const course = await Course.findOne({
            name: nameCourse
        })
        .populate('idLecturer')
        .populate('idCourseTopic');
        
    //Tăng view Topic và Category
    course.numberOfView += 1;
    course.save();
    CourseTopic.findOne({
        _id: course.populated('idCourseTopic')
    }).then((doc)=>{
        doc.numberOfView += 1;
        doc.save();
    });
    CourseCategory.findOne({
        _id: course.idCourseTopic.idCourseCategory
    }).then((doc)=>{
        doc.numberOfView += 1;
        doc.save();
    });
    
    //Render trang chi tiết khóa học
    //Kiểm tra khóa học đã được mua chưa
    let isPaid = false;
    if (req.user != undefined && req.user.idCourses.indexOf(course._id) != -1) {
        isPaid = true;
    }
    //Kiểm tra khóa học có trong danh sách yêu thích không
    let isWishCourse = false;
    if (req.user != undefined && req.user.idWishList.indexOf(course._id) != -1) {
        isWishCourse = true
    }
    //Kiểm tra đã đánh giá chưa
    let isEvaluate = false;
    let myEvaluationPoint;
    if(req.user != undefined) {
        for (let i = 0; i < course.userEvaluations.length; i++) {
            if (course.userEvaluations[i].idUser == req.user._id) {
                isEvaluate = true;
            }
        }
    }
    res.render('./course/detail', {
        isAuthenticated: req.isAuthenticated(),
        isWishCourse: isWishCourse,
        course: course,
        isPaid: isPaid,
        isEvaluate

    });
});



module.exports = Router;