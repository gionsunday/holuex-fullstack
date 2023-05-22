const express = require('express')
const router = express.Router()


const {create_address, get_address } = require('../controllers/addresses')


router.post('/address/create', create_address)

router.post('/address/get', get_address)


module.exports = router

