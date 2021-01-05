const session = require("express-session");

module.exports = function (app) {
    // Express session
    app.use(session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    }));
};