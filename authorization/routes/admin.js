const express = require('express');
const {getAllURLsView, getAllUsersView, updateUserRole} = require('../controllers/admin');
const router = express.Router();

router.get('/urls', getAllURLsView);
router.get('/users', getAllUsersView);
router.patch('/users/:userId/role', updateUserRole);

module.exports = {
  router
};
