const express = require('express');
const {getUserURLs} = require('../controllers/url')
const staticRouter = express.Router();

staticRouter.get('/', getUserURLs);

module.exports = {
  staticRouter
};
