const { Router } = require('express');
const userCtrl = require('../controllers/user');
const router = Router();

router.get('/signin', userCtrl.signinGet);

router.post('/signin', userCtrl.signinPost);

router.get('/signup', userCtrl.signupGet);

router.post('/signup', userCtrl.signupPost);

router.post('/signout', userCtrl.signoutPost);
module.exports = router;

