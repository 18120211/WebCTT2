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
        default: '/public/avatar/default/avatar.png'
    }, 
    isAuth: {
        type: Boolean,
        default: false
    },
    otpNumber: {
        type: String
    },
    idCourses: {
        type: [mongoose.Schema.ObjectId],
        ref: 'courses'
    },
    idWishList: {
        type: [mongoose.Schema.ObjectId],
        ref: 'courses'
    },
    status: {
        type: Boolean,
        default: true,
    },
});

const LocalUser = mongoose.model('localusers', LocalUserSchema);

module.exports = LocalUser;