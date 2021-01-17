const express = require("express");

const Router = express.Router();

const passport = require("passport");

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../config/auth.config");

const LocalUser = require("../models/LocalUser.model");

const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const bcrypt = require("bcryptjs");

const fs = require("fs");

const path = require("path");

const multer = require("multer");
const FaceBookUser = require("../models/FaceBookUser.model");

const cloudinary = require("cloudinary").v2;
const Course = require("../models/Course.model");

//Xác thục bởi facebook
Router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "user_photos"],
  })
);

//Redirect từ facebook => web browser
Router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
  }),
  function (req, res, next) {
    res.redirect("/");
  }
);

//GET LOGIN
Router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("./user/login", {
      isAuthenticated: req.isAuthenticated()
  });
});

//GET register
Router.get("/register", forwardAuthenticated, (req, res) => {
  res.render("./user/register", {
      isAuthenticated: req.isAuthenticated()
  });
});

//POST register
Router.post("/register", function (req, res) {
  const { name, email, password, password2, gender } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "Please enter all fields",
    });
  }

  if (password != password2) {
    errors.push({
      msg: "Passwords do not match",
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: "Password must be at least 6 characters",
    });
  }

  if (errors.length > 0) {
    res.render("./user/register", {
      isAuthenticated: req.isAuthenticated(),
      errors
    });
  } else {
    LocalUser.findOne({
      email: email,
    }).then(async (user) => {
      if (user) {
        errors.push({
          msg: "Account existed, Try another email",
        });
        res.render("./user/register", {
          isAuthenticated: req.isAuthenticated(),
          errors
        });
      } else {
        //Tạo client request để gửi gmail xác thực OTP
        const clientID =
          "520933105747-lvrafi3nq92ia2hv9mkgrdh706sl0ei2.apps.googleusercontent.com";
        const clientSecret = "NAjZvQbzYipjQYBxnaHPHSr9";
        const redirectUri = "https://developers.google.com/oauthplayground";
        const refreshToken =
          "1//042Ld0MGfUQmICgYIARAAGAQSNwF-L9IrzcaMjqdyMhuXqIXqsaWmNLn70YhjopS-pQU1hEr0311t9MA4nogHg3Ufq9xOBue9KF8";

        const oAuth2Client = new OAuth2(clientID, clientSecret, redirectUri);

        oAuth2Client.setCredentials({
          refresh_token: refreshToken,
        });

        const accessToken = oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "minhthevo123@gmail.com",
            clientId: clientID,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken,
          },
        });

        //OTP NUMBER
        const otpNumber = (
          Math.floor(Math.random() * 900000) + 100000
        ).toString();

        const mailOption = {
          from: "WEBCTT2 <minhthevo123@gmail.com>",
          to: email,
          subject: "Authenticte message",
          text: "Hello form WEBCTT2",
          html: `<h2>This is your OTP number: <b>${otpNumber}</b></h2>`,
        };

        transporter.sendMail(mailOption).then(async (result) => {
          let newUser = new LocalUser();
          newUser.name = name;
          newUser.email = email;
          newUser.password = await bcrypt.hash(password, 10);
          newUser.gender = gender;
          newUser.otpNumber = otpNumber;
          newUser.save();

          req.session.currentEmail = email;

          res.render("./user/otp1", {
            isAuthenticated: req.isAuthenticated(),
          });
        });
      }
    });
  }
});

Router.post("/otp", async (req, res) => {
  const otpNumber = req.body.otpNumber;
  const localUser = await LocalUser.findOne({
    email: req.session.currentEmail,
  });
  if (otpNumber == localUser.otpNumber) {
    LocalUser.findOne({
      email: req.session.currentEmail,
    }).then((user) => {
      user.isAuth = true;
      user.save();
      req.flash("success_msg", "OTP correct! You can log in now");
      res.redirect("/users/login");
    });
  } else {
    const errors = [
      {
        msg: "OTP not correct!!",
      },
    ];
    res.render("./user/otp1", {
      errors,
      isAuthenticated: req.isAuthenticated()
    });
  }
});

Router.post("/login", async (req, res, next) => {
  let { email, password } = req.body;

  const user = await LocalUser.findOne({
    email: email
  });

  if (user != null) {
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        if (user.isAuth) {
          passport.authenticate("local", {
            failureRedirect: "/users/login",
            successRedirect: "/",
          })(req, res, next);
        } else {
          req.session.currentEmail = email;
          req.flash("error_msg", "Please fill correct OTP to login");
          res.render("./user/otp1", {
            isAuthenticated: req.isAuthenticated()
          });
        }
      } else {
        req.flash("error_msg", "Invalid account");
        res.render("./user/login", {
          isAuthenticated: req.isAuthenticated(),
        });
      }
    });
  } else {
    req.flash("error_msg", "Invalid account");
    res.render("./user/login", {
      isAuthenticated: req.isAuthenticated(),
    });
  }
});

Router.get("/logout", (req, res) => {
  req.flash("success_msg", "You now log out");
  req.logout();
  res.redirect("/");
});

Router.get("/account", ensureAuthenticated, (req, res) => {
  res.render("./user/account", {
    isLocalAccount: req.user.password != undefined ? true : false,
    user: req.user,
    isAuthenticated: req.isAuthenticated(),
  });
});

//Kiểm tra cập nhật thông tin cá nhân
Router.post("/updateInfor", async (req, res) => {
  let { name, oldPassword, newPassword, confPassword, gender } = req.body;
  let errors = [];
  //Nếu là localaccount
  if (req.user.password != undefined) {
    if (!name || !newPassword || !confPassword || !gender || !oldPassword) {
      errors.push({
        msg: "Please enter all fields",
      });
    } else {
      if (newPassword != confPassword) {
        errors.push({
          msg: "Passwords do not match",
        });
      }

      if (newPassword.length < 6) {
        errors.push({
          msg: "Password must be at least 6 characters",
        });
      }

      await bcrypt.compare(oldPassword, req.user.password).then((isMatch) => {
        if (!isMatch) {
          errors.push({
            msg: "Old password is uncorrect",
          });
        }
      });
    }
  }
  //Nếu không phải Local Account
  else {
    if (!name) {
      errors.push({
        msg: "Please enter all fields",
      });
    }
  }
  //Nếu có lỗi, tra về 1 file JSON danh sách các lỗi
  if (errors.length > 0) {
    await res.json(errors);
  } else {
    //Nếu không có lỗi thì cập nhật lại thông tin user
    req.user.name = name;
    req.user.gender = gender;
    //Không phải account local
    if (req.user.password != undefined) {
      req.user.password = await bcrypt.hash(newPassword, 10);
    }
    req.user.save().then(() => {
      req.flash("success_msg", "Your are updated");
      res.json(true);
    });
  }
});

//Upload avatar
Router.post("/updateAvatar", function (req, res) {
  fs.mkdir(
    path.join(__dirname, "../public/avatar/" + req.user._id.toString()),
    () => {}
  );

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/avatar/" + req.user._id.toString());
    },
    filename: function (req, file, cb) {
      let avatar =
        "/public/avatar/" + req.user._id.toString() + "/" + "avatar.png";
      req.user.avatar = avatar;
      req.user.save();
      cb(null, "avatar.png");
    },
  });
  const upload = multer({
    storage,
  });
  upload.single("fuMain")(req, res, async function async(err) {
    if (err) {
      console.log(err);
    } else {
      // let avatar =
      //     "../public/avatar/" + req.user._id.toString() + "/" + "avatar.png";
      // await cloudinary.uploader.upload(avatar, {
      //     public_id: 'NEWFOLDER/test',
      //     resource_type: 'image'
      // }, (err, result)=>{
      //     console.log(err);
      //     console.log(result);
      // });
      await res.redirect("/users/account");
    }
  });
});

//Xử lí request ajax bấm vào nút yêu thích cảu client
Router.post("/wish-list-change", ensureAuthenticated, async (req, res) => {
  courseID = req.body.courseID;
  if (courseID != undefined) {
    let index;
    if ((index = req.user.idWishList.indexOf(courseID)) == -1) {
      req.user.idWishList.push(courseID);
    } else {
      req.user.idWishList.splice(index, 1);
    }
    req.user.save();
    res.end();
  }
});

//Xử lí requrest ajax bấm vào nút PlayVideo
Router.post("/:nameCourse/updateLearnedVideo", async (req, res) => {
  const videoIndex = req.body.videoIndex;
  const course = await Course.findOne({
    name: req.params.nameCourse,
  });

  //Đánh dấu video đã được xem 
  let flag = false;
  for (let i = 0; i < req.user.purchasedCourses.length; i++) {
    if (req.user.purchasedCourses[i].idCourse.toString() == course._id
        && req.user.purchasedCourses[i].learnedVideos.indexOf(videoIndex) == -1) {
      req.user.purchasedCourses[i].learnedVideos.push(videoIndex);
      req.user.save();
      res.json(true);
      flag = true;
      break;
    }
  }
  if (!flag) {
    res.json(false);
  }
  
});

module.exports = Router;
