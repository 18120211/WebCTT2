const cloudinary = require('cloudinary').v2;

module.exports = function (app) {
    cloudinary.config(require('../config/cloudinary'));
}