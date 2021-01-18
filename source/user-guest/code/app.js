const express = require('express');

const app = express();

//Static
app.use('/public', express.static('public'));
 app.use( express.static('public'));

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

// Course.findOne({_id: '60047f3899dbc32298745e80'}).then((doc)=>{
//     doc.numberOfVideo = 4;
//     doc.videos = [{
//         name: 'Machine learning overview',
//         source: 'https://res.cloudinary.com/teamwebctt2/video/upload/v1610988326/webctt2/video/machineLearning/1_z97lxw.mp4'
//     }, {
//         name: 'First application',
//         source: 'https://res.cloudinary.com/teamwebctt2/video/upload/v1610988326/webctt2/video/machineLearning/2_pne144.mp4'
//     }, {
//         name: 'Finding algorithm',
//         source: 'https://res.cloudinary.com/teamwebctt2/video/upload/v1610988326/webctt2/video/machineLearning/3_io1o37.mp4'
//     }, {
//         name: 'End course',
//         source: 'https://res.cloudinary.com/teamwebctt2/video/upload/v1610988326/webctt2/video/machineLearning/4_jm9lkt.mp4'
//     }];
//     doc.save().then(console.log('saved'));
// });


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
