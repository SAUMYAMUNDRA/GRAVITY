// ✅ reg_router.js
import express from 'express'
import {User} from '../models/user.models.js'

const reg_router = express.Router()

reg_router.post('/register', async (req, res) => {
  try {
    const { name, email, reg_no, phone_no, academic_year, password } = req.body

    if (!name || !email || !reg_no || !phone_no || !academic_year || !password) {
      return res.status(401).send("Fill all fields")
    }

    console.log("reg details: ", req.body)

    const existingUser = await User.findOne({ reg_no })

    if (existingUser) {
      console.log("User already exists, please sign in")
      return res.status(401).send(`User already exists with reg no ${reg_no}, please log in`)
    }

    await User.create({ name, email, reg_no, phone_no, academic_year, password })
    res.send('Registration successful!')

  } catch (error) {
    console.log("Error registering user:", error)
    res.status(401).send("Error registering user")
  }
})

export default reg_router
