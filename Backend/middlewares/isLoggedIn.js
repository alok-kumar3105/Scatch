const jwt=require('jsonwebtoken');
const userModel=require('../models/user-model')
async function isLoggedIn(req, res, next){
    if(!req.cookies.token){
        req.flash('error', "You need to Login first!");
        return res.redirect('/');
    }
    try{
        let data=jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user=await userModel.findOne({_id: data.id}).select('-password');
        req.user=user;
        return next();
    }
    catch(err){
        req.flash("error", "Something went wrong!!");
        return res.redirect('/');
    }
}
module.exports = isLoggedIn;