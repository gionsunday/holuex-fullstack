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

const WalletSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: [20, "name must not be greater than 20 characters"]
        
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        maxlength: [50, "name must not be greater than 20 characters"]
    },
   
    total_wallet_balance: {
        type: Number,
        default: 0,
        trim: true,
    },
    spot_wallet_balance: {
        type: Number,
        default: 0,
        trim: true,
    },
    contract_wallet_balance: {
        type: Number,
        default: 0,
        trim: true,
    },
    balanceInc: {
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
    
            USDT: {
                type: Number,
                default: 0,
                trim: true,
            },
            BTC: {
                trim: true,
                type: Number,
                default: 0
            },
            BNB: {
                type: Number,
                default: 0,
                trim: true,
            },
            ETH: {
                type: Number,
                default: 0,
                trim: true,
            },
            BCH: {
                type: Number,
                default: 0,
                trim: true,
            },
            BUSD: {
                type: Number,
                default: 0,
                trim: true,
            },
            ADA: {
                type: Number,
                default: 0,
                trim: true,
            }, 
            TRX: {
                type: Number,
                default: 0,
                trim: true,
            },
            SOL: {
                type: Number,
                default: 0,
                trim: true,
            }, 
            AVAX: {
                type: Number,
                default: 0,
                trim: true,
            },
            MATIC: {
                type: Number,
                default: 0,
                trim: true,
            },
            LINK: {
                type: Number,
                default: 0,
                trim: true,
            },
            LEO: {
                type: Number,
                default: 0,
                trim: true,
            },
            ARB: {
                type: Number,
                default: 0,
                trim: true,
            },

            XRP: {
                trim: true,
                type: Number,
                default: 0
            },
            USDC: {
                type: Number,
                default: 0,
                trim: true,
            },
            SHIB: {
                type: Number,
                default: 0,
                trim: true,
            },
    
    
  

}, { timestamps: true })

module.exports = mongoose.model('Wallet', WalletSchema)
