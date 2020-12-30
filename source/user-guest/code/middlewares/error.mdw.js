require('express-async-errors');

module.exports = function (app) {
    //404 Error
    app.use((req, res) => {
        res.render('./error/404', {
            layout: false
        });
    })

    //500 Error
    app.use((err, req, res, next) => {
        console.log(err);
        res.render('./error/500', {
            layout: false
        });
    });
}