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
module.exports = {
  getBlogPage,
  createBlog,
};
