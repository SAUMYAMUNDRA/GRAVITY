import mongoose, { version } from "mongoose";
const userSchema = new mongoose.Schema({
  qr_id: {
    type: String,
  },
  reg_no: {
    type: String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {                          
    type: String,
    required: true
  },
  
  phone_no: {
    type:String,
    required:true
  },
  academic_year:{
    type:String,
    required:true
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
