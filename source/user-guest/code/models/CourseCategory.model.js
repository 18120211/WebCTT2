const mongoose = require('mongoose');

const CourseTopic = require('./CourseTopic.enum');

const CategoryEnum = require('./CourseCategory.enum');

const CourseCategorySchema = mongoose.Schema({
    name: {
        type: CategoryEnum,
        required: true
    },
    topic: {
        type: CourseTopic,
        requried: true
    },
    numberOfView: {
        type: Number,
        default : 0
    }
});

const CourseCategory = mongoose.model('coursecategories', CourseCategorySchema);

module.exports = CourseCategory;