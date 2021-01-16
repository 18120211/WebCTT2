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
require('./middlewares/view.mdw')(app);
require('./middlewares/route.mdw')(app);
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
//     name: 'Website angular development',
//     poster: 'https://res.cloudinary.com/teamwebctt2/image/upload/v1610797258/webctt2/poster/webAngularDev/angular_dvr3ls.jpg',
//     description: 'Bạn có thể học mọi thứ về Angular qua khóa học của chúng tôi',
//     evaluationPoint: 0,
//     numberOfStudent: 0,
//     tuition: 10,
//     numberOfView: 0,
//     idCourseTopic: '5ff2e1c9ac3567138849dbe0', //Dev data
//     idLecturer: '5fed6330aba5d81fc019f9b7',
//     topic: TopicEnum.DEVELOPMENT,
//     videos: [],
//     previewIndex: [0, 1, 2],
//     whatYoullLearn: [
//         'Có hiểu biết chuyên sâu về ngôn ngữ lập trình.',
//         'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc lập trình.',
//         'Hiểu cách tạo các chương trình của riêng bạn.',
//         'Học xong đảm bảo trùm lập trình'
//     ]
// }, {
//     name: 'Website game development',
//     poster: 'hhttps://res.cloudinary.com/teamwebctt2/image/upload/v1610797240/webctt2/poster/htmlGameDev/gamedeve_oqggop.jpg',
//     description: 'Bạn có thể học mọi thứ về Website game development qua khóa học của chúng tôi',
//     evaluationPoint: 0,
//     numberOfStudent: 0,
//     tuition: 10,
//     numberOfView: 0,
//     idCourseTopic: '5ff2e1c9ac3567138849dbe3', //Dev data
//     idLecturer: '5fed6330aba5d81fc019f9b7',
//     topic: TopicEnum.DEVELOPMENT,
//     videos: [],
//     previewIndex: [0, 1, 2],
//     whatYoullLearn: [
//         'Có hiểu biết chuyên sâu về ngôn ngữ lập trình.',
//         'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc lập trình.',
//         'Hiểu cách tạo các chương trình của riêng bạn.',
//         'Học xong đảm bảo trùm lập trình'
//     ]
// },{
//     name: 'Machine learning development',
//     poster: 'https://res.cloudinary.com/teamwebctt2/image/upload/v1610797249/webctt2/poster/macLearnDev/machinelearning_wd6qqi.jpg',
//     description: 'Bạn có thể học mọi thứ về Machine learning qua khóa học của chúng tôi',
//     evaluationPoint: 0,
//     numberOfStudent: 0,
//     tuition: 10,
//     numberOfView: 0,
//     idCourseTopic: '5ff2e1c9ac3567138849dbdf', //Dev data
//     idLecturer: '5fed6330aba5d81fc019f9b7',
//     topic: TopicEnum.DEVELOPMENT,
//     videos: [],
//     previewIndex: [0, 1, 2],
//     whatYoullLearn: [
//         'Có hiểu biết chuyên sâu về ngôn ngữ lập trình.',
//         'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc lập trình.',
//         'Hiểu cách tạo các chương trình của riêng bạn.',
//         'Học xong đảm bảo trùm lập trình'
//     ]
// },]).then(console.log("saved"));
