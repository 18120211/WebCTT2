const express = require('express');

const Router = express.Router();

const Course = require('../models/Course.model');

const Lecturer = require('../models/Lecturer.model');

const CourseCategory = require("../models/CourseCategory.model");

const CourseTopic = require('../models/CourseTopic.model');

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
            'idCourseTopic'
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
            'idCourseTopic'
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
            'idCourseTopic'
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

module.exports = Router;