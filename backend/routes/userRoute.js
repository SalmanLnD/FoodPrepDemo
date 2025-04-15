const express = require('express')
const {loginUser, registerUser,googleLogin} = require('../controllers/userController')
const userRouter = express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/google-login', googleLogin)


module.exports = userRouter