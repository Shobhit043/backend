const { Router } = require('express');
const { getBlogPage, createBlog, mgetBlogDetailPage } = require('../controllers/blog');
const uploadCoverImage = require('../middlwares/upload');
const router = Router();

router.get('/add-blog', getBlogPage);
router.get('/:id', mgetBlogDetailPage);
router.post('/add-new', uploadCoverImage, createBlog);
module.exports = router;
