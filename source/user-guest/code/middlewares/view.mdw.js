const expressLayouts = require('express-ejs-layouts');

module.exports = function(app) {
    app.set('view engine', 'ejs');
    app.use(expressLayouts);
}

