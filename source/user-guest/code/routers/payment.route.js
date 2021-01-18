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

//Bấm vào nút mua luôn ở trang chi tiết khóa học
Router.get('/:nameCourse/checkout', ensureAuthenticated, async (req, res) => {
    const course = await Course.findOne({
        name: req.params.nameCourse
    });
    const now = new Date(Date.now());
    const date = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
    res.render('./payment/checkout', {
        isAuthenticated: req.isAuthenticated(),
        course: course,
        date: date,
        user: req.user
    })
});

//Bấm vào nút thanh toán
Router.post('/:nameCourse/checkout', ensureAuthenticated, async (req, res) => {
    const course = await Course.findOne({
        name: req.params.nameCourse
    });

    //Tạo thanh toán
    const name = course.name.split(' ').join('%20');
    let success = 'http://localhost:8000/payment/'+name+'/success';
    let fail = 'http://localhost:8000/payment/'+name+'/fail';

    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: success,
            cancel_url: fail,
        },
        transactions: [{
            item_list: {
                items: [{
                    name: course.name,
                    sku: "001",
                    price: course.tuition,
                    currency: "USD",
                    quantity: 1,
                }, ],
            },
            amount: {
                currency: "USD",
                total: course.tuition,
            },
            description: "Thanh toán khóa học online của Minh Võ Store",
        }, ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                //console.log(payment);
                if (payment.links[i].rel === "approval_url") {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

//Thanh toán thành công trả về trang ds khóa học
Router.get('/:nameCourse/success', async (req, res) =>{
    const course = await Course.findOne({
        name: req.params.nameCourse
    }).populate('idCourseTopic');

    //Tăng học sinh khóa học, tăng đăng kí của Topic, category
    course.numberOfStudent += 1;
    course.save();
    CourseTopic.findOne({
        _id: course.populated('idCourseTopic')
    }).then(doc=>{
        doc.numberOfSignUp += 1;
        doc.save();
    });
    CourseCategory.findOne({
        _id: course.idCourseTopic.idCourseCategory
    }).then(doc=>{
        doc.numberOfSignUp += 1;
        doc.save();
    });

    //Thêm khóa học vào danh sách khóa học đã mua
    req.user.purchasedCourses.push({
        idCourse: course._id,
        learnedVideos: []
    });
    req.user.save().then(console.log('Mua thành công'));

    //CHuyển hướng về danh sách khóa học
    res.redirect('/my-courses');
});

//Thanh toán thất bại trả về trang ds khóa học
Router.get('/:nameCourse/fail', (req, res)=>{
    res.redirect('/my-courses');
});

module.exports = Router;