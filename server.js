require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const nodeMailer = require('nodemailer')

const express= require('express')
const path = require('path')
const app = express()

//middleware
const notFoundMiddleware = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const authenticateUser =  require('./middleware/auth')
const connectDB = require('./db/dbCon')
 
//transporter

/*const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');

const client = new CoinpaprikaAPI();

client.getAllTickers().then(console.log).catch(console.error);*/

//routes
const authRouter =  require('./routes/AuthRoutes')
const trade_order_Router =  require('./routes/trades_OrderRoute')
const addressRouter =  require('./routes/addressRoutes')
const walletRouter =  require('./routes/walletsRoutes')
const profileImageRoutes = require('./routes/profileImage')
const secretWords =  require('./routes/secrets')
const refferal = require('./routes/referral')
const assetsRouter =  require('./routes/assetsRoutes')
const newTransactionsRouter =  require('./routes/newTransactionsRoutes')
app.use('/', express.static(path.join(__dirname,'HuloEx')))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())

app.use('/huloex/auth', authRouter)

app.use('/huloex', walletRouter)
app.use('/huloex/spot', trade_order_Router)
app.use('/huloex', addressRouter)
app.use('/huloex/auth/profile', profileImageRoutes)
app.use('/huloex/secret', secretWords)
/*app.use('/www.fox-funds.com/user/referral', refferal)
app.use('/huloex/transactions', authenticateUser, TransactionsRouter)*/
app.use('/huloex/newtransaction', newTransactionsRouter)
app.use('/huloex/assets', assetsRouter)

//errorhandllers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 8000
const start = async () =>{
    await connectDB(process.env.DB_CONNECTION_STRING)
    try {
        app.listen(port, console.log(`Server is Live at port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()
