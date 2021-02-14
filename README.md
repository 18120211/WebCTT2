# Web Courses CTT2
- Đồ án môn học - Phát triển ứng dụng website
- Team up cùng mấy nhóc CTT2
    -   | Name                | Mssv     |
        |---------------------|----------|
        | Võ Thế Minh         | 18120211 |
        | Mai Ngọc Tú         | 18120253 |
        | Phạm Tống Bình Minh | 18120210 |

- Thông tin liên hệ: minhthevo123@gmail.com

## Mô tả đề tài
- Mục tiêu đề tài: Một ứng dụng website giúp người sử dụng có thể mua và học các khóa học trực tuyến. Cùng với đó làn những giảng viên có thể tạo và quản lý khóa học của mình
- Môi trường sử dụng: Web browser
- 4 actors chính: Guest, Người dùng, Giảng viên, Admin
- Dữ cần quản lý: Thông tin người dùng, thông tin của giảng viên, thông tin của admin, thông tin của khóa học
- Chức năng của Guest:
    - Đăng ký tài khoản
    - Hệ thống menu
    - Trang chủ
    - Xem danh sách khóa học
    - Tìm kiếm khóa học
    - Xem chi tiết khóa học 
- Chức năng của Người dùng:
    - Toàn bộ chức năng của Guest
    - Lưu khóa học vào danh sách yêu thích
    - Quản lý hồ sơ cá nhân
    - Tham gia khóa học
    - Đánh giá & phản hồi khóa học
    - Xem nội dung bài giảng
- Chức năng của Giảng viên:
    - Toàn bộ chức năng của Guest
    - Đăng khóa học
    - Bổ sung thông tin, bài giảng cho khóa học
    - Quản lý hồ sơ cá nhân
- Chức năng của Admin
    - Quản lý lĩnh vực category
    - Quản lý khóa học
    - Quản lý danh sách học viên, giảng viên
- Các tính năng chung cho phân hệ Người dùng, Giảng viên, Admin
    - Đăng nhập/đăng xuất
    - Cập nhật thông tin cá nhân
    - Đổi mật khẩu
- Chi tiết truy cập: [https://hackmd.io/@nndkhoa9/web-online-academy](https://hackmd.io/@nndkhoa9/web-online-academy)

## Clone về máy và chạy thử
- Yêu cầu công nghệ để chạy thử Web server
    - Cài đặt NodeJs
    - Cài đặt MongoDB Local(Có thể cài đặt thêm MongoDBCompass một GUI giúp tương tác với data) hoặc sử dụng MongoDB Atlas
        - Tạo database `WEBCTT2`(Xem trong file `./source/user-guest/code/config/key.config.js` để biết thêm chi tiết)
        - Tạo các collection có tên trùng với tên file trong thư mục `./source/database`
        - Import `*.json` tương ứng vào các collection vừa tạo
    - Đi tới đường dẫn `./source/user-guest/code` và gõ lệnh npm install(Tự động cài đặt các package cần thiết để chạy server)
    - Đi tới đường dẫn `./source/admin/` vã gõ lệnh npm install(Tự động cài đặt các package cần theiest để chạy server)
- Khởi chạy server trang web
    - Khởi chạy server cho trang web của Guest và Người dùng
        - Đi tới đường dẫn `./source/user-guest/code`
        - Chạy lệnh `npm start`
        - Lúc này sẽ có một thông báo xuất hiện trên console cho biết số port mà server đang lắng nghe người dùng connect (cụ thể là port 8000 và có thể được đổi lại trong file app.js)
        - Mở trình duyệt và truy cập vào đường dẫn http://localhost:8000
    - Khởi chạy server cho trang web của admin và quản lý rạp chiếu
        - Đi tới đường dẫn `./source/admin/`
        - Chạy lệnh `npm start`
        - Lúc này sẽ có một thông báo xuất hiện trên console cho biết số port mà server đang lắng nghe người dùng connect (cụ thể là port 8001 và có thể được đổi lại trong file app.js)
        - Mở một trình duyệt khác với trình duyệt đã sử dụng cho server Người dùng(vd: Microsofe Edge and Goolge Chorme) và truy cập vào đường dẫn http://localhost:8001/admin/login

## Công nghệ được sử dụng trong đồ án
- Phía font-end
    - Sử dụng HTML/CSS/JS/JQuery để code giao diện(Các mẫu giao diện được tham khảo từ [https://bootsnipp.com/](https://bootsnipp.com
    "bootsnipp")
    - Sử dụng view-engine ejs(Cho phép người dùng thêm code JS vào đoạn code HTML) 
- Phía backend
    - Quản lý server: `NodeJS express`
    - Xác thực tài khoản: `PassportJS`
    - Xử lý lỗi: `Error handler` 
    - Quản lý phiên đăng nhập: `express-session` 
    - Các API được sử dụng trong đồ án:
        - Xác thực tài khoản bằng gmail: `Google API`, `node-mailer`
        - Quản lý hóa đơn + Thanh toán: `PayPal/rest/API` (tuy nhiên, việc thanh toán chỉ được thực hiện bằng tài khoản `sandbox`)
        - Upload và lưu trữ ảnh đại diện: sử dụng API `Bootstrap File Input` - Tác giả Krajee
        - Lưu trữ hình ảnh, bài giảng sử dụng `Cloudinary API`
        - Xem video bài giảng: `Video-Js`

## **Demo**
### Phân hệ người dùng
- **Giao diện trang chủ**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295430/webctt2/readme/home_page_aymjlz.png
    "homepage")

- **Giao diện chi tiết khóa học**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295430/webctt2/readme/detail_rph8vz.png)

- **Giao diện thanh toán khóa học**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295429/webctt2/readme/hoadon_wl9pzr.png)

- **Giao diện danh sách khóa học yêu thích**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295431/webctt2/readme/wish-list_yllfvr.png)

- **Giao diện đăng nhập**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295429/webctt2/readme/login_m8gru8.png)

- **Giao diện hồ sơ cá nhân**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295429/webctt2/readme/hoso_bk5i5o.png)

- **Giao diện xác thực OTP**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295429/webctt2/readme/otp_kwsk9z.png)

- **Gmail xác thực**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295429/webctt2/readme/gmail_rltetu.png)

### Phân hệ admin, giảng viên
- **Giao diện quản lý danh sách khóa học**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295430/webctt2/readme/qldanhsachkhoahoc_sl2waj.png)

- **Giao diện quản lý danh sách học viên**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295430/webctt2/readme/qldanhsachhocvien_kxjije.png)

- **Giao diện quản lý danh sách category**
    ![](https://res.cloudinary.com/teamwebctt2/image/upload/v1613295430/webctt2/readme/qldanhsachcategory_siv9dh.png)
 
___
*Các em sinh viên có dùng tài liệu của anh để tham khảo thì nhớ để lại 1 sao nha :))*

**END**
