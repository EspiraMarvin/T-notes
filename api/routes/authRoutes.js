const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

router.router('/')
    .post(loginLimiter, authController.login)
  
router.router('/refresh')
    .get(authController.refresh)    

router.router('/logout')
    .post(authController.logout)       

module.exports = router    