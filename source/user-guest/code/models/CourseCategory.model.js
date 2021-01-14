const mongoose = require('mongoose');

const CategoryEnum = require('./CourseCategory.enum');

const CourseCategorySchema = mongoose.Schema({
    name: {
        type: CategoryEnum,
        required: true,
        unique: true
    },
    numberOfView: {
        type: Number,
        default : 0
    },
    numberOfSignUp: {
        type: Number,
        default: 0
    }
});

const CourseCategory = mongoose.model('coursecategories', CourseCategorySchema);

module.exports = CourseCategory;