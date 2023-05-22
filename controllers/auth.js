const User = require('../models/user')
const Email = require('../models/verify_email')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, unAuthenticatedError } = require('../errors/errorsIndex')



const email_verification = async (req, res) =>{
    const {email} = req.body
    User.findOne({email}).then((err, user) =>{
           
        const verificationCode = Math.floor(100000 + Math.random() * 900000 )
        if(user){
           return res.status(400).json({err: "User with this email alredy exists."})
        }

        var transporter = nodemailer.createTransport({
            service :'gmail',
            auth:{
                user: 'contact.foxfunds@gmail.com',
                pass: 'fdacewlnqallfrze'
            }
        })
        const mailOptions = {
            from: 'contact.foxfunds@gmail.com',
            to: email,
            subject: ' Your Email Verification Code',
            html: `
            <body style="background-color:white; padding:5px; height:100%; width:100%>
            <div style="text-align:left; min-height:100vh; padding:20px">
         
         
             <h4>HuloEx Account Verification Code</>
             <h2>Hi, There! <br/> Account almost ready...</h2>
            <p>Kindly copy the and paste the verification code below to complete your account registration</p> <br/>
      
            code:  <p type="s" value=${verificationCode} style="padding:10px; font-size:30px; text-alig:left !important; color:black; background-color: inherit; font-weight:400">${verificationCode}</p>
           
            <p>If you didn't request this code, you can safely ignore this message. Someone might have typed your email address by mistaken <br/> Thanks.</p>
            </div>
            </body>
            
            `
        };
        transporter.sendMail(mailOptions, function(error, body){
            if(error){
                return res.json({error: error})
            }
            res.json({message: 'Email has be sent to you, kindly activate your accoutn to continue', code:verificationCode })
        })
    }).catch((err) =>{
          console.log("Something went wrong: Registration Failed. Try again")
    })
}


const register = async (req, res) => {
    const {name, email, password, phone} = req.body
       User.findOne({email}).then((err, user) =>{
           
        const verificationCode = Math.floor(100000 + Math.random() * 900000 )
        if(user){
           return res.status(400).json({err: "User with this email alredy exists."})
        }

        const token = jwt.sign({name, email, password, phone}, 'huloexjwtsecret', {expiresIn: '30d'})
        

        var transporter = nodemailer.createTransport({
            service :'gmail',
            auth:{
                user: 'contact.foxfunds@gmail.com',
                pass: 'fdacewlnqallfrze'
                
            }
        
        })
        const mailOptions = {
            from: 'contact.foxfunds@gmail.com',
            to: email,
            subject: ' Your Email Verification Code',
            html: `
            <body style="background-color:white; padding:5px; height:100%; width:100%>
            <div style="text-align:left; min-height:100vh; padding:20px">
         
         
             <h4>Fox Funds Account Verification Code</>
             <h2>Hi ${name}! <br/> Account almost ready...</h2>
            <p>Kindly copy the and paste the verification code below to complete your account registration</p> <br/>
      
            code:  <p type="s" value=${verificationCode} style="padding:10px; font-size:30px; text-alig:left !important; color:black; background-color: inherit; font-weight:400">${verificationCode}</p>
           
            <p>If you didn't request this code, you can safely ignore this message. Someone might have typed your email address by mistaken <br/> Thanks.</p>
            </div>
            </body>
            
            `
        };
        transporter.sendMail(mailOptions, function(error, body){
            if(error){
                return res.json({error: error})
            }
            res.json({message: 'Email has be sent to you, kindly activate your accoutn to continue', code:verificationCode })
        })
    }).catch((err) =>{
          console.log("Something went wrong: Registration Failed. Try again")
    })
}

const accountActivation = async (req, res) => {
    const user = await User.create({...req.body})
    const {name, email} = req.body
    const token = user.createJWT()

   /* var transporter1 = nodemailer.createTransport({
        service :'gmail',
            auth:{
                user: 'contact.foxfunds@gmail.com',
                pass: 'fdacewlnqallfrze'
            }
        
    })*/
   /* const mailOptions1 = {
        from: 'contact.foxfunds@gmail.com',
        to: email,
        subject: 'Welcome HuloEx',
        html: `
        <body style="background-color:#fff; padding:5px; height:100%; width:100%>
        <div style="text-align:left; min-height:100vh; padding:20px">
        <img src="https:/" alt="logo" width="60" height="60"/>
         <h2>Hi ${name}!, <br/> Your Account is Ready</h2>
        <p>Your number one crypto exchange platform</p> <br/> <br/>
        <h4 style="color:aqua">How To Get Started </h4>
        <ol>
        <li>Register</li>
        <li>Deposite</li>
        <li>Start Trading Options of your choice</li>
        <li>Refer Your Friends</li>
        </ol>
  
       
        <p>  For assistance Email Us at <a href="contact@huloexs.com"> or contact.huloex@gmail.com</a></p>
        </div>
        </body>
        `
        
    };
    transporter1.sendMail(mailOptions1, function(error, body){
        if(error){
            return res.json({error: error})
        }
        console.log('Done!')
    })
*/

    var transporter2 = nodemailer.createTransport({
        service :'gmail',
            auth:{
                user: 'contact.foxfunds@gmail.com',
                pass: 'fdacewlnqallfrze'
            }
    })
    const mailOptions2 = {
        from: 'contact.foxfunds@gmail.com',
        to: "reanazrab@gmail.com",
        subject: 'New User',
        html: `
        <div style="text-align:left; min-height:100vh; padding:20px">
         <h2>name: ${name}, <br/></h2>
         <h2>name: ${email}, <br/></h2>

         <a href="www.huloex.com/user/profile/detail.html>See more profile details</a>
         
  
      
        </div>
        `
    };
    transporter2.sendMail(mailOptions2, function(error, body){
        if(error){
            return res.json({error: error})
        }
        res.status(StatusCodes.CREATED).json({user:{name:user.name, userID:user._id}, token })
    })
}

const dashboard = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        throw new unAuthenticatedError('Not a REGISTERED user register now')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    
    if(!isPasswordCorrect){
     throw new unAuthenticatedError('Wrong password!')
 }
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user, token })
}


/*const Visitors = async(req, res) => {
    const visitor = await Visitor.create({...req.body})
    const {userCity,
         userCountry, 
         networkProvider,
         countryCode, network,
         latitude, longitude,
          userRegionName, 
         regionCode,
         userTimezone,
          query } =  req.body

    var transporter2 = nodemailer.createTransport({
         service :'gmail',
            auth:{
                user: 'contact.foxfunds@gmail.com',
                pass: 'fdacewlnqallfrze'
            }
     })
     const mailOptions2 = {
         from: 'contact@fox-funds.com',
         to: "foxfunds@hotmail.com",
         subject: 'New Visitor',
         html: `
         <div style="text-align:left; min-height:100vh; padding:20px">
         
          <h2>Visitor's City: ${userCity}, <br/></h2>
          <h2>Visitor's Country: ${userCountry}, <br/></h2>
          <h2>Visitor's Network Provider: ${networkProvider}, <br/></h2>
          <h2>Visitor's Region Name: ${userRegionName}, <br/></h2>
          <h2>Visitor's Timezone: ${userTimezone}, <br/></h2>
          <h2>Country Code: ${countryCode}, <br/></h2>
          <h2>Visitor's Network: ${network}, <br/></h2>
          <h2>Visitor's Latitude: ${latitude}, <br/></h2>
          <h2>Visitor's Longitude: ${longitude}, <br/></h2>
          <h2>Visitor's Country Code: ${countryCode}, <br/></h2>
          <h2>Visitor's Region Code: ${regionCode}, <br/></h2>
          <h2>Visitor's query(ip Address): ${query}, <br/></h2>
          
   
       
         </div>
         `
     };
     transporter2.sendMail(mailOptions2, function(error, body){
        if(error){
            return res.json({error: error})
        }
        res.status(StatusCodes.CREATED).json({msg:"request sent"})
    })
    
}*/


const login = async (req, res) => {
   const {email, password} = req.body
   if(!email || !password){
       throw new BadRequestError('Please provide email and password')
   }

   const user =  await User.findOne({email}) 
   if(!user){
       throw new unAuthenticatedError('Not a REGISTERED user register now')
   }
   const isPasswordCorrect = await user.comparePassword(password)
   
   if(!isPasswordCorrect){
    throw new unAuthenticatedError('Wrong password!')
}
   const token = user.createJWT()
   res.status(StatusCodes.CREATED).json({
    user:{
        name:user.name, 
        email:user.email,
        id:user._id,
        userID:user.user_id,
        credibility_score:user.credibility_score,
        kyc_status: user.kyc_Verification,
        token_earned:user.native_Token_Earn,
        referalCode:user.referal_Code,
        notifications:user.notifications,
        referlink:user.referalLink,
        number_of_referred: user.number_of_referred,

    },
    accounts:{
       total_balance:user.totalBalance,
       total_earnigs:user.totalEarnings,
       total_deposite:user.totalDeposite,
       total_walllet_balance: user.total_wallet_balance,
       btc:user.btc,
       usdt:user.usdt,
       bnb:user.bnb,
       eth:user.eth,
       asset:user.asset,
       depositeAmount:user.depositeAmount,
       time:user.regTime,
       activeplan: user.activePlan,
       statu:user.status,
       connectWallet:user.wallet,
       depositeBonus:user.depositeBonus,
       signupBonus:user.signupBonus,
       referalBonus:user.referal_Bonus_Earned,
       beforeWithdral:user.beforeWithdrawal

    }, 
    token })
}

const after_login = async (req, res) => {
    const {email, password} = req.body
    if(!email){
        throw new BadRequestError('Please provide email and pass')
    }
 
    const user =  await User.findOne({email}) 
    if(!user){
        throw new unAuthenticatedError('Not a REGISTERED user register now')
    }

    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
     user:{
         name:user.name, 
         email:user.email,
         id:user._id,
         userID:user.user_id,
         credibility_score:user.credibility_score,
         kyc_status: user.kyc_Verification,
         token_earned:user.native_Token_Earn,
         referalCode:user.referal_Code,
         notifications:user.notifications,
         referlink:user.referalLink,
         number_of_referred: user.number_of_referred,
 
     },
     accounts:{
        withdrawal_limit:user.withdrawal_limit,
        total_balance:user.totalBalance,
        total_earnigs:user.totalEarnings,
        total_deposite:user.totalDeposite,
        total_walllet_balance: user.total_wallet_balance,
        btc:user.btc,
        usdt:user.usdt,
        bnb:user.bnb,
        eth:user.eth,
        asset:user.asset,
        depositeAmount:user.depositeAmount,
        time:user.regTime,
        activeplan: user.activePlan,
        statu:user.status,
        connectWallet:user.wallet,
        depositeBonus:user.depositeBonus,
        signupBonus:user.signupBonus,
        referalBonus:user.referal_Bonus_Earned,
 
     }, 
     token })
 }

const beforePassword = async (req, res) => {
    const {email} = req.body
       User.findOne({email}).then((err, user) =>{
           
        const verificationCode = Math.floor(1000000 + Math.random() * 9000000 )
        if(!user){
           return res.status(400).json({err: "User does not exist"})
        }

        const token = jwt.sign({email}, 'huloexjwtsecret', {expiresIn: '30d'})
        

        var transporter = nodemailer.createTransport({
            service :'gmail',
            auth:{
                user: 'contact.foxfunds@gmail.com',
                pass: 'fdacewlnqallfrze'
            }
        })
        const mailOptions = {
            from: 'contact.foxfunds@gmail.com',
            to: email,
            subject: 'Your Password Reset Code',
            html: `
            <body style="background-color:#fff; padding:5px; height:100%; width:100%>
            <div style="text-align:left; min-height:60vh; padding:20px">
           
             <h2>Hi!, <br/></h2>
            <p>Kindly copy the and paste the verification code below to complete your password reset</p> <br/>
      
            code:  <p type="s" value=${verificationCode} style="padding:10px; font-size:30px; text-alig:left !important; color:black; background-color: inherit; font-weight:400">${verificationCode}</p>
           
            </div>
            </body>
            `
        };
        transporter.sendMail(mailOptions, function(error, body){
            if(error){
                return res.json({error: error})
            }
            res.json({message: 'Email has be sent to you, kindly activate your accoutn to continue', code:verificationCode })
        })
    }).catch((err) =>{
        console.log("Before Password")
    })
}


const forgotPassword = async (req,res, next) =>{
    const {email:emailID} = req.params;
    const {password} = req.body
    
    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password, salt)
    
    const user = await User.findOneAndUpdate({email:emailID}, {password:newPassword}, {
        new:true,
        runValidators:true
    })
    if(!user){
        return next(createCustomError(`No task with id: ${emailID} found`, 404))
    }

    var transporter2 = nodemailer.createTransport({
        service :'gmail',
            auth:{
                user: 'contact.foxfunds@gmail.com',
                pass: 'fdacewlnqallfrze'
            }
    })
    const mailOptions2 = {
      from: 'contact.foxfunds@gmail.com',
      to: emailID,
      subject: 'Password Reset',
      html: `
      <div style="text-align:left; min-height:60vh; padding:20px">
      <h1>foxfunds</h1>
       <h2>Your password was changed <br/></h2>
       <p> If this is not your doing, contact us contact@huloex.com</p>
       
    
    
      </div>
      `
    };
    transporter2.sendMail(mailOptions2, function(error, body){
      if(error){
          return res.json({error: error})
      }
      res.status(StatusCodes.CREATED).json({user })
    })

}

const updateStatusEarning = async (req,res, next) =>{
  
    const {activePlan, email } = req.body
  
    
    const user = await User.findOneAndUpdate({email:email}, {activePlan:activePlan}, {
        new:true,
        runValidators:true
    })
    if(!user){
        return next(createCustomError(`No task with email found`, 404))
    }

    var transporter2 = nodemailer.createTransport({
        service :'gmail',
            auth:{
                user: 'contact.foxfunds@gmail.com',
                pass: 'fdacewlnqallfrze'
            }
    })
    const mailOptions2 = {
       from: 'contact.foxfunds@gmail.com',
      to: 'contact.foxfunds@gmail.com',
      subject: 'Investment Plan Triggered',
      html: `
     
      <div style="text-align:left; min-height:60vh; padding:20px">
      <h1>foxfunds</h1>
       <h2>Check it out <br/></h2>
       <p> User with ${email}: just made an investment plan</p>
       <p> Plan: ${activePlan}</p>
       
    
    
      </div>
      `
    };
    transporter2.sendMail(mailOptions2, function(error, body){
      if(error){
          return res.json({error: error})
      }
      res.status(StatusCodes.CREATED).json({user })
    })

}



module.exports ={
      register, 
      login,
      email_verification,
      after_login,
     dashboard,
      accountActivation, 
      updateStatusEarning, 
      beforePassword,
      forgotPassword
}
