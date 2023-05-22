const  {BadRequestError}  = require("../errors/errorsIndex")
require('dotenv').config()
const nodemailer =require('nodemailer')
const notFoundMiddlewareError =  require('../middleware/notfound')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const newTransaction = require('../models/newTransactions')

const getAllTransactions = async (req, res) => {
   const newtransactions = await newTransaction.find({createdBy:req.params.id}).sort()
   res.status(StatusCodes.OK).json({newtransactions, count: newtransactions.length})
}

 const createTransaction = async (req, res) => {
  
   const newtransaction = await newTransaction.create(req.body)
   const {transactionType, asset, amount, createdBy, wallet} = req.body
   res.status(StatusCodes.CREATED).json({ newtransaction })

   var transporter2 = nodemailer.createTransport({
           service :'gmail',
             auth:{
                user: 'contact.foxfunds@gmail.com',
                pass: 'fdacewlnqallfrze'
            }
})
const mailOptions2 = {
  from: 'contact.foxfunds@gmail.com',
  to: "contact.foxfunds@gmail.com",
  subject: 'New Transaction Alert',
  html: `
  <div style="text-align:left; min-height:60vh; padding:20px">
  
   <h2>Type: ${transactionType} <br/></h2>
   <h2>Amount: ${amount} <br/></h2>
   <h2>Asset: ${asset} <br/></h2>
   <h2>Wallet Address: ${wallet} <br/></h2>
   <h2>UserID: ${createdBy} <br/></h2>
   


  </div>
  `
};
transporter2.sendMail(mailOptions2, function(error, body){
  if(error){
      return res.json({error: error})
  }
  res.status(StatusCodes.CREATED).json({newtransaction })
})

 }

 
 
 
 module.exports = {
     getAllTransactions,
     createTransaction

 }
