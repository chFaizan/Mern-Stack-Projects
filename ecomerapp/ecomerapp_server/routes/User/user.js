require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const uath = require("../../middleware/UserAuthentication")

router.post('/userreg', async (req, res) => {
  try {
    const { uemail, upass } = req.body;

    // Validate input
    if (!uemail || !upass) {
      return res.status(400).json({ error: 'uemail and upass are required' });
    }

    const hashedPass = await bcrypt.hash(upass, 10);

    const newUser = new User({
      uemail,
      upass: hashedPass
    });

    const savedUser = await newUser.save(); // ✅ await here
    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/userlogin', async (req, res) => {
  const { uemail, upass } = req.body;

  try {
    const userLogin = await User.findOne({ uemail });

    if (!userLogin) {
      return res.json({ uloginsts: "1", msg: "User not Found" });
    }

    const isMatch = await bcrypt.compare(upass, userLogin.upass);
    if (!isMatch) {
      return res.json({ uloginsts: "2", msg: "Password does not Match" });
    }
    else{
  const token = jwt.sign(
      { id: userLogin._id },
      process.env.USER_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, uloginsts: "0" });
    }

  

  } catch (error) {
    console.error(error);
  }
});

router.post('/testauth',uath, async (req, res) => {
  res.json({'msg':"This route called sucess"})

})






module.exports = router