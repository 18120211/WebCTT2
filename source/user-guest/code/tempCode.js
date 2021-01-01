//CourseDocument
CourseDocument.insertMany([{
    nameDoc: 'Beginer tuturial Android development',
    topic: TopicEnum.DEVELOPMENT,
    name: [
        'Introduction to Android',
        'Prepare development environment',
        'Create hello world Android application',
        'Test android app in virtual device'
    ],
    video: [
        '/public/video/beginerAdrDev/0.mp4',
        '/public/video/beginerAdrDev/1.mp4',
        '/public/video/beginerAdrDev/2.mp4',
        '/public/video/beginerAdrDev/3.mp4'
    ]
}, {
    nameDoc: 'Beginer tutorial Javascript development',
    topic: TopicEnum.DEVELOPMENT,
    name: [
        'Beginning the Beginer series',
        'What is Javascript',
        'Running Javascript',
        'Building your toolbox'
    ],
    video: [
        '/public/video/beginerJvsDev/0.mp4',
        '/public/video/beginerJvsDev/1.mp4',
        '/public/video/beginerJvsDev/2.mp4',
        '/public/video/beginerJvsDev/3.mp4'
    ]
}, {
    nameDoc: 'Beginer tutorial Web development',
    topic: TopicEnum.DEVELOPMENT,
    name: [
        'How to make a website',
        'HTML tutorial',
        'HTML&CSS tutorial',
        'Make a website using HTML&CSS-FAST'
    ],
    video: [
        '/public/video/beginerWebDev/0.mp4',
        '/public/video/beginerWebDev/1.mp4',
        '/public/video/beginerWebDev/2.mp4',
        '/public/video/beginerWebDev/3.mp4'
    ]
}, {
    nameDoc: 'Game development with Unity and C#',
    topic: TopicEnum.DEVELOPMENT,
    name: [
        'Introduction to game development',
        'Variables and method',
        'Using classes',
        'Unity overview'
    ],
    video: [
        '/public/video/gameDevUnity/0.mp4',
        '/public/video/gameDevUnity/1.mp4',
        '/public/video/gameDevUnity/2.mp4',
        '/public/video/gameDevUnity/3.mp4'
    ]
}, {
    nameDoc: 'Tutorial Communication',
    topic: TopicEnum.BUSINESS,
    name: [
        'Business communication',
        'Business writing tips',
        'Communicate with influence every time',
        'Shake shark CEO'
    ],
    video: [
        '/public/video/tutCommunication/0.mp4',
        '/public/video/tutCommunication/1.mp4',
        '/public/video/tutCommunication/2.mp4',
        '/public/video/tutCommunication/3.mp4'
    ]
}, {
    nameDoc: 'Tutorial Photoshop',
    topic: TopicEnum.DESIGN,
    name: [
        'Course overview',
        'Interface introduction to Adobe Photoshop',
        'Pannel and workspace in Adobe Photoshop',
        'Raster imgae principles'
    ],
    video: [
        '/public/video/tutPhotoshop/0.mp4',
        '/public/video/tutPhotoshop/1.mp4',
        '/public/video/tutPhotoshop/2.mp4',
        '/public/video/tutPhotoshop/3.mp4'
    ]
}]).then(console.log('saved'));


//Lecturer
Lecturer.insertMany({
    name: 'Võ Thế Minh',
    email: 'minhthevo123@gmail.com',
    password: '123',
    gender: 'Male',
    avatar: '/public/avatar/default/avatar.png',
    description: 'Siêu giáo viên, tác giả của hơn 300 framwork nổi tiếng của Javascript, C#, ..., 30 năm kinh nghiệp giảng dạy các trường đại học danh tiếng',
    isAuth: true,
    otpNumber: ''
}).then(console.log('saved'));


//Course Category
CourseCategory.insertMany([{
    name: CategoryEnum.DEVELOPMENT_WEB,
    topic: TopicEnum.DEVELOPMENT,
    numberofView: 400000
},
{
    name: CategoryEnum.DEVELOPMENT_PROLANG,
    topic: TopicEnum.DEVELOPMENT,
    numberofView: 200000
}, {
    name: CategoryEnum.DEVELOPMENT_MOBILE,
    topic: TopicEnum.DEVELOPMENT,
    numberofView: 250000
}, {
    name: CategoryEnum.DEVELOPMENT_GAME,
    topic: TopicEnum.DEVELOPMENT,
    numberofView: 210000
}, {
    name: CategoryEnum.DEVELOPMENT_DATA,
    topic: TopicEnum.DEVELOPMENT,
    numberofView: 290000
}, {
    name: CategoryEnum.DESIGN_GAME,
    topic: TopicEnum.DESIGN,
    numberofView: 240000
}, {
    name: CategoryEnum.DESIGN_TOOL,
    topic: TopicEnum.DESIGN,
    numberofView: 300000
}, {
    name: CategoryEnum.DESIGN_WEB,
    topic: TopicEnum.DESIGN,
    numberofView: 260000
}, {
    name: CategoryEnum.BUSINESS_COM,
    topic: TopicEnum.BUSINESS,
    numberofView: 350000
}, {
    name: CategoryEnum.BUSINESS_MANA,
    topic: TopicEnum.BUSINESS,
    numberofView: 200000
}, {
    name: CategoryEnum.BUSINESS_SALE,
    topic: TopicEnum.BUSINESS,
    numberofView: 150000
}
]).then(console.log('saved'));


//Course
Course.insertMany([{
    name: 'Graphing Python',
    poster: '/public/poster/graphPython/poster.png',
    description: 'Bạn có thể học mọi thứ về đồ thị với Python qua khóa học của chúng tôi',
    evaluationPoint: '9.0',
    numberOfEvaluation: 300,
    numberOfStudent: 500,
    tuition: 1,
    numberOfView: 150000,
    idCourseCategory: '5fedf971d7966e3ea8f00666', //Dev data
    idCourseDocument: '5fed652629777d245ce0e315', //Graphing python
    idLecturer: '5fed6330aba5d81fc019f9b7'
}, {
    name: 'Tutorial Android development',
    poster: '/public/poster/beginerAdrDev/poster.png',
    description: 'Học xong khóa tutorial bạn sẽ trùm Android',
    evaluationPoint: '8.0',
    numberOfEvaluation: 200,
    numberOfStudent: 300,
    tuition: 10,
    numberOfView: 130000,
    idCourseCategory: '5fedf971d7966e3ea8f00664', //Mobile development
    idCourseDocument: '5feeabda6d59961bf0ad76a0', //Anddroid tut document
    idLecturer: '5fed6330aba5d81fc019f9b7'
}, {
    name: 'Tutorial Javascript development',
    poster: '/public/poster/beginerJvsDev/poster.png',
    description: 'Học xong lương 10000$',
    evaluationPoint: '8.5',
    numberOfEvaluation: 250,
    numberOfStudent: 400,
    tuition: 10,
    numberOfView: 130000,
    idCourseCategory: '5fedf971d7966e3ea8f00663', //Program language
    idCourseDocument: '5feeabda6d59961bf0ad76a1', //Javascript tut document
    idLecturer: '5fed6330aba5d81fc019f9b7'
}, {
    name: 'Tutorial Web development',
    poster: '/public/poster/beginerWebDev/poster.png',
    description: 'Học 2 buổi 10 chấm môn Web',
    evaluationPoint: '8.5',
    numberOfEvaluation: 50,
    numberOfStudent: 150,
    tuition: 10,
    numberOfView: 80000,
    idCourseCategory: '5fedf971d7966e3ea8f00662', //Web dev
    idCourseDocument: '5feeabda6d59961bf0ad76a2', //Web tut doc
    idLecturer: '5fed6330aba5d81fc019f9b7'
}, {
    name: 'Unity game development',
    poster: '/public/poster/gameDevUnity/poster.png',
    description: 'Học 3 buổi là vào Facebook',
    evaluationPoint: '7.5',
    numberOfEvaluation: 100,
    numberOfStudent: 250,
    tuition: 10,
    numberOfView: 90000,
    idCourseCategory: '5fedf971d7966e3ea8f00665', //Game dev
    idCourseDocument: '5feeabda6d59961bf0ad76a3', //game unity doc
    idLecturer: '5fed6330aba5d81fc019f9b7'
}, {
    name: 'Communication tutorial',
    poster: '/public/poster/tutCommunication/poster.png',
    description: 'Bạn muốn làm đa cấp không thể bỏ qua khóa học này',
    evaluationPoint: '8.5',
    numberOfEvaluation: 350,
    numberOfStudent: 450,
    tuition: 10,
    numberOfView: 130000,
    idCourseCategory: '5fedf971d7966e3ea8f0066a', //Bus communication
    idCourseDocument: '5feeabda6d59961bf0ad76a4', //Com tut doc
    idLecturer: '5fed6330aba5d81fc019f9b7'
}, {
    name: 'Photoshop tutorial',
    poster: '/public/poster/tutPhotoshop/poster.png',
    description: 'Bạn muốn làm đa cấp không thể bỏ qua khóa học này',
    evaluationPoint: '8.5',
    numberOfEvaluation: 350,
    numberOfStudent: 420,
    tuition: 10,
    numberOfView: 140000,
    idCourseCategory: '5fedf971d7966e3ea8f00668', //Design tool
    idCourseDocument: '5feeabda6d59961bf0ad76a5', //Photoshop tut
    idLecturer: '5fed6330aba5d81fc019f9b7'
}]).then(console.log('saved'));


//Top week
TopWeek.insertMany([{
    name: 'Top view khóa học và lĩnh vực tuần 1',
    nameTopCourses: [
        'Graphing Python',
        'Photoshop tutorial',
        'Tutorial Android development',
        'Tutorial Javascript development'
    ],
    idTopCourses: [
        '5feefda068b54f12c839c609',
        '5feefda068b54f12c839c60f',
        '5feefda068b54f12c839c60a',
        '5feefda068b54f12c839c60b'
    ],
    nameTopCategories: [
        'Data Science',
        'Communications',
        'Design Tools', 
        'Programming Languages',
        'Mobile Development'
    ],
    idTopCategories: [
        '5fedf971d7966e3ea8f00666',
        '5fedf971d7966e3ea8f0066a',
        '5fedf971d7966e3ea8f00668',
        '5fedf971d7966e3ea8f00663',
        '5fedf971d7966e3ea8f00664'
    ]
}]).then(console.log('saved'));