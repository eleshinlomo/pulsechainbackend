const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')




// User cookie

exports.verifyUser = async (req, res, next) => {
    try {
      const authHeader = req.cookies['userjwt']
      if (!authHeader) {
        console.log("no cookie found")
        return res.status(403).send({message: "You are not authorized to view this page."})
      }
      
      const decodedToken = jwt.verify(authHeader, process.env.USER_TOKEN_SECRET)
      if(!decodedToken) return res.status(404).send({message: "Your login session has expired"})
      const user = decodedToken
      req.user = user
      res.cookie('pulseuser', req.user.id, { httpOnly: true, secure: true, sameSite: "none"})
      next()
    } catch (err) {
      console.error(err)
      return res.status(500).send({ message: err })
    }
  }