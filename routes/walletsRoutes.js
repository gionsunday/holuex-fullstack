const express = require('express')
const router = express.Router()

const {
    get_spot_wallet, 
    create_spot_wallet, 
    update_spot_wallet,
spot_wallet_update } = require('../controllers/spotWallet')
    
const {
    get_contract_wallet, 
    create_contract_wallet, 
    update_contract_wallet,
contract_wallet_update } = require('../controllers/contractWallet')

    
const {
    get_wallet, 
    create_wallet, 
    wallet_update } = require('../controllers/wallets')

//router.post('/wallet/update', update_wallet)
router.post('/wallet/update/wallet', wallet_update)
router.post('/wallet/create', create_wallet)
router.post('/wallet/get', get_wallet)

//router.patch('/wallet/spot/update', update_spot_wallet)
router.post('/wallet/spot/update', spot_wallet_update)
router.post('/wallet/spot/create', create_spot_wallet)
router.post('/wallet/spot/get', get_spot_wallet)

router.post('/wallet/contract/update', contract_wallet_update)
router.post('/wallet/contract/create', create_contract_wallet)
router.post('/wallet/contract/get', get_contract_wallet)

module.exports = router
