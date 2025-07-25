import express from 'express';
const logout_router = express.Router();
logout_router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session:", err);
      // Clear cookie anyway
      res.clearCookie('connect.sid');
      return res.redirect('/?message=' + encodeURIComponent("Logout failed, please try again"));
    }
    // On success, clear the cookie and send back to login
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});
export default logout_router;