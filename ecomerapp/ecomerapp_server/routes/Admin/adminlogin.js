const bcrypt = require('bcryptjs');
const express = require('express');
const AdminToken = require('../../models/AdminToken');
const router = express.Router();
const Admin = require('../../models/Admin');
const AdminPassReset = require('../../models/AdminPassReset');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const {sendEmail} = require('../../CommonSnips/emailSender');
// Create Admin
router.post('/createadmin', async (req, res) => {
    try {
        const newAdmin = new Admin({
            admin_name: req.body.admin_name,
            admin_email: req.body.admin_email,
            admin_pass: bcrypt.hashSync(req.body.admin_pass, 10),
        });

        const saveAdmin = await newAdmin.save();
        res.json(saveAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { admin_email, admin_pass } = req.body;

    try {
        const login = await Admin.findOne({ admin_email });

        if (!login) {
            return res.json({ sts: 1, msg: 'Email Not Found' });
        }

        const passwordMatch = await bcrypt.compare(admin_pass, login.admin_pass);

        if (!passwordMatch) {
            return res.json({ sts: 2, msg: 'Password is wrong' });
        }

        const token = jwt.sign(
            { adminId: login._id },
            process.env.ADMIN_TOKEN_SECRET,
            { expiresIn: '6h' }
        );

        const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000);

        const tokenSave = new AdminToken({
            adminId: login._id,
            token,
            expiresAt,
        });

        await tokenSave.save();

        return res.json({
            sts: 0,
            msg: 'Login Successful',
            aid: login._id,
            aemail: login.admin_email,
            aname: login.admin_name,
            token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check Token
router.post('/checktoken', async (req, res) => {
    const token = req.body.token;

    try {
        const tokenchk = await AdminToken.findOne({ token });

        if (!tokenchk) {
            return res.json({ tokensts: 1 });
        } else {
            return res.json({ tokensts: 0 });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/updatepass', async (req, res) => {
    const admin_email = req.body.admin_email;
    const old_pass = req.body.old_pass;
    const admin_pass = req.body.admin_pass;

    try {
        const passchk = await Admin.findOne({ admin_email });

        if (await bcrypt.compare(old_pass, passchk.admin_pass)) {
            // Old password matches
            const hasadmin_pass = await bcrypt.hash(admin_pass, 12);

            const updateAdminPass = await Admin.findOneAndUpdate(
                { admin_email : admin_email },
                { $set: { admin_pass: hasadmin_pass } },
                { new: true }
            );

            res.json({ "chpasssts": 0, "msg": "Password is Changed" });
        } else {
            res.json({ "chpasssts": 1, "msg": "Password Not changed as old pass do not match" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ chpasssts: 2, msg: "Server error" });
    }
});


router.post('/logout', async (req, res) => {
    const token = req.body.token

    try {
        const logout = await AdminToken.findOneAndDelete({token})
        if(!logout){
            return res.json({'logoutsts':1, "msg": "Logout Failed"})
        }
        else{
              return res.json({'logoutsts':0})
        }
    } catch (error) {
        console.error(error)
    }});

router.post('/sendresetlink', async (req, res) => {
  const admin_email = req.body.admin_email;
  try {
    const findadmin = await Admin.findOne({ admin_email });
    if (!findadmin) {
      return res.json({ "sts": 1, "msg": "Email Not Found" });
    } else {
      const subject = "E-Commer App : Reset Password link";
      const reset_token = shortid.generate();
      const expiresAt = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour
      const text = `Your Reset password link is : http://localhost:3000/adminpassreset/${reset_token}`;

      const saveResetToken = new AdminPassReset({
        admin_email,
        reset_token,
        expiresAt
      });

   const result = await saveResetToken.save();

await sendEmail(admin_email, subject, text); 

return res.json({
  "sts": 0,
  "msg": "Your reset link has sent",
  "reset url": `http://localhost:3000/adminpassreset/${reset_token}`
});

    }
  } catch (err) {
    return res.json({ "sts": 1, "msg": "Something went wrong", "error": err.message });
  }
});


router.post('/resetpass', async (req, res) => {
  const reset_token = req.body.reset_token
  const admin_pass = await bcrypt.hash(req.body.admin_pass, 12)

  try {
    const findadmin = await AdminPassReset.findOne({ reset_token })

    if (!findadmin) {
      return res.json({ "sts": 1, "msg": "Your link is expired" })
    } else {
      const admin_email = findadmin.admin_email
      const updateAdminPass = await Admin.findOneAndUpdate(
        { admin_email: admin_email },
        {
          $set: {
            admin_pass: admin_pass
          }
        },
        { new: true }
      )
      const deltoken = await AdminPassReset.findOneAndDelete({reset_token})
      return res.json({ "sts": 0, "msg": "Your Password is Updated" })
    }
  } catch (error) {
    console.error(error)
  }
})



module.exports = router;
