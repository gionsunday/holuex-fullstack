const  {BadRequestError}  = require("../errors/errorsIndex")
require('dotenv').config()
const notFoundMiddlewareError =  require('../middleware/notfound')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Contract_Wallet = require('../models/contract_wallet')

const get_contract_wallet = async (req, res) => {
  const {email} = req.body
   const contract_wallet = await Contract_Wallet.find({email:email}).sort('createdAt')
   res.status(StatusCodes.OK).json({contract_wallet})
}
const create_contract_wallet = async (req, res) => {

   const contract_wallet = await Contract_Wallet.create(req.body)
   res.status(StatusCodes.CREATED).json({ contract_wallet })
 }

 const contract_wallet_update = async (req, res) => {
  const  {email, BTC, ETH, USDT,
    BCH, XRP,SOL, BUSD,LINK, 
    ADA, TRX, SHIB, AVAX, 
    USDC, BNB, contract_wallet_balance } = req.body
    const contract_wallet = await Contract_Wallet.findOneAndUpdate({email:email},{
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
    if(!contract_wallet){
        return next(createCustomError(`contract_Wallet Not found`, 404))
    }
    
    res.status(StatusCodes.CREATED).json({msg: "contract_Wallet amount Updated", contract_wallet})
  } 

const update_contract_wallet = async (res, req, next) =>{
  const {email, BTC, ETH, USDT, BNB , BCH, XRP, AVAX, USDC, BUSD, SOL,LINK,ADA, TRX, SHIB } = req.body;

  const contract_wallet = await contract_Wallet.findOneAndUpdate({email:email},{
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
      return next(createCustomError(`contract_Wallet Not found`, 404))
  }
  
  res.status(StatusCodes.CREATED).json({msg: "contract_Wallet amount Updated",contract_wallet})
} 
 

module.exports = {
    get_contract_wallet,
    create_contract_wallet, 
    contract_wallet_update,
    update_contract_wallet

 }
