const mongoose = require('mongoose');

const CoursesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
});