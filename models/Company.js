const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const companySchema = new Schema({
    name: {
      type: String,
      required: true,
      unique:true
    },
    location: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true,
        unique:true
    },
    logo: {
        type: String,
        required: true,
        unique:true
    },
    createddate: {
      type: Date,
      required: true
    }
  })




module.exports = Company =  mongoose.model('company', companySchema)