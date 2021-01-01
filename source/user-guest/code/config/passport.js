const bcrypt = require('bcryptjs');

const LocalStrategy = require('passport-local').Strategy;

const LocalUser = require('../models/LocalUser.model');

const FacebookStrategy = require('passport-facebook').Strategy;

const FaceBookUser = require('../models/FaceBookUser.model');

module.exports = function (passport) {
    passport.use(
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

    //Use for passport-facebook
    passport.use(new FacebookStrategy({
            clientID: '3662146897179822',
            clientSecret: '04c643cca3e1d80047b35b81a5d92895',
            callbackURL: "http://localhost:8000/users/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email', 'name', 'gender']
        },
        function (accessToken, refreshToken, profile, done) {
            FaceBookUser.findOne({
                facebookId: profile.id
            }).then((user) => {
                if (user) {
                    return done(null, user);
                } else if (!user) {
                    let newFaceBookUser = new FaceBookUser();
                    newFaceBookUser.facebookId = profile.id;
                    newFaceBookUser.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newFaceBookUser.email = profile.emails[0].value;
                    newFaceBookUser.avatar = profile.photos[0].value;
                    newFaceBookUser.gender = profile.gender;
                    newFaceBookUser.token = accessToken;

                    newFaceBookUser.save().then((user) => {
                        return done(null, user);
                    });
                }
            });
        }
    ));

    //Call when auth complete to save user data to session
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    //Call by passport.session to get user data from session
    passport.deserializeUser(function (id, done) {
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