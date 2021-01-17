const bcrypt = require('bcryptjs');

const LocalStrategy = require('passport-local').Strategy;

const LocalUser = require('../models/LocalUser.model');

const Lecturer = require('../models/Lecturer.model');

const Admin = require('../models/Admin.model');

const FacebookStrategy = require('passport-facebook').Strategy;

const FaceBookUser = require('../models/FaceBookUser.model');

module.exports = function (passport) {
    passport.use("admin",
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            // Match user
            Admin.findOne({
                email: email
            }).then(async (user) => {
                if (user) {
                    bcrypt.compare(password, user.password).then((isMatch) => {
                        if (isMatch) {
                            return done(null, user);
                        }else {
                            return done(null, false, {
                                message: 'Password incorrect'
                            });
                        }
                    });
                }else{
                    Lecturer.findOne({
                        email: email
                    }).then(async (user) => {
                        if (!user) {
                            return done(null, false, {
                                message: 'That email is not registered'
                            });
                        }
                        bcrypt.compare(password, user.password).then((isMatch) => {
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, {
                                    message: 'Password incorrect'
                                });
                            }
                        })
                    });
                }
            });
        })
    );
    passport.use("customer",
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            // Match user
            LocalUser.findOne({
                email: email
            }).then(async (user) => {
                if (!user) {
                    return done(null, false, {
                        message: 'That email is not registered'
                    });
                }
                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Password incorrect'
                        });
                    }
                })
            })
        })
    );

    

    //Call when auth complete to save user data to session
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    //Call by passport.session to get user data from session
    passport.deserializeUser(function (id, done) {
        Admin.findById(id).then(user=>{
            if(user) {
                done(null, user);
            }
        });
        Lecturer.findById(id).then(user=>{
            if(user) {
                done(null, user);
            }
        });
        LocalUser.findById(id).then(user=>{
            if(user) {
                done(null, user);
            }
        });
        FaceBookUser.findById(id).then(user => {
            if (user) {
                done(null, user);
            }
        });
    });
};