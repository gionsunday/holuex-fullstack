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

const Orders_Schema = new mongoose.Schema({
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

    USDT: {
        type: String,
        trim: true,
        required: true
    },
    BTC: {
        trim: true,
        type: Number,
        default: 0,
        required: true
    }



}, { timestamps: true })

module.exports = mongoose.model('Orders', Orders_Schema)
