const express = require('express');

const Router = express.Router();

const Course = require('../models/Course.model');

const Lecturer = require('../models/Lecturer.model');

const CourseCategory = require("../models/CourseCategory.model");

const CourseTopic = require('../models/CourseTopic.model');

const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth.config');


//Trang chủ
Router.get('/', async (req, res) => {
    //4 khóa học được quan tâm nhất(dựa trên điểm đánh giá), view trên tb
    const proCourses = await Course.find({}, [
            'poster',
            '_id',
            'name',
            'idLecturer',
            'evaluationPoint',
            'numberOfEvaluation',
            'tuition',
            'numberOfStudent',
            'idCourseTopic',
            'numberOfView'
        ])
        .sort([
            ['evaluationPoint', -1]
        ])
        .populate('idLecturer')
        .populate('idCourseTopic')
        .limit(4);
    
    //10 khóa học được xem nhiều nhất
    const mostViewCourses = await Course.find({}, [
            'poster',
            '_id',
            'name',
            'idLecturer',
            'evaluationPoint',
            'numberOfEvaluation',
            'tuition',
            'numberOfStudent',
            'idCourseTopic',
            'numberOfView'
        ])
        .sort([
            ['numberOfView', -1]
        ])
        .populate('idLecturer')
        .populate('idCourseTopic')
        .limit(10);

    //10 khóa học mới nhất 
    const latestCourses = await Course.find({}, [
            'poster',
            '_id',
            'name',
            'idLecturer',
            'evaluationPoint',
            'numberOfEvaluation',
            'tuition',
            'numberOfStudent',
            'idCourseTopic',
            'numberOfView'
        ])
        .sort([
            ['uploadDate', 1]
        ])
        .populate('idLecturer')
        .populate('idCourseTopic')
        .limit(10);

    await res.render('./index/home', {
        isAuthenticated: req.isAuthenticated(),
        proCourses: proCourses,
        mostViewCourses: mostViewCourses,
        latestCourses: latestCourses
    });
});


//Xử lí request ajax bấm vào nút yêu thích cảu client
Router.get('/wish-list-change', ensureAuthenticated, async (req, res) => {
    courseID = req.query.courseID;
    if (courseID != undefined) {
        let index;
        if ((index = req.user.idWishList.indexOf(courseID)) == -1) {
            req.user.idWishList.push(courseID);
        } else {
            req.user.idWishList.splice(index, 1);
        }
        req.user.save();
        res.end();
    }
});

//Trang danh sách khóa học yêu thích của tôi
Router.get('/my-wish-list', ensureAuthenticated, async (req, res) => {
    let courses = [];
    for (let i = 0; i < req.user.idWishList.length; i++) {
        const course = await Course
            .findOne({
                _id: req.user.idWishList[i]
            }, [
                'poster',
                '_id',
                'name',
                'idLecturer',
                'evaluationPoint',
                'numberOfEvaluation',
                'tuition',
                'numberOfStudent',
                'idCourseTopic'
            ])
            .populate('idCourseTopic')
            .populate('idLecturer');
        await courses.push(course);
    }
    await res.render('./index/my-wish-list', {
        isAuthenticated: req.isAuthenticated(),
        courses: courses
    });
});

//Trang danh sách khóa học của tôi
Router.get('/my-courses', ensureAuthenticated, async (req, res) => {
    let courses = [];
    for (let i = 0; i < req.user.idCourses.length; i++) {
        const course = await Course
            .findOne({
                _id: req.user.idCourses[i]
            }, [
                'poster',
                '_id',
                'name',
                'idLecturer',
                'evaluationPoint',
                'numberOfEvaluation',
                'tuition',
                'numberOfStudent',
                'idCourseTopic'
            ])
            .populate('idCourseTopic')
            .populate('idLecturer');
        await courses.push(course);
    }
    await res.render('./index/my-courses', {
        isAuthenticated: req.isAuthenticated(),
        courses: courses
    });
});

module.exports = Router;