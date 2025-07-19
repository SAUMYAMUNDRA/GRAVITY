import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './src/database/db.js';
import dotenv from 'dotenv';
import reg_router from './src/routers/reg_router.js'; // adjust path if needed


dotenv.config();


const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(reg_router);

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
  }
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'pages')));
// HTML page routes
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});



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
