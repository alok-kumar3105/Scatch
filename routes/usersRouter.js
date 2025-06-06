const express=require('express');
const router = express.Router();
const {createUser, loginUser}=require('../controllers/authController');

router.get('/', function(req, res){
    res.send('hey');
})

// router.post('/create', createUser);

// router.post('/create', (req, res)=>{
//     console.log(req.body);
// })

router.post('/login', loginUser);

module.exports = router;
