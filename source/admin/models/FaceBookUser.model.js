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
        default: '/public/avatar/default/avatar.png'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    idCourses: {
        type: [mongoose.Schema.ObjectId],
        ref: 'courses'
    },
    idWishList: {
        type: [mongoose.Schema.ObjectId],
        ref: 'courses'
    }
});

const FaceBookUser = mongoose.model('facebookusers', FaceBookUserSchema);

module.exports = FaceBookUser;