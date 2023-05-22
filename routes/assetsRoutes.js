const express = require('express')
const router = express.Router()

const {
    getAllAssets,
    
    createAsset,
    updateAssetAmount
    
} = require('../controllers/assets')

router.route('/').get(getAllAssets).post(createAsset).patch(updateAssetAmount)

module.exports = router