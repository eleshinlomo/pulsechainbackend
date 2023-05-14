const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const auth = require('../middleware/auth')

// get User

router.get('/getuser', auth.verifyUser, userController.getUser )

router.post('/register', userController.addUser)
router.post('/login', userController.userLogin)

// logout

router.post('/logout', userController.logout)



module.exports = router