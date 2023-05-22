const mongoose = require('mongoose')

const profileImageSchema = new mongoose.Schema({
    name: {
        type:String,
        default: "profile"
    },
    description :{
        type:String,
        default: "profile picture"

    },
    img:{
        data : Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('imgModel', profileImageSchema)