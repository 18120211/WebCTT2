const mongoose = require('mongoose');

const CategoryEnum = require('./CourseCategory.enum');

const CourseCategorySchema = mongoose.Schema({
    name: {
        type: CategoryEnum,
        required: true
    },
    numberOfView: {
        type: Number,
        default : 0
    },
    image : {
        type: String,
        default: '/public/avatar/default/avatar.png'
    },
    numberOfSignUp: {
        type: Number,
        default: 0
    },
    parent: {
        type: String,
        default: ""
    }
});

const CourseCategory = mongoose.model('coursecategories', CourseCategorySchema);

module.exports = CourseCategory;