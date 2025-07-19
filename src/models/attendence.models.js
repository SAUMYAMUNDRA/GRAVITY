import mongoose from 'mongoose';

// Note: we’ll connect to the “DL” database separately
const attendanceSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  qr_id:      { type: String, required: true },
  timestamp: { type: Date,   required: true, default: Date.now },
}, { timestamps: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
