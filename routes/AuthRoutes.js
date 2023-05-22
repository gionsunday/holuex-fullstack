
const express = require('express')
const router = express.Router()

const {login, register, email_verification, dashboard,after_login,
         beforePassword, forgotPassword, accountActivation, 
          updateStatusEarning} = require('../controllers/auth')
const authMiddleware = require('../middleware/auth')

router.post('/register', register)
router.post('/verify/email', email_verification)
router.post('/forgotpassword/:email', forgotPassword)
router.post('/beforeforgot', beforePassword)
router.post('/register/accountactivation', accountActivation )
router.post('/login', login)
router.post('/afterlogin', after_login)
router.post('/dashboard', dashboard)
router.post('/updateactiveplan', updateStatusEarning)

module.exports = router
