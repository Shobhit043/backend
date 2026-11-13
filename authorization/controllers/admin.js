const User = require('../db/models/user');
const URL = require('../db/models/url');

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}, {password: 0}).sort({createdAt: -1});
    res.status(200).json(users);
  }
  catch (error) {
    res.status(500).json({"error": error});
  }
}

async function getAllURLs(req, res) {
  try {
    const urls = await URL.find().sort({createdAt: -1});
    res.status(200).json(urls);
  }
  catch (error) {
    res.status(500).json({"error": error});
  }
}

async function getAllURLsView(req, res) {
  try {
    const urls = await URL.find().sort({createdAt: -1}).populate('owner', 'name email role');
    res.status(200).render('home', {
      urls,
      shortID: '',
      redirectURL: '',
      clickCount: 0,
      isAdmin: true
    });
  }
  catch (error) {
    res.status(500).json({"error": error});
  }
}

async function getAllUsersView(req, res) {
  try {
    const users = await User.find({}, {password: 0}).sort({createdAt: -1});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error});
  }
}

async function updateUserRole(req, res) {
  const {userId} = req.params;
  const {role} = req.body;
  if (!['normal', 'admin'].includes(role)) {
    return res.status(400).json({"error": "Invalid role. Must be 'normal' or 'admin'"});
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({"error": "User not found"});
    }
    user.role = role;
    await user.save();
    res.status(200).json({message: "User role updated", user: {name: user.name, email: user.email, role: user.role}});
  }
  catch (error) {
    res.status(500).json({"error": error});
  }
}

module.exports = {
  getAllUsers,
  getAllURLs,
  getAllURLsView,
  getAllUsersView,
  updateUserRole
}
