const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: [true, 'please provide an name'],
    }
})

module.exports = mongoose.model('Email', emailSchema)