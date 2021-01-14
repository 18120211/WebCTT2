const mongoose = require('mongoose');

const TopicEnum = require('./CourseTopic.enum');

const CourseTopicSchema = mongoose.Schema({
    name: {
        type: TopicEnum,
        required: true,
        unique: true
    },
    numberOfView: {
        type: Number,
        default: 0
    },
    numberOfSignUp: {
        type: Number,
        default: 0
    },
    idCourseCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'coursecategories'
    }
});

const CourseTopic = mongoose.model('coursetopics', CourseTopicSchema);

module.exports = CourseTopic;