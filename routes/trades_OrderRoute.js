const express = require('express')
const router = express.Router()


const {create_orders, get_orders} = require('../controllers/orders')

const {create_trade, get_trades} = require('../controllers/trade')


router.post('/trades/create', create_trade)
router.post('/trades/get', get_trades)
router.post('/orders/create', create_orders)
router.post('/orders/get', get_orders)


module.exports = router

