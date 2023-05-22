const  {BadRequestError}  = require("../errors/errorsIndex")
require('dotenv').config()
const notFoundMiddlewareError =  require('../middleware/notfound')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Trades = require('../models/trades')

const get_trades = async (req, res) => {
  const {email} = req.body
   const trade = await Trades.find({email:email}).sort('createdAt')
   res.status(StatusCodes.OK).json({trade})
}
const create_trade= async (req, res) => {

   const trade = await Trades.create(req.body)
   res.status(StatusCodes.CREATED).json({ trade })
 }

 /*const trade_update = async (req, res) => {
  const  {size, price } = req.body
    const trade = await Trades.findOneAndUpdate({email:email},{
        size:size,
        price:price
    }
    ,{
        new:true,
        runValidators:true
    })
    if(trade){
        return next(createCustomError(`Spot_Wallet Not found`, 404))
    }
    
    res.status(StatusCodes.CREATED).json({msg: "Spot_Wallet amount Updated", spot_wallet})
  } */

 

module.exports = {
    get_trades,
    create_trade

 }
