
const express = require('express')
const router = express.Router()
const multer = require('multer')

const {
    getProfileImage,
    uploadProfileImage
} = require('../controllers/profileImages')




router.get('/getmyprofilepicture',  getProfileImage)
router.post('/uploadmyprofilepicture', uploadProfileImage)

module.exports = router