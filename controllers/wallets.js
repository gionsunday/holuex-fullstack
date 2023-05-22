const  {BadRequestError}  = require("../errors/errorsIndex")
require('dotenv').config()
const notFoundMiddlewareError =  require('../middleware/notfound')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Wallet = require('../models/wallets')

const get_wallet = async (req, res) => {
  const {email} = req.body
   const wallet = await Wallet.find({email}).sort('createdAt')
   res.status(StatusCodes.OK).json({wallet})
}
const create_wallet = async (req, res) => {
   const wallet = await Wallet.create(req.body)
   res.status(StatusCodes.CREATED).json({ wallet })
 }
 const wallet_update = async (req, res) => {
  const  {email, BTC, ETH, USDT,
    BCH, XRP,SOL, BUSD,LINK, 
    ADA, TRX, SHIB, AVAX, 
    USDC, BNB , spot_wallet_balance, 
    contract_wallet_balance } = req.body
    const wallet = await Wallet.findOneAndUpdate({email:email},{
      spot_wallet_balance:spot_wallet_balance,
      contract_wallet_balance:contract_wallet_balance,
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
    if(!wallet){
        return next(createCustomError(`Spot_Wallet Not found`, 404))
    }
    
    res.status(StatusCodes.CREATED).json({msg: "Spot_Wallet amount Updated", wallet})
  } 

/*const update_wallet = async (res, req) =>{
  const {email, BTC, ETH, USDT,
     BCH, XRP,SOL, BUSD,LINK, 
     ADA, TRX, SHIB, AVAX, 
     USDC, BNB , spot_wallet_balance, 
     contract_wallet_balance } = req.body
  const wallet = await Wallet.findOneAndUpdate({email:email},{
    spot_wallet_balance:spot_wallet_balance,
    contract_wallet_balance:contract_wallet_balance,
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
  
  res.status(StatusCodes.CREATED).json({msg: "Spot_Wallet amount Updated",wallet})
} */
const update_wallet = async (res, req) =>{
  const {email} = req.body
  console.log(email)
}

module.exports = {
    get_wallet,
    create_wallet, 
    wallet_update

 }
