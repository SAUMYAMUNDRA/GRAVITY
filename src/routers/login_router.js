import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../models/user.models.js';

const login_router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

login_router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.session.toast = "All fields are mandatory";
      return res.redirect('/login');
    }

    const pass = password;
    const user = await User.findOne({ email });

    if (!user) {
      req.session.toast = "User not found. Please register first";
      return res.redirect('/login');
    }

    if (pass !== user.password) {
      req.session.toast = "Incorrect password";
      return res.redirect('/login');
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    req.session.toast = "Logged in successfully";
    return res.redirect('/index');
  } catch (error) {
    console.log("Error logging in:", error);
    req.session.toast = "Something went wrong";
    return res.redirect('/login');
  }
});

login_router.get('/session-info', (req, res) => {
  const toast = req.session.toast;
  delete req.session.toast;

  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user, toast });
  }
  return res.json({ loggedIn: false, toast });
});

export default login_router;
