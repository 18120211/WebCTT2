const mongoose = require('mongoose');

const FaceBookUserSchema = mongoose.Schema ({
    facebookId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        requried: true
    },
    gender: {
        type: String,
        default: 'female'
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/teamwebctt2/image/upload/v1610695375/webctt2/avatar/default/avatar.png'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    idWishList: {
        type: [mongoose.Schema.ObjectId],
        ref: 'courses'
    },
    purchasedCourses: {
        type: [{
            idCourse: {
                type: mongoose.Schema.ObjectId,
                ref: 'courses'
            },
            learnedVideos: [{
                type: Number
            }]
        }]
    },
    status: {
        type: Boolean,
        default: 'true'
    }
});

const FaceBookUser = mongoose.model('facebookusers', FaceBookUserSchema);

module.exports = FaceBookUser;