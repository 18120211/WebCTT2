const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'admin'
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    date_added: {
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
    roll: {
        type: String,
        default: false
    },
});

const Lecturer = mongoose.model('admins', AdminSchema);

module.exports = Lecturer;