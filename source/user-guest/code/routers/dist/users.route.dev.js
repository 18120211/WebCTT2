"use strict";

var express = require('express');

var Router = express.Router();

var passport = require('passport');

var _require = require('../config/auth.config'),
    ensureAuthenticated = _require.ensureAuthenticated,
    forwardAuthenticated = _require.forwardAuthenticated;

var LocalUser = require('../models/LocalUser.model');

var nodemailer = require("nodemailer");

var _require2 = require('googleapis'),
    google = _require2.google;

var OAuth2 = google.auth.OAuth2;

var bcrypt = require('bcryptjs');

var fs = require('fs');

var path = require('path');

var multer = require('multer');

var FaceBookUser = require('../models/FaceBookUser.model');

var cloudinary = require('cloudinary').v2; //Xác thục bởi facebook


Router.get("/auth/facebook", passport.authenticate("facebook", {
  scope: ["email", "user_photos"]
})); //Redirect từ facebook => web browser

Router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  failureRedirect: "/"
}), function (req, res, next) {
  res.redirect("/");
}); //GET LOGIN

Router.get('/login', forwardAuthenticated, function (req, res) {
  res.render('./user/login');
}); //GET register

Router.get('/register', forwardAuthenticated, function (req, res) {
  res.render('./user/register');
}); //POST register

Router.post("/register", function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      password2 = _req$body.password2,
      gender = _req$body.gender;
  var errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "Please enter all fields"
    });
  }

  if (password != password2) {
    errors.push({
      msg: "Passwords do not match"
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: "Password must be at least 6 characters"
    });
  }

  if (errors.length > 0) {
    res.render("./user/register", {
      errors: errors
    });
  } else {
    LocalUser.findOne({
      email: email
    }).then(function _callee2(user) {
      var clientID, clientSecret, redirectUri, refreshToken, oAuth2Client, accessToken, transporter, otpNumber, mailOption;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (user) {
                errors.push({
                  msg: "Account existed, Try another email"
                });
                res.render("./user/register", {
                  errors: errors
                });
              } else {
                //Tạo client request để gửi gmail xác thực OTP
                clientID = '520933105747-lvrafi3nq92ia2hv9mkgrdh706sl0ei2.apps.googleusercontent.com';
                clientSecret = 'NAjZvQbzYipjQYBxnaHPHSr9';
                redirectUri = 'https://developers.google.com/oauthplayground';
                refreshToken = '1//04xoTZN2oPryPCgYIARAAGAQSNwF-L9Irhz1y_ypHDLEizhevJ2P9DB7_ZSWfqItoqCIqZzI8Zp5eUYE1kFnJz4Z6gi9aWgYzKe8';
                oAuth2Client = new OAuth2(clientID, clientSecret, redirectUri);
                oAuth2Client.setCredentials({
                  refresh_token: refreshToken
                });
                accessToken = oAuth2Client.getAccessToken();
                transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    type: 'OAuth2',
                    user: 'minhthevo123@gmail.com',
                    clientId: clientID,
                    clientSecret: clientSecret,
                    refreshToken: refreshToken,
                    accessToken: accessToken
                  }
                }); //OTP NUMBER

                otpNumber = (Math.floor(Math.random() * 900000) + 100000).toString();
                mailOption = {
                  from: 'WEBCTT2 <minhthevo123@gmail.com>',
                  to: email,
                  subject: 'Authenticte message',
                  text: 'Hello form WEBCTT2',
                  html: "<h2>This is your OTP number: <b>".concat(otpNumber, "</b></h2>")
                };
                transporter.sendMail(mailOption).then(function _callee(result) {
                  var newUser;
                  return regeneratorRuntime.async(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          newUser = new LocalUser();
                          newUser.name = name;
                          newUser.email = email;
                          _context.next = 5;
                          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

                        case 5:
                          newUser.password = _context.sent;
                          newUser.gender = gender;
                          newUser.otpNumber = otpNumber;
                          newUser.save();
                          req.session.currentEmail = email;
                          res.render('./user/otp');

                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }
                  });
                });
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  }
});
Router.post('/otp', function _callee3(req, res) {
  var otpNumber, localUser, errors;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          otpNumber = req.body.otpNumber;
          _context3.next = 3;
          return regeneratorRuntime.awrap(LocalUser.findOne({
            email: req.session.currentEmail
          }));

        case 3:
          localUser = _context3.sent;

          if (otpNumber == localUser.otpNumber) {
            LocalUser.findOne({
              email: req.session.currentEmail
            }).then(function (user) {
              user.isAuth = true;
              user.save();
              req.flash("success_msg", "OTP correct! You can log in now");
              res.redirect('/users/login');
            });
          } else {
            errors = [{
              msg: 'OTP not correct!!'
            }];
            res.render('./user/otp', {
              errors: errors
            });
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
Router.post('/login', function _callee4(req, res, next) {
  var _req$body2, email, password, user;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context4.next = 3;
          return regeneratorRuntime.awrap(LocalUser.findOne({
            email: email
          }));

        case 3:
          user = _context4.sent;

          if (user != null) {
            bcrypt.compare(password, user.password).then(function (isMatch) {
              if (isMatch) {
                if (user.isAuth) {
                  passport.authenticate('local', {
                    failureRedirect: '/users/login',
                    successRedirect: '/'
                  })(req, res, next);
                } else {
                  req.session.currentEmail = email;
                  req.flash('error_msg', "Please fill correct OTP to login");
                  res.redirect('/users/otp');
                }
              } else {
                req.flash("error_msg", "Invalid account");
                res.render('./user/login');
              }
            });
          } else {
            req.flash("error_msg", "Invalid account");
            res.render('./user/login');
          }

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
Router.get('/logout', function (req, res) {
  req.flash('success_msg', 'You now log out');
  req.logout();
  res.redirect('/');
});
Router.get('/account', ensureAuthenticated, function (req, res) {
  res.render('./user/account', {
    isLocalAccount: req.user.password != undefined ? true : false,
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });
}); //Kiểm tra cập nhật thông tin cá nhân

Router.post('/updateInfor', function _callee5(req, res) {
  var _req$body3, name, oldPassword, newPassword, confPassword, gender, errors;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, name = _req$body3.name, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, confPassword = _req$body3.confPassword, gender = _req$body3.gender;
          errors = []; //Nếu là localaccount

          if (!(req.user.password != undefined)) {
            _context5.next = 13;
            break;
          }

          if (!(!name || !newPassword || !confPassword || !gender || !oldPassword)) {
            _context5.next = 7;
            break;
          }

          errors.push({
            msg: "Please enter all fields"
          });
          _context5.next = 11;
          break;

        case 7:
          if (newPassword != confPassword) {
            errors.push({
              msg: "Passwords do not match"
            });
          }

          if (newPassword.length < 6) {
            errors.push({
              msg: "Password must be at least 6 characters"
            });
          }

          _context5.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(oldPassword, req.user.password).then(function (isMatch) {
            if (!isMatch) {
              errors.push({
                msg: 'Old password is uncorrect'
              });
            }
          }));

        case 11:
          _context5.next = 14;
          break;

        case 13:
          if (!name) {
            errors.push({
              msg: "Please enter all fields"
            });
          }

        case 14:
          if (!(errors.length > 0)) {
            _context5.next = 19;
            break;
          }

          _context5.next = 17;
          return regeneratorRuntime.awrap(res.json(errors));

        case 17:
          _context5.next = 26;
          break;

        case 19:
          //Nếu không có lỗi thì cập nhật lại thông tin user
          req.user.name = name;
          req.user.gender = gender; //Không phải account local

          if (!(req.user.password != undefined)) {
            _context5.next = 25;
            break;
          }

          _context5.next = 24;
          return regeneratorRuntime.awrap(bcrypt.hash(newPassword, 10));

        case 24:
          req.user.password = _context5.sent;

        case 25:
          req.user.save().then(function () {
            req.flash("success_msg", "Your are updated");
            res.json(true);
          });

        case 26:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //Upload avatar

Router.post("/updateAvatar", function (req, res) {
  fs.mkdir(path.join(__dirname, "../public/avatar/" + req.user._id.toString()), function () {});
  var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
      cb(null, "./public/avatar/" + req.user._id.toString());
    },
    filename: function filename(req, file, cb) {
      var avatar = "/public/avatar/" + req.user._id.toString() + "/" + "avatar.png";
      req.user.avatar = avatar;
      req.user.save();
      cb(null, "avatar.png");
    }
  });
  var upload = multer({
    storage: storage
  });
  upload.single("fuMain")(req, res, function async(err) {
    return regeneratorRuntime.async(function async$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!err) {
              _context6.next = 4;
              break;
            }

            console.log(err);
            _context6.next = 6;
            break;

          case 4:
            _context6.next = 6;
            return regeneratorRuntime.awrap(res.redirect("/users/account"));

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
}); //Xử lí request ajax bấm vào nút yêu thích cảu client

Router.post('/wish-list-change', ensureAuthenticated, function _callee6(req, res) {
  var index;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          courseID = req.body.courseID;

          if (courseID != undefined) {
            if ((index = req.user.idWishList.indexOf(courseID)) == -1) {
              req.user.idWishList.push(courseID);
            } else {
              req.user.idWishList.splice(index, 1);
            }

            req.user.save();
            res.end();
          }

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
});
module.exports = Router;