const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        default: '/public/poster/default/poster.png'
    },
    description: {
        type: String,
        default: 'Đây là miêu tả khóa học'
    },
    evaluationPoint: {
        type: String,
        default: '0'
    },
    numberOfEvaluation: {
        type: Number,
        default: 0
    },
    numberOfStudent: {
        type: Number,
        default: 0
    },
    numberOfView: {
        type: Number,
        default: 0
    },
    tuition: {
        type: Number,
        default: 10 //USD
    },
    idCourseCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'coursecategories'
    },
    uploadDate: {
        type: Date,
        default: Date.now()
    },
    idCourseDocument: {
        type: mongoose.Schema.ObjectId,
        ref: 'coursedocuments'  
    },
    idLecturer: {
        type: mongoose.Schema.ObjectId,
        ref: 'lecturers'
    }
});

const Course = mongoose.model('courses', CourseSchema);

module.exports = Course;