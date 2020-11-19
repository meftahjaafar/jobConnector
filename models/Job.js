const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  postedby: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  createddate: {
    type: Date,
    default: Date.now,
  },
  begindate: {
    type: Date,
    required: true,
  },
  imagepost: {
    type: String,
  },
  isactive: {
    type: Boolean,
    default: true,
    required: true,
  },
  aplieddby: [
    {
      user: {
       type: Schema.Types.ObjectId,
       ref: "user" 
      },
      createddate: {
        type: Date,
        default: Date.now,
      }
    }
  ]
});

module.exports = Job = mongoose.model("job", jobSchema);
