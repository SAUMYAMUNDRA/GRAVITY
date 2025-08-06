import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../models/user.models.js';
const login_router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const updatedashboard_route = express.Router();

updatedashboard_route.post('/updatedashboard',async (req,res)=>{
    try {
        const {email,academic_year}=req.body;
        const user=req.session.userId;
        const newemail=email
        const newacadmicyear=academic_year
        const update=await User.findByIdAndUpdate(user,{email:newemail,academic_year:newacadmicyear})
        if(update){
           if (update) {
  req.session.toast = "updated successfully";
res.redirect('/profile.html');}            
        }
        else{
            console.log("error updating details");
            res.status(401).send("internal error occurred");
        }
    } catch (error) {
        console.log("error getting updated profiledashboard details",error);
        res.status(401).send("internal error occurred");
    }
})
export default updatedashboard_route;
