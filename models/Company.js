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
    created_date: {
      type: Date,
      required: true
    },
    hr_recruiter:{
      type: Schema.Types.ObjectId,
      ref: 'user'
  }
  })




module.exports = Company =  mongoose.model('company', companySchema)