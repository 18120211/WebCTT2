const express = require('express');

const Router = express.Router();

const Course = require('../models/Course.model');

const Lecturer = require('../models/Lecturer.model');

const CourseCategory = require("../models/CourseCategory.model");

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
            'idCourseCategory'
        ])
        .sort([
            ['evaluationPoint', -1]
        ])
        .where('numberOfView').gt(100000)
        .populate('idLecturer')
        .populate('idCourseCategory')
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
            'idCourseCategory'
        ])
        .sort([
            ['numberOfView', -1]
        ])
        .populate('idLecturer')
        .populate('idCourseCategory')
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
            'idCourseCategory'
        ])
        .sort([
            ['uploadDate', 1]
        ])
        .populate('idLecturer')
        .populate('idCourseCategory')
        .limit(10);

    //Danh sách lĩnh vực đc đăng kí nhiều nhất
    const mostViewCategories = await CourseCategory.find({})
        .sort([
            ['numberOfView', -1]
        ]);

    await res.render('./index/home', {
        isAuthenticated: req.isAuthenticated(),
        proCourses: proCourses,
        mostViewCourses: mostViewCourses,
        latestCourses: latestCourses,
        mostViewCategories: mostViewCategories
    });
});

module.exports = Router;