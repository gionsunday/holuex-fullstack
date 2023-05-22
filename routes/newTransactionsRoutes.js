const express = require('express')
const router = express.Router()

const {
    getAllTransactions,
    
    createTransaction,
    
} = require('../controllers/newtransactions')

router.route('/').post(createTransaction)
router.route('/:id').get(getAllTransactions)

module.exports = router