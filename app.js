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
import updatedashboard_route from './src/routers/updatedashboard.router.js';
import contactus_router from './src/routers/contactus.router.js';
import { User } from './src/models/user.models.js';

dotenv.config();

const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// ✅ Routers
app.use(reg_router);
app.use(login_router);
app.use(logout_router);
app.use(forgotpassword_router);
app.use(verifyotp_router);
app.use(newpassword_router);
app.use(updatedashboard_route);
app.use(contactus_router);

// 🔹 Step 2: Serve pretty URLs automatically
app.use((req, res, next) => {
  // Skip directories and API endpoints
  if (
    req.path.endsWith('/') ||
    req.path.startsWith('/api') ||
    req.path.startsWith('/session-info')
  ) return next();

  const filePath = path.join(__dirname, 'pages', req.path + '.html');
  res.sendFile(filePath, (err) => {
    if (err) next(); // continue if file not found
  });
});

// 🔹 Step 3: Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'src', 'public')));

// 🔹 Session info endpoint
app.get('/session-info', (req, res) => {
  const toast = req.session.toast;
  delete req.session.toast;

  if (req.session && req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user, toast });
  } else {
    return res.json({ loggedIn: false, toast });
  }
});

// 🔹 User info API
app.get("/api/user-info", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .select("name reg_no email academic_year phone_no");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Start server
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
