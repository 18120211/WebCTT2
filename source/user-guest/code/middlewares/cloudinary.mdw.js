const cloudinary = require('cloudinary').v2;

module.exports = function (app) { 
    require('../config/cloudinary.config')(cloudinary);
}
