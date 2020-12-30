const express = require('express');

const Router = express.Router();

Router.get('/', (req, res)=>{
    res.render('./index/home', {
        isAuthenticated: req.isAuthenticated()
    });
});

module.exports = Router;