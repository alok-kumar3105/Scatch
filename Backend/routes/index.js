const express=require('express');
const router=express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', function(req,res){
    let error=req.flash("error");
    res.render('index', {error});
});

router.get('/shop', isLoggedIn, async (req, res)=>{
    let all_products=await productModel.find();
    let success=req.flash("success");
    res.render('shop', {all_products, success, user: req.user});
});

router.get('/profile/edit', isLoggedIn, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email});
    res.render('editProfile', {user});
})

router.post('/profile/edit', isLoggedIn, async (req, res)=>{
    let {fullname, phone, address}=req.body;
    console.log(phone);
    let user = await userModel.findOneAndUpdate({email: req.user.email}, {fullname, contact:phone, address}, {new: true});
    res.redirect('/profile');
})

router.get('/profile', isLoggedIn, async(req, res)=>{
    let user= await userModel.findOne({email: req.user.email});
    res.render('userProfile', {user});
})
 
module.exports = router;