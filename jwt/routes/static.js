const express = require('express');
const {generateShortID, redirectRequest, getAnalytics} = require('../controllers/url')
const staticRouter = express.Router();

staticRouter.get('/', (req, res) => {
  return res.render('home', {
    shortID: '',
    redirectURL: '',
    clickCount: 0
  });
});

module.exports = {
  staticRouter
};


