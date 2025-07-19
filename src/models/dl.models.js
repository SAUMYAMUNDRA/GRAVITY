import mongoose from 'mongoose';

const DLSchema = new mongoose.Schema({
  qr_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const DL = mongoose.model('DL', DLSchema);
