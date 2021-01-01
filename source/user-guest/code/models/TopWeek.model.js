const mongoose = require('mongoose');

const TopWeekSchema = mongoose.Schema({
    name: {
        type: String,
        reuired: true,
    },
    nameTopCourses: {
        type: [String]
    },
    idTopCourses: {
        type: [mongoose.Schema.ObjectId],
        ref: 'courses'
    },
    nameTopCategories: {
        type: [String]
    },
    idTopCategories: {
        type: [mongoose.Schema.ObjectId],
        ref: 'coursecategories'
    }
});

const TopWeek = mongoose.model('topweeks', TopWeekSchema);

module.exports = TopWeek;