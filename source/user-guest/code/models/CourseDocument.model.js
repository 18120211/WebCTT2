const mongoose = require('mongoose');

const TopicEnum = require('./CourseTopic.enum');

const CourseDocumentSchema = mongoose.Schema({
    nameDoc: {
        type: String,
        required: true
    },
    topic: {
        type: TopicEnum,
        required: true
    },
    name: {
        type: []
    },
    video: {
        type: []
    }
});

const CourseDocument = mongoose.model('coursedocuments', CourseDocumentSchema);

module.exports = CourseDocument;