// import express from 'express';
// import { User } from '../models/user.models.js';
// import { DL } from '../models/dl.models.js';

// const router = express.Router();

// router.post('/scan', async (req, res) => {
//   try {
//     const { qr_id } = req.body;

//     if (!qr_id) return res.status(400).json({ error: 'qr_id is required' });

//     // Find the user with this QR ID
//     const user = await User.findOne({ qr_id });

//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Save scan info to DL database
//     const newScan = new DL({
//       qr_id,
//       name: user.name
//     });

//     await newScan.save();

//     res.json({ success: true, message: 'Scan saved successfully', scan: newScan });

//   } catch (err) {
//     console.error('Error in scan:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export const scan_routers = router;
