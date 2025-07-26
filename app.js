import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './src/database/db.js';
import dotenv from 'dotenv';
import reg_router from './src/routers/reg_router.js'; 
import login_router from './src/routers/login_router.js';
import logout_router from './src/routers/logout_router.js';
import verifyotp_router from './src/routers/verifyotp_router.js';
import forgotpassword_router from './src/routers/forgotpassword_router.js';
import newpassword_router from './src/routers/newpassword_router.js';
dotenv.config();

const app = express();
// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Session middleware (should come BEFORE routers!)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // No 'cookie.maxAge' set => session becomes a browser-session cookie
}));

// ✅ Then use routers (they now have access to session)
app.use(reg_router);
app.use(login_router);
app.use(logout_router);
app.use(forgotpassword_router)
app.use(verifyotp_router)
app.use(newpassword_router)
// Serve static files
app.use(express.static(path.join(__dirname, 'pages')));

// HTML page routes
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});
app.get('/forgotpassword', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'forgotpassword.html'));
});

app.get('/verifyotp', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'verifyotp.html'));
});
app.get('/newpassword',(req,res)=>{
  res.sendFile(path.join(__dirname, 'pages', 'newpassword.html'));
})
app.get('/session-info', (req, res) => {
  const toast = req.session.toast;
  delete req.session.toast;
  if (req.session && req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user, toast });
  } else {
    return res.json({ loggedIn: false, toast });
  }
});
app.use(express.static(path.join(__dirname, 'src', 'public')));
// Start server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");
    app.listen(4000, () => {
      console.log("✅ Server running at http://localhost:4000");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
