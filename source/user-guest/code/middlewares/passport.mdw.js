const passport = require('passport');

module.exports = function(app) {
    //Pasport config
    require('../config/passport.config')(passport);

    //Passport middlewares
    app.use(passport.initialize());
    app.use(passport.session());    
}