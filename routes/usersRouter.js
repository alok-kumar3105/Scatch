const express=require('express');
const router = express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn');
const {createUser, loginUser, logout}=require('../controllers/authController');


router.post('/create', createUser)

router.post('/login', loginUser);

router.get('/logout', logout);

module.exports = router;
