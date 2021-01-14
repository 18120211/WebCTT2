const expressLayouts = require('express-ejs-layouts');

const ejs = require('ejs');

module.exports = function(app) {
    app.set('view engine', 'ejs');
    app.use(expressLayouts);
}

