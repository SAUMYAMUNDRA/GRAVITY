import express from 'express'
import { User } from '../models/user.models.js'
const newpassword_router=express.Router()

export default newpassword_router.post('/newpassword',async (req,res)=>{
    const {password}=req.body
    try {

    

        const email=req.session.email
        if (!email) {
      req.session.toast = "Session expired or unauthorized access.";
      return res.redirect('/forgotpassword');
    }
     const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: password }
    );
     if (!updatedUser) {
      req.session.toast = "User not found. Please try again.";
      return res.redirect('/forgotpassword');
    }
       req.session.otp = null;
    req.session.email = null;

    req.session.toast = "Password reset successfully. Please log in.";
    res.redirect('/login');
    } catch (error) {
        console.log("error updating password",error);
        return res.status(400).send("error updating password please try again");
        
    }
})