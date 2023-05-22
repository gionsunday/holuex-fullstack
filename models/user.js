const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


var neString = ""
var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
var string_length = 16
var randomstring = ""
for (let i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length)
    randomstring += chars.substring(rnum, rnum + 1)
    if (randomstring.length === 16) {

        neString = randomstring
    }


}

const verificationCode = Math.floor(100000 + Math.random() * 900000)

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'please provide an name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'please provide an email'],
        maxlength: [50, "name must not be greater than 20 characters"]
    },
    phone: {
        type: String,
        trim: true,
        maxlength: [50, "name must not be greater than 20 characters"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'please provide an password'],
    },
    kyc_Verification: {
        type: String,
        trim: true,
        default: 'Not Verified'
    },
   user_id: {
        type: String,
        trim: true,
        default: 'anonymous'
    },

    native_Token_Earn: {
        type: Number,
        trim: true,
        default: 0
    },

    credibility_score: {
        type: Number,
        default: 0,
        trim: true,
    },
   
    totalEarnings: {
        type: Number,
        default: 0,
        trim: true,
    },
    totalDeposite: {
        type: Number,
        default: 0,
        trim: true,
    },
    btc: {
        type: Number,
        default: 0,
        trim: true,
    },
    usdt: {
        trim: true,
        type: Number,
        default: 0
    },
    bnb: {
        type: Number,
        default: 0,
        trim: true,
    },
    eth: {
        type: Number,
        default: 0,
        trim: true,
    },
    depositeBonus: {
        type: Number,
        default: 0,
        trim: true,
    },
    referalBonus: {
        type: Number,
        default: 0,
        trim: true,
    },
    signupBonus: {
        type: Number,
        default: 10,
        trim: true,
    },
    withdrawal_limit: {
        type: Number,
        default: 0,
        trim: true,
    },
    beforeWithdraw: {
        type: Number,
        default: 0,
        trim: true,
    },
    asset: {
        type: String,
        default: "USDT",

    },

    total_wallet_balance: {
        type: Number,
        default: 0
    },
    
    number_of_referred:{
        type: Number,
        default : 0
    },
    referal_Bonus_Earned:{
        type: Number,
        default: 0
    },
    referal_Code: {
        type: String,
        default: neString
    },
    referalLink: {
        type: String,
        default: `https://huloex.onrender.com/www.huloex.com/user/referral/reffered/${verificationCode}queryVC=${neString}`
    },
    referee: {
        type: String,
        default: `None One`
    },
    notifications: {
        type: Array,
        default: ["Hi There! Welcome to HuloEx. The best exchange platform for you."]
    }

}, { timestamps: true })

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})
UserSchema.pre('save', async function () {
    const id = this._id
    const userID =  id.toString();
    this.user_id = userID.slice(12,50);

})


UserSchema.methods.createJWT = function () {
    return jwt.sign({ userID: this._id, name: this.name, email:this.enail }, 'huloexjwtsecret', { expiresIn: '30d' })
}


UserSchema.methods.comparePassword = async function (candidatesPassword) {
    const isMatch = await bcrypt.compare(candidatesPassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)
