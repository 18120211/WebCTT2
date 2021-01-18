const express = require('express');

const app = express();

//Static
app.use('/public', express.static('public'));


//Default body-parser
app.use(express.urlencoded());
require('./middlewares/dbLocal.mdw')(app);
require('./middlewares/session.mdw')(app);
require('./middlewares/passport.mdw')(app);
require('./middlewares/local.mdw')(app);
require('./middlewares/view.mdw')(app);require('./middlewares/route.mdw')(app);
require('./middlewares/error.mdw')(app);
require('./middlewares/paypal.mdw')(app);
require('./middlewares/cloudinary.mdw')(app);


app.listen(8000, console.log('Server running on port 8000'));

// const express = require("express");

// const app = express();

// require("./middlewares/dbLocal.mdw")(app);
// require("./middlewares/cloudinary.mdw")(app);
// const Course = require("./models/Course.model");
// const FaceBookUser = require("./models/FaceBookUser.model");
// const Lecturer = require("./models/Lecturer.model");
// const LocalUser = require("./models/LocalUser.model");
// const CourseCategory = require("./models/CourseCategory.model");
// const CategoryEnum = require("./models/CourseCategory.enum");
// const TopicEnum = require("./models/CourseTopic.enum");
// const CourseTopic = require("./models/CourseTopic.model");
// const cloudinary = require("cloudinary").v2;


// Course.insertMany([{
//     name: 'Sales Summer Poster',
//     poster: '',
//     description: 'Bạn có thể học mọi thứ về Sales qua khóa học của chúng tôi',
//     evaluationPoint: 0,
//     numberOfStudent: 0,
//     tuition: 10,
//     numberOfView: 0,
//     idCourseTopic: '5ff2e1c9ac3567138849dbe9', //Dev data
//     idLecturer: '5fed6330aba5d81fc019f9b7',
//     videos: [],
//     previewIndex: [0, 1, 2],
//     whatYoullLearn: [
//         'Có hiểu biết chuyên sâu về ngôn ngữ lập trình.',
//         'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc lập trình.',
//         'Hiểu cách tạo các chương trình của riêng bạn.',
//         'Học xong đảm bảo trùm lập trình'
//     ]
// }]).then(console.log("saved"));
