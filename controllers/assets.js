const  {BadRequestError}  = require("../errors/errorsIndex")
require('dotenv').config()
const notFoundMiddlewareError =  require('../middleware/notfound')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Asset = require('../models/assets')

const getAllAssets = async (req, res) => {
   const asset = await Asset.find({createdBy:req.user.userID}).sort('createdAt')
   res.status(StatusCodes.OK).json({asset, count: asset.length})
}
const createAsset = async (req, res) => {
   req.body.createdBy = req.user.userID
   const asset = await Asset.create(req.body)
   res.status(StatusCodes.CREATED).json({ asset })
 }

const updateAssetAmount = async (res, req, next) =>{
  const {asset_Id:assetID} = req.params;
  const {assetAmount} = req.body
  
  
  const user = await Asset.findOneAndUpdate({assetID:assetID}, {assetAmount:assetAmount}, {
      new:true,
      runValidators:true
  })
  if(!user){
      return next(createCustomError(`Asset Not found`, 404))
  }
  
  res.status(StatusCodes.CREATED).json({msg: "Asset amount Updated", user})
} 
 

module.exports = {
     getAllAssets,
     createAsset,
     updateAssetAmount

 }
