const  {BadRequestError}  = require("../errors/errorsIndex")
require('dotenv').config()
const notFoundMiddlewareError =  require('../middleware/notfound')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Orders = require('../models/orders')

const get_orders = async (req, res) => {
  const {email} = req.body
   const order = await Orders.find({email:email}).sort('createdAt')
   res.status(StatusCodes.OK).json({order})
}
const create_orders = async (req, res) => {
   const order = await Orders.create(req.body)
   res.status(StatusCodes.CREATED).json({ order })
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
    get_orders,
    create_orders

 }
