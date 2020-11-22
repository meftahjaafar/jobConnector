const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    userA:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [
      {
        post: {
            type: Schema.Types.ObjectId,
            ref: 'post'
        },
        userB:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    likes: [
        {
          post: {
              type: Schema.Types.ObjectId,
              ref: 'post'
          },
          userB:{
              type: Schema.Types.ObjectId,
              ref: 'user'
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
    ],
      jobs: [
        {
          job: {
              type: Schema.Types.ObjectId,
              ref: 'job'
          },
          company:{
              type: Schema.Types.ObjectId,
              ref: 'company'
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
    ]
  })




module.exports = Activity =  mongoose.model('activity', activitySchema)