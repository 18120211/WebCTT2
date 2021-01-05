//Course
Course.insertMany([{
    name: 'Graphing Python',
    poster: '/public/poster/graphPython/poster.png',
    description: 'Bạn có thể học mọi thứ về đồ thị với Python qua khóa học của chúng tôi',
    evaluationPoint: 0,
    numberOfEvaluation: 0,
    numberOfStudent: 0,
    tuition: 10,
    numberOfView: 0,
    idCourseTopic: '5ff2e1c9ac3567138849dbdf', //Dev data
    idLecturer: '5fed6330aba5d81fc019f9b7',
    topic: TopicEnum.DEVELOPMENT,
    videos: [{
        name: 'Introduction and line',
        source: '/public/video/graphPython/0.mp4'
    }, {
        name: 'Legends titles and labels',
        source: '/public/video/graphPython/1.mp4'
    }, {
        name:  'Bar charts and histograms',
        source: '/public/video/graphPython/2.mp4'
    }, {
        name:  'Scatter Plots',
        source:'/public/video/graphPython/3.mp4'
    }, {
        name: 'Stack plots',
        source: '/public/video/graphPython/4.mp4'
    }, {
        name: 'Pie Charts',
        source:  '/public/video/graphPython/5.mp4'
    }, {
        name: 'Loading data from files',
        source:  '/public/video/graphPython/6.mp4'
    }],
    previewIndex: [0, 1, 2, 4],
    whatYoullLearn: [
        'Có hiểu biết chuyên sâu về ngôn ngữ lập trình.',
        'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc lập trình.',
        'Hiểu cách tạo các chương trình của riêng bạn.',
        'Học xong đảm bảo trùm lập trình'
    ]
}, {
    name: 'Tutorial Android development',
    poster: '/public/poster/beginerAdrDev/poster.png',
    description: 'Học xong khóa tutorial bạn sẽ trùm Android',
    evaluationPoint: 0,
    numberOfEvaluation: 0,
    numberOfStudent: 0,
    tuition: 10,
    numberOfView: 0,
    idCourseTopic: '5ff2e1c9ac3567138849dbe2', //Mobile development
    idLecturer: '5fed6330aba5d81fc019f9b7',
    topic: TopicEnum.DEVELOPMENT,
    videos: [{
        name: 'Introduction to Android',
        source: '/public/video/beginerAdrDev/0.mp4'
    }, {
        name:  'Prepare development environment',
        source: '/public/video/beginerAdrDev/1.mp4'
    }, {
        name:  'Create hello world Android application',
        source: '/public/video/beginerAdrDev/2.mp4'
    }, {
        name: 'Test android app in virtual device',
        source: '/public/video/beginerAdrDev/3.mp4'
    }],
    previewIndex: [0, 1, 2],
    whatYoullLearn: [
        'Có hiểu biết chuyên sâu về ngôn ngữ lập trình.',
        'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc lập trình.',
        'Hiểu cách tạo các chương trình của riêng bạn.',
        'Học xong đảm bảo trùm lập trình'
    ]
}, {
    name: 'Tutorial Javascript development',
    poster: '/public/poster/beginerJvsDev/poster.png',
    description: 'Học xong lương 10000$',
    evaluationPoint: 0,
    numberOfEvaluation: 0,
    numberOfStudent: 0,
    tuition: 10,
    numberOfView: 0,
    idCourseTopic: '5ff2e1c9ac3567138849dbe1', //Program language
    idLecturer: '5fed6330aba5d81fc019f9b7',
    topic: TopicEnum.DEVELOPMENT,
    videos: [{
        name: 'Beginning the Beginer series',
        source:  '/public/video/beginerJvsDev/0.mp4',
    }, {
        name:  'What is Javascript',
        source:  '/public/video/beginerJvsDev/1.mp4',
    }, {
        name:  'Running Javascript',
        source:  '/public/video/beginerJvsDev/2.mp4',
    }, {
        name:  'Building your toolbox',
        source:  '/public/video/beginerJvsDev/3.mp4'
    }],
    previewIndex: [0, 1, 2],
    whatYoullLearn: [
        'Có hiểu biết chuyên sâu về ngôn ngữ lập trình.',
        'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc lập trình.',
        'Hiểu cách tạo các chương trình của riêng bạn.',
        'Học xong đảm bảo trùm lập trình'
    ]
}, {
    name: 'Tutorial Web development',
    poster: '/public/poster/beginerWebDev/poster.png',
    description: 'Học 2 buổi 10 chấm môn Web',
    evaluationPoint: 0,
    numberOfEvaluation: 0,
    numberOfStudent: 0,
    tuition: 10,
    numberOfView: 0,
    idCourseTopic: '5ff2e1c9ac3567138849dbe0', //Web dev
    idLecturer: '5fed6330aba5d81fc019f9b7',
    topic: TopicEnum.DEVELOPMENT,
    videos: [{
        name: 'How to make a website',
        source: '/public/video/beginerWebDev/0.mp4',
    }, {
        name: 'HTML tutorial',
        source: '/public/video/beginerWebDev/1.mp4',
    }, {
        name: 'HTML&CSS tutorial',
        source: '/public/video/beginerWebDev/2.mp4',
    }, {
        name: 'Make a website using HTML&CSS-FAST',
        source: '/public/video/beginerWebDev/3.mp4',
    }],
    previewIndex: [0, 1, 2],
    whatYoullLearn: [
        'Có hiểu biết chuyên sâu về ngôn ngữ lập trình.',
        'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc lập trình.',
        'Hiểu cách tạo các chương trình của riêng bạn.',
        'Học xong đảm bảo trùm lập trình'
    ]
}, {
    name: 'Unity game development',
    poster: '/public/poster/gameDevUnity/poster.png',
    description: 'Học 3 buổi là vào Facebook',
    evaluationPoint: 0,
    numberOfEvaluation: 0,
    numberOfStudent: 0,
    tuition: 10,
    numberOfView: 0,
    idCourseTopic: '5ff2e1c9ac3567138849dbe3', //Game dev
    idLecturer: '5fed6330aba5d81fc019f9b7',
    topic: TopicEnum.DEVELOPMENT,
    videos: [{
        name: 'Introduction to game development',
        source: '/public/video/gameDevUnity/0.mp4'
    }, {
        name: 'Variables and method',
        source: '/public/video/gameDevUnity/1.mp4'
    }, {
        name: 'Using classes',
        source: '/public/video/gameDevUnity/2.mp4'
    }, {
        name: 'Unity overview',
        source: '/public/video/gameDevUnity/3.mp4'
    }],
    previewIndex: [0, 1, 2],
    whatYoullLearn: [
        'Có hiểu biết chuyên sâu về ngôn ngữ lập trình.',
        'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc lập trình.',
        'Hiểu cách tạo các chương trình của riêng bạn.',
        'Học xong đảm bảo trùm lập trình'
    ]
}, {
    name: 'Communication tutorial',
    poster: '/public/poster/tutCommunication/poster.png',
    description: 'Bạn muốn làm đa cấp không thể bỏ qua khóa học này',
    evaluationPoint: 0,
    numberOfEvaluation: 0,
    numberOfStudent: 0,
    tuition: 10,
    numberOfView: 0,
    idCourseTopic: '5ff2e1c9ac3567138849dbe7', //Bus communication
    idLecturer: '5fed6330aba5d81fc019f9b7',
    topic: TopicEnum.BUSINESS,
    videos: [{
        name: 'Business communication',
        source:  '/public/video/tutCommunication/0.mp4',
    }, {
        name:'Business writing tips',
        source: '/public/video/tutCommunication/1.mp4',
    }, {
        name:'Communicate with influence every time',
        source: '/public/video/tutCommunication/2.mp4',
    }, {
        name: 'Shake shark CEO',
        source: '/public/video/tutCommunication/3.mp4'
    }],
    previewIndex: [0, 1, 2],
    whatYoullLearn: [
        'Có hiểu biết chuyên sâu về Business.',
        'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc Business.',
        'Hiểu cách tạo các chương trình Business.',
        'Học xong đảm bảo trùm Business'
    ]
}, {
    name: 'Photoshop tutorial',
    poster: '/public/poster/tutPhotoshop/poster.png',
    description: 'Bạn muốn làm đa cấp không thể bỏ qua khóa học này',
    evaluationPoint: 0,
    numberOfEvaluation: 0,
    numberOfStudent: 0,
    tuition: 10,
    numberOfView: 0,
    idCourseTopic: '5ff2e1c9ac3567138849dbe5', //Design tool
    idLecturer: '5fed6330aba5d81fc019f9b7',
    topic: TopicEnum.DESIGN,
    videos: [{
        name: 'Course overview',
        source: '/public/video/tutPhotoshop/0.mp4',
    }, {
        name:'Interface introduction to Adobe Photoshop',
        source: '/public/video/tutPhotoshop/1.mp4',
    }, {
        name:'Pannel and workspace in Adobe Photoshop',
        source: '/public/video/tutPhotoshop/2.mp4',
    }, {
        name:'Raster imgae principles',
        source: '/public/video/tutPhotoshop/3.mp4',
    }],
    previewIndex: [0, 1, 2],
    whatYoullLearn: [
        'Có hiểu biết chuyên sâu về Deisgn.',
        'Có kỹ năng và hiểu biết về mọi thứ để tự tin ứng tuyển vào các công việc Deisgn.',
        'Hiểu cách tạo các chương trình Deisgn.',
        'Học xong đảm bảo trùm Deisgn'
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
    otpNumber: '',
    idCourses: []
}).then(console.log('saved'));

//Course Category
CourseCategory.insertMany([{
    name: CategoryEnum.DEVELOPMENT,
    numberOfView: 0,
    numberOfSignUp: 0
},{
    name: CategoryEnum.BUSINESS,
    numberOfView: 0,
    numberOfSignUp: 0
},
{
    name: CategoryEnum.DESIGN,
    numberOfView: 0,
    numberOfSignUp: 0
}]).then(console.log('saved'));

CourseTopic.insertMany([{
    name: TopicEnum.DEVELOPMENT_DATA,
    numberOfView: 0,
    numberOfSignUp: 0,
    idCourseCategory: '5ff2dd54eb01461e54152a15'
},{
    name: TopicEnum.DEVELOPMENT_WEB,
    numberOfView: 0,
    numberOfSignUp: 0,
    idCourseCategory: '5ff2dd54eb01461e54152a15'
},
{
    name: TopicEnum.DEVELOPMENT_PROLANG,
    numberOfView: 0,
    numberOfSignUp: 0,
    idCourseCategory: '5ff2dd54eb01461e54152a15'
}, {
    name: TopicEnum.DEVELOPMENT_MOBILE,
    numberOfView: 0,
    numberOfSignUp: 0,
    idCourseCategory: '5ff2dd54eb01461e54152a15'
}, {
    name: TopicEnum.DEVELOPMENT_GAME,
    numberOfView: 0,
    numberOfSignUp: 0,
    idCourseCategory: '5ff2dd54eb01461e54152a15'
}, {
    name: TopicEnum.DESIGN_GAME,
    numberOfView: 0,
    numberOfSignUp: 0
}, {
    name: TopicEnum.DESIGN_TOOL,
    numberOfView: 0,
    numberOfSignUp: 0,
    idCourseCategory: '5ff2dd54eb01461e54152a17'
}, {
    name: TopicEnum.DESIGN_WEB,
    numberOfView: 0,
    numberOfSignUp: 0,
    idCourseCategory: '5ff2dd54eb01461e54152a17'
}, {
    name: TopicEnum.BUSINESS_COM,
    numberOfView: 0,
    numberOfSignUp: 0,
    idCourseCategory: '5ff2dd54eb01461e54152a16'
}, {
    name: TopicEnum.BUSINESS_MANA,
    numberOfView: 0,
    numberOfSignUp: 0,
    idCourseCategory: '5ff2dd54eb01461e54152a16'
}, {
    name: TopicEnum.BUSINESS_SALE,
    numberOfView: 0,
    numberOfSignUp: 0,
    idCourseCategory: '5ff2dd54eb01461e54152a16'
}
]).then(console.log('saved'));

//Top week
TopWeek.insertMany([{
    name: 'Top view khóa học, thể loại và chủ đề tuần 1',
    topCourses: [{}],
    topTopics: [{}],
    topCategories: [{}] 
}]).then(console.log('saved'));

//User review
UserReview.insertMany([{
    name: 'Review của khóa học Python Graphing',
    idCourses: '5ff0a3447b12cc3930737863',
    userComment: [{
        idUser: '5ff0980efd23d439fc8dd732',
        comment: 'Đã quá pepsi ơi'
    }],
    evaluationPoint: 5
}]).then(console.log('saved'));

<h2>Các khóa học được xem nhiều nhất</h2>
<% for( let i = 0; i < mostViewCourses.length; i++ ) { %>
    <div class="most-view-courses">
        <div class="courses">
            <img class="poster" src="<%= mostViewCourses[i].poster%>" alt="Cannot load image" width="285px" height="150px">
            <h4 class="name"><%=  mostViewCourses[i].name%> </h4>
            <p class="lecturer"><%=  mostViewCourses[i].idLecturer.name%></p>
            <p class="evaluation" style="display: inline-block;"><%=  mostViewCourses[i].evaluationPoint%></p>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <p style="display: inline-block;" class="numberOfEvaluation"><%=  mostViewCourses[i].numberOfEvaluation%> </p>
            <p class="tuition">$<%=  mostViewCourses[i].tuition%></p>
            <p>View: <%=  mostViewCourses[i].numberOfView%> </p>
        </div>
        <div class="courses-detail">
            <p><%=  mostViewCourses[i].numberOfStudent%> Studying</p>
            <p><%=  mostViewCourses[i].idCourseCategory.name%></p>
        </div>
    </div> 
<% } %>
<h2>10 khóa học mới nhất</h2>
<% for( let i = 0; i < latestCourses.length; i++ ) { %>
    <div class="latest-courses">
        <div class="courses">
            <img class="poster" src="<%= latestCourses[i].poster%>" alt="Cannot load image" width="285px" height="150px">
            <h4 class="name"><%=  latestCourses[i].name%> </h4>
            <p class="lecturer"><%=  latestCourses[i].idLecturer.name%></p>
            <p class="evaluation" style="display: inline-block;"><%=  latestCourses[i].evaluationPoint%></p>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <p style="display: inline-block;" class="numberOfEvaluation"><%=  latestCourses[i].numberOfEvaluation%> </p>
            <p class="tuition">$<%=  latestCourses[i].tuition%></p>
            <p>Date: <%= latestCourses[i].uploadDate.toDateString() %> </p>
        </div>
        <div class="courses-detail">
            <p><%=  latestCourses[i].numberOfStudent%> Studying</p>
            <p><%=  latestCourses[i].idCourseCategory.name%></p>
        </div>
    </div> 
<% } %>
<h2>Các lĩnh vực được đăng ký nhiều nhất</h2>
<% for( let i = 0; i < mostViewCategories.length; i++ ) { %>
    <div class="most-view-categories">
        <%= mostViewCategories[i].name %> 
        <p>SignUp: <%= mostViewCategories[i].numberOfSignUp %> </p>
    </div>
<% } %>