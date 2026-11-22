const { Router } = require('express');
const { getBlogPage, createBlog } = require('../controllers/blog');
const uploadCoverImage = require('../middlwares/upload');
const router = Router();

router.get('/add-blog', getBlogPage);
router.post('/add-new', uploadCoverImage, createBlog);
module.exports = router;
