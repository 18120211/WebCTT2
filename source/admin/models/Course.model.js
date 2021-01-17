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
        type: Number,
        default: 0
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
    idCourseTopic: {
        type: mongoose.Schema.ObjectId,
        ref: 'coursetopics'
    },
    uploadDate: {
        type: Date,
        default: Date.now()
    },
    idLecturer: {
        type: mongoose.Schema.ObjectId,
        ref: 'lecturers'
    },
    videos: {
        type: [{
            name: String,
            source: String
        }]
    },
    numberOfVideos: {
        type: Number,
        default: 0
    },
    previewIndex: {
        type: [Number]
    },
    whatYoullLearn: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: true,
    },
});

const Course = mongoose.model('courses', CourseSchema);

module.exports = Course;