const fs = require('fs')
const path = require('path')
const multer = require('multer')
const imgModel = require('../models/profileImage')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '/uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage: storage})

const getProfileImage = async (req, res) =>{
    const profileImage = imgModel.find({profileOwner:req.body.profileOwner})
    .then((image, err) =>{
        if(err){console.log("can not find image at the moment")}
        res.json({profileImage, image})
    })
}

const uploadProfileImage = async  (req, res, next) =>{
      upload.single('image')
      var imageDetails = {
        name : req.body.name,
        email: req.body.email,
        description : req.body.description,

        img:{
            data : fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
      }
      const profileImage = await imgModel.create(imageDetails)
      .then((err, item) =>{
        if(err){console.log("Profile upload failed. Pleae try again")}
        res.send(profileImage, item)
      })
}

module.exports = {
    getProfileImage,
    uploadProfileImage
}


