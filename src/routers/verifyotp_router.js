import express from 'express'
const verifyotp_router=express.Router()
verifyotp_router.post('/verifyotp',async (req,res)=>{
  const enteredOtp = req.body.otp;
  const sessionOtp = req.session.otp;
  const email = req.session.email;
  
  if (!sessionOtp || !email) {
    req.session.toast = "Session expired. Please try again.";
    return res.redirect('/forgotpassword');
  }
  if(enteredOtp===sessionOtp){
     return res.redirect('/newpassword');
  }
   else {
    req.session.toast = "Invalid OTP. Please try again.";
    return res.redirect('/verifyotp');
  }
})
export default verifyotp_router;