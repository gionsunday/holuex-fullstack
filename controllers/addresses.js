
const {StatusCodes} = require('http-status-codes')
const Address = require('../models/addresses')

const get_address = async (req, res) =>{
    const {email} = req.body
    const address = await Address.find({email:email})
    res.status(StatusCodes.OK).json({address})
}
const create_address = async (req, res) => {

    const address = await Address.create(req.body)
    res.status(StatusCodes.CREATED).json({address})
  }

  module.exports = {
    create_address,
    get_address

 }