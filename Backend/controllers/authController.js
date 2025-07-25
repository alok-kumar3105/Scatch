const userModel=require('../models/user-model')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {generateToken}=require('../utils/generateToken')

module.exports.createUser= async (req, res)=>{
    try{
        let { email , fullname, password}=req.body;
        let user=await userModel.findOne({email});
        if(user)return res.status(401).send("You already have an account, please login.")
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async (err, hash)=>{
                if(err){
                    return res.send(err.message);
                }
                else{
                    
                    let user=await userModel.create({
                        fullname,
                        email,
                        password: hash
                    })
                    let token=generateToken(user);
                    res.cookie("token", token);
                    res.redirect('/shop')
                }
            })
        })
    }
    catch(err){
        res.send(err.message)
    }
}

module.exports.loginUser= async(req, res)=>{
    let {email, password}=req.body;
    let user=await userModel.findOne({email});
    if(!user){
        req.flash("error", "Email or Password incorrect!")
        return res.redirect('/');
    }
    bcrypt.compare(password, user.password, (err, result)=>{
        if(err)return res.send(err.message);
        else{
            if(result){
                let token=generateToken(user);
                res.cookie("token", token);
                res.redirect('/shop');
            }
            else{
                req.flash("error", "Email or Password incorrect!")
                res.redirect('/');
            }
        }
    })
}

module.exports.logout = async (req, res)=>{
    res.cookie('token', "");
    res.redirect('/');
}
