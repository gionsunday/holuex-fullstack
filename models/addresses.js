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

const Address_Schema = new mongoose.Schema({
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

    USDT_TRC20: {
        type: String,
        trim: true,
        default: "TRCDJKKOKSDFBIEWROJPOJASXBDQWIWERJBQA",
    },
    USDT_ERC20: {
        type: String,
        trim: true,
        default: "ERCGFK[SD0IJKFJGUIWERJCBIOHXOHHWTAHOHFEQWHD"

    },
    USDT_BTC: {

        type: String,
        trim: true,
        default: "BTCHDNBJHAIOSJDQND;[DWEDQWHIUYYSNDPDOJew",
    },
    USDT_BEP20: {
        type: String,
        trim: true,
        default: "BNBCHSDOPDQ[WDAKPPKFKEWFJHIYEW;U9UWQL"
    },

    BTC_TRC20: {
        type: String,
        trim: true,
        default: "TRCDJKKOKSDFBIEWROJPOJASXBDQWIWERJBQA",
    },
    BTC_ERC20: {
        type: String,
        trim: true,
        default: "ERCGFK[SD0IJKFJGUIWERJCBIOHXOHHWTAHOHFEQWHD"

    },
    BTC_BTC: {

        type: String,
        trim: true,
        default: "BTCHDNBJHAIOSJDQND;[DWEDQWHIUYYSNDPDOJew",
    },
    BTC_BEP20: {
        type: String,
        trim: true,
        default: "BNBCHSDOPDQ[WDAKPPKFKEWFJHIYEW;U9UWQL"
    },
    ETH_TRC20: {
        type: String,
        trim: true,
        default: "TRCDJKKOKSDFBIEWROJPOJASXBDQWIWERJBQA",
    },
    ETH_ERC20: {
        type: String,
        trim: true,
        default: "ERCGFK[SD0IJKFJGUIWERJCBIOHXOHHWTAHOHFEQWHD"

    },
    ETH_BTC: {

        type: String,
        trim: true,
        default: "BTCHDNBJHAIOSJDQND;[DWEDQWHIUYYSNDPDOJew",
    },
    ETH_BEP20: {
        type: String,
        trim: true,
        default: "BNBCHSDOPDQ[WDAKPPKFKEWFJHIYEW;U9UWQL"
    },
    BNB_TRC20: {
        type: String,
        trim: true,
        default: "TRCDJKKOKSDFBIEWROJPOJASXBDQWIWERJBQA",
    },
    BNB_ERC20: {
        type: String,
        trim: true,
        default: "ERCGFK[SD0IJKFJGUIWERJCBIOHXOHHWTAHOHFEQWHD"

    },
    BNB_BTC: {

        type: String,
        trim: true,
        default: "BTCHDNBJHAIOSJDQND;[DWEDQWHIUYYSNDPDOJew",
    },
    BNB_BEP20: {
        type: String,
        trim: true,
        default: "BNBCHSDOPDQ[WDAKPPKFKEWFJHIYEW;U9UWQL"
    }


}, { timestamps: true })

module.exports = mongoose.model('Address', Address_Schema)
