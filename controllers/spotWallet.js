const  {BadRequestError}  = require("../errors/errorsIndex")
require('dotenv').config()
const notFoundMiddlewareError =  require('../middleware/notfound')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Spot_Wallet = require('../models/spot_wallet')

const get_spot_wallet = async (req, res) => {
  const {email} = req.body
   const spot_wallet = await Spot_Wallet.find({email:email}).sort('createdAt')
   res.status(StatusCodes.OK).json({spot_wallet})
}
const create_spot_wallet = async (req, res) => {

   const spot_wallet = await Spot_Wallet.create(req.body)
   res.status(StatusCodes.CREATED).json({ spot_wallet })
 }

 const spot_wallet_update = async (req, res) => {
  const  {email, BTC, ETH, USDT,
    BCH, XRP,SOL, BUSD,LINK, 
    ADA, TRX, SHIB, AVAX, 
    USDC, BNB , spot_wallet_balance, 
    contract_wallet_balance } = req.body
    const spot_wallet = await Spot_Wallet.findOneAndUpdate({email:email},{
      spot_wallet_balance:spot_wallet_balance,
      BTC:BTC,
      ETH:ETH,
      USDT:USDT,
      BCH:BCH,
      XRP:XRP,
      SOL:SOL,
      BUSD:BUSD,
      LINK:LINK,
      ADA:ADA,
      TRX:TRX,
      SHIB:SHIB,
      AVAX:AVAX,
      USDC:USDC,
      BNB:BNB
      
    } ,{
        new:true,
        runValidators:true
    })
    if(!spot_wallet){
        return next(createCustomError(`Spot_Wallet Not found`, 404))
    }
    
    res.status(StatusCodes.CREATED).json({msg: "Spot_Wallet amount Updated", spot_wallet})
  } 

const update_spot_wallet = async (res, req, next) =>{
  const {email, BTC, ETH, USDT, BNB , BCH, XRP, AVAX, USDC, BUSD, SOL,LINK,ADA, TRX, SHIB } = req.body;

  const spot_wallet = await Spot_Wallet.findOneAndUpdate({email:email},{
    BTC:BTC,
    ETH:ETH,
    USDT:USDT,
    BCH:BCH,
    XRP:XRP,
    SOL:SOL,
    BUSD:BUSD,
    LINK:LINK,
    ADA:ADA,
    TRX:TRX,
    SHIB:SHIB,
    AVAX:AVAX,
    USDC:USDC,
    BNB:BNB
    
  } ,{
      new:true,
      runValidators:true
  })
  if(!user){
      return next(createCustomError(`Spot_Wallet Not found`, 404))
  }
  
  res.status(StatusCodes.CREATED).json({msg: "Spot_Wallet amount Updated",spot_wallet})
} 
 

module.exports = {
    get_spot_wallet,
    create_spot_wallet, 
    spot_wallet_update,
    update_spot_wallet

 }
