const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Token = require('../models/token')



const SECRET_KEY = "admin123"

router.post('/adduser',async(req,res)=>{
    try {
        const newUser = new User({
            user_name : req.body.user_name,
            user_email : req.body.user_email,
            user_dob : req.body.user_dob,
            gender : req.body.gender,
            password : bcrypt.hashSync(req.body.password,10),

        })

        const saveUser = await newUser.save()
        res.json(saveUser)
    } catch (error) {
        res.status(500).json({'error': error })
    }
})

router.get('/viewuser',async(req,res)=>{
    try {
      const users = await User.find()
        res.json(users)

        
    } catch (error) {
        res.status(500).json({'error': error })
    }
})

router.get('/singleuser/:userid',async(req,res)=>{
    const uid = req.params.userid
    try {
      const users = await User.findById(uid)
        res.json(users)

        
    } catch (error) {
        res.status(500).json({'error': error })
    }
})

router.put('/updateuser/:userid',async(req,res)=>{
    const uid = req.params.userid
    try {
      const users = await User.findByIdAndUpdate(uid, {$set:req.body},{new:true})
        res.json(users)

        
    } catch (error) {
        res.status(500).json({'error': error })
    }
})

router.delete('/deleteuser/:userid',async(req,res)=>{
    const uid = req.params.userid
    try {
      const users = await User.findByIdAndDelete(uid)
        res.status(200).json({'msg': 'User has Sucessfully Delete' ,'sts':'1' })

        
    } catch (error) {
        res.status(500).json({'error': error })
    }
})


router.post('/userlogin',async(req,res)=>{
  
            const user_email =  req.body.user_email
             const password =  req.body.password
    
             try {
        const login = await User.findOne({user_email})
        if(!login){
            return res.json({'sts':1,'msg':'Email Not Found'})
        }
        else{
            if(await bcrypt.compare(password,login.password)){
                const token = jwt.sign({userid:login._id},SECRET_KEY,{expiresIn:'1hr'})
                const expiresAt = new Date(Date.now()+ 60*60+1000)
                const tokenSave = new Token({
                    userId: login._id,
                    token,
                    expiresAt,
                })
                const uname = login.user_name
                await tokenSave.save()
            return res.json({'sts':0,'msg':'Login Successfull',"user_name":uname,token})
        }
        else{
             return res.json({'sts':2,'msg':'Password is wrong'})
        }
        }

        }

     catch (error) {
        res.status(500).json({'error': error })
    }
})

router.post('/checktoken',async(req,res)=>{
  
            const token =  req.body.token
            
             try {
        const tokenchk = await Token.findOne({token})
        if(!tokenchk){
            return res.json({'tokensts':1,})
        }
        else{
           return res.json({'tokensts':0,})
        }

        }

     catch (error) {
        res.status(500).json({'error': error })
    }
})

router.post('/logout',async(req,res)=>{
    const token = req.body.token
    try {
      const logout = await Token.findOneAndDelete({token})
      if(!logout){
      return  res.json({'logout_sts': 1 })
}
else{
    return  res.json({'logout_sts': 0 })
}
        
    } catch (error) {
        res.json({'error': error })
    }
})

module.exports = router;




//const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: function(req,file,cb){
//         cb(null,file, fieldname+ "-"+Date.now()+ ".png");
//     }
// })
// const upload = multer({
//     storage:storage,
//     limits:{fileSize:100000}
// })

// router.post('/uploadimage',upload.single('profile_pic'), (req,res)=>{
//     res.json({'msg':'File Upload Sucessfully'})
// })