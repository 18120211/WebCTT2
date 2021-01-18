const mongoose = require('mongoose');

const LocalUserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        reuqired: true
    },
    name: {
        type: String,
        requried: true
    },
    gender: {
        type: String,
        default: 'female'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/teamwebctt2/image/upload/v1610695375/webctt2/avatar/default/avatar.png'
    }, 
    isAuth: {
        type: Boolean,
        default: false
    },
    otpNumber: {
        type: String
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
        default: true
    }
});

const LocalUser = mongoose.model('localusers', LocalUserSchema);

module.exports = LocalUser;