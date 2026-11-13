const express = require('express');
const { generateShortID, redirectRequest, getAnalytics } = require('../controllers/url')
const router = express.Router();

router.get('/:id', redirectRequest);
router.get('/analytics/:id', getAnalytics);
router.post('/', generateShortID);

module.exports = {
  router
};


