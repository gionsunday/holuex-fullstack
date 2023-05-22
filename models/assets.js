const mongoose = require('mongoose')

const AssetsSchema = new mongoose.Schema({
assetsName:{
        type: String,
        trim:true,
        required: [true, 'please provide type name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    },
    assetSymbol:{
        type: String,
        trim:true,
        required: [true, 'please provide type name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    },
    assetAmount:{
     
        type: Number,
        trim:true,
        required: [true, 'please provide type name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    },  
    assetEquivalentAmount:{
        type: Number,
        trim:true,
        maxlength: [20, "name must not be greater than 20 characters"]
    }, 
    assetMarketCap:{
        type: String,
        enum:['pending', 'completed', 'cancelled' ],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }


}, {timestamps:true})
module.exports = mongoose.model('Assets', AssetsSchema)
