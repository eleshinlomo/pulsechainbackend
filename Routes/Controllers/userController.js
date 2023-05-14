const express = require('express')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


// Add User

exports.addUser = async (req, res)=>{

    const {email, username, password} = req.body
    try{
  
      const existingEmail = await User.findOne({email})
      if(existingEmail) return res.status(409).send({message: "User already exist"})
      const existingUsername = await User.findOne({username})
      if(existingUsername) return res.status(410).send({message: "Username already exist"})
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await new User({
        email,
        username,
        password: hashedPassword,
        
      })
      console.log(user)
      await user.save()
      return res.status(200).send({success: true, message: `Hello ${user.username}, You are now registered.`})
  
    }
    catch(err){
      console.log(err)
    return res.send({message: err})
    }
  }


  
// User login

exports.userLogin = async (req, res)=>{
    const {username, password} = req.body
    try{
     
     const user = await User.findOne({username})
     if(!user) return res.send({message: "Problem with Username"})
     const passwordMatch = await bcrypt.compare(password, user.password)
     if(!passwordMatch) return res.status(405).send({message: "Password does not match"})
     
    //  jwt sign credentials
    
     const token = jwt.sign({
      id: user._id,
      username: user.username
    }, process.env.USER_TOKEN_SECRET, {expiresIn: "1d"})
  
    // send cookie
     res.cookie('userjwt', token, {httpOnly: true, secure: true, sameSite: "none"})
     console.log(`${user.username} has logged in`)
     return res.status(200).send({success: true, message: `Hi ${user.username.toUpperCase()}, You are logged in.`})
  
    }
    catch(err){
      console.log(err)
      return res.send({message: err})
      
    }
  }



  // get User

exports.getUser = async (req, res)=>{
    const user = req.user
   
    console.log(` ${user.username} now viewing this page.`)
   
  
    try{
    
    if(!user) return res.send({message: "You need to be logged in to view this page."})
    
    return res.status(200).json({
      success: true,
      greeting: ` , ${user.username}`,
      user: user,
     })
    }
  
  catch(err){
    console.log(err)
    return res.status(500).json({err: "error fetching username"})
    
  }
    
  }
  



// logout
exports.logout = (req, res)=>{
    
    res.clearCookie('userjwt')
    res.clearCookie('pulseuser')

    return res.end()
  }
