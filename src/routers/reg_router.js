import express from 'express';
import { User } from '../models/user.models.js';

const reg_router = express.Router();

reg_router.post('/register', async (req, res) => {
  try {
    const { name, email, reg_no, phone_no, academic_year, password } = req.body;

    if (!name || !email || !reg_no || !phone_no || !academic_year || !password) {
      req.session.toast = "All fields are required";
      return res.redirect('/register');
    }

    console.log("reg details: ", req.body);

    const existingUserwithreg_no = await User.findOne({ reg_no  });
    const existingUserwithemail=await User.findOne({email})
    if (existingUserwithreg_no || existingUserwithemail) {
      req.session.toast = `User already exists with reg no ${reg_no}, or with ${email} please log in`;
      return res.redirect('/login');
    }

    await User.create({ name, email, reg_no, phone_no, academic_year, password });
    req.session.toast = "Registration successful! Please log in.";
    return res.redirect('/login');

  } catch (error) {
    console.log("Error registering user:", error);
    req.session.toast = "Error registering user";
    return res.redirect('/register');
  }
});

export default reg_router;
