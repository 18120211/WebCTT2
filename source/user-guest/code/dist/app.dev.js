"use strict";

var express = require('express');

var app = express(); //Static

app.use('/public', express["static"]('public')); //Default body-parser

app.use(express.urlencoded());

require('./middlewares/dbLocal.mdw')(app);

require('./middlewares/session.mdw')(app);

require('./middlewares/passport.mdw')(app);

require('./middlewares/local.mdw')(app);

require('./middlewares/view.mdw')(app);

require('./middlewares/route.mdw')(app);

require('./middlewares/error.mdw')(app);

require('./middlewares/paypal.mdw')(app);

require('./middlewares/cloudinary.mdw')(app);

app.listen(8000, console.log('Server running on port 8000')); // const express = require('express');
// const app = express();
// require('./middlewares/dbLocal.mdw')(app);
// require('./middlewares/cloudinary.mdw')(app);
// const Course = require('./models/Course.model');
// const FaceBookUser = require('./models/FaceBookUser.model');
// const Lecturer = require('./models/Lecturer.model');
// const LocalUser = require('./models/LocalUser.model');
// const CourseCategory = require('./models/CourseCategory.model');
// const CategoryEnum = require('./models/CourseCategory.enum');
// const TopicEnum = require('./models/CourseTopic.enum');
// const CourseTopic = require('./models/CourseTopic.model');
// const cloudinary = require('cloudinary').v2;