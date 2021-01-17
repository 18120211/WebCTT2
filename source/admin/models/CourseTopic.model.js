const mongoose = require('mongoose');

const TopicEnum = require('./CourseTopic.enum');

const CourseTopicSchema = mongoose.Schema({
    name: {
        type: TopicEnum,
        required: true
    },
    numberOfView: {
        type: Number,
        default: 0
    },
    numberOfSignUp: {
        type: Number,
        default: 0
    },
    image : {
        type: String,
        default: '/public/avatar/default/avatar.png'
    },
    idCourseCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'coursecategories'
    }
});

const CourseTopic = mongoose.model('coursetopics', CourseTopicSchema);

module.exports = CourseTopic;