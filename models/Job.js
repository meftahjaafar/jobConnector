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
  companyname: {
    type: String
  },
  hr_recruiter: {
    type: String
  },
  type: {
    type: String,
    required: true,
  },
  jobtitle: {
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
  startdate: {
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
  appliedby: [
    {
      user: {
       type: Schema.Types.ObjectId,
       ref: "users" 
      },
      applied_date: {
        type: Date,
        default: Date.now
      },
      name: {
        type: String
      },
      email: {
        type: String
      }
    }
  ]
});

module.exports = Job = mongoose.model("job", jobSchema);
