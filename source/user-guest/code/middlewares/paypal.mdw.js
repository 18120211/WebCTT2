const paypal = require('paypal-rest-sdk');

module.exports = function () {
  // Passport Config
  require("../config/paypal.config")(paypal);
};
