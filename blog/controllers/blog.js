const fs = require('node:fs');
const Blog = require('../models/blog');

const removeUploadedFile = (file) => {
  if (file) fs.unlink(file.path, () => {});
};

const getBlogPage = (req, res) => {
  return res.render('blog');
};
const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const id = req.user.id;
  if (!id) {
    removeUploadedFile(req.file);
    return res.redirect('/user/signin');
  }
  if (!title || !content) {
    removeUploadedFile(req.file);
    return res.status(400).send('Title and content required');
  }
  const blog = new Blog({
    title: title,
    content: content,
    coverImageURL: req.file ? `/uploads/${req.file.filename}` : undefined,
    createdBy: id,
  });
  await blog.save();
  res.redirect('/');
};

const mgetBlogDetailPage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('createdBy', 'name email');
    if (!blog) {
      return res.status(404).send('resource not found');
    }
    return res.status(200).render('blog-show', { blog });
  } catch (error) {
    return res.status(500).send('internal server error');
  }
};
module.exports = {
  getBlogPage,
  createBlog,
  mgetBlogDetailPage,
};
