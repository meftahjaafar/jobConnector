const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followingSchema = new Schema({
    userA:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    userB:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    userBname:{
        type: String
    },
    userBavatar:{
        type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  })




module.exports = Following =  mongoose.model('following', followingSchema)