const mongoose = require('mongoose');

const UserReviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Preview khóa học X'
    },
    idCourses: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    userComment: {
        type: [{
            idUser: mongoose.Schema.ObjectId,
            comment: String
        }]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    evaluationPoint: {
        type: Number,
        default: 1
    }
});

const UserReview = mongoose.model('userreviews', UserReviewSchema);

module.exports = UserReview;