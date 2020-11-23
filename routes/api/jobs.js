const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Company = require("../../models/Company");
const Job = require("../../models/Job");
const Activity = require("../../models/Activity");
// @route POST api/jobs
// @desc  Add Job post (added by HR Recruiter)
// @access private

router.post(
  "/",
  [
    auth,
    [
      check("type", "Job Type is Required!").not().isEmpty(),
      check("jobtitle", "Job Title is Required!").not().isEmpty(),
      check("location", "Job Location is Required!").not().isEmpty(),
      check("description", "Job Description is Required!").not().isEmpty(),
      check("skills", "Job Skills is Required!").not().isEmpty(),
      check("startdate", "Job Start Date is Required!").not().isEmpty(),
      check("isactive", "Job Is Active is Required!").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      type,
      jobtitle,
      location,
      description,
      skills,
      startdate,
      isactive,
    } = req.body;

    // @Build Job Post Object

    const jobPostFields = {};

    if (type) jobPostFields.type = type;
    if (jobtitle) jobPostFields.jobtitle = jobtitle;
    if (location) jobPostFields.location = location;
    if (description) jobPostFields.description = description;
    if (startdate) jobPostFields.startdate = startdate;
    if (isactive) jobPostFields.isactive = isactive;

    if (skills) {
      jobPostFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    try {
      // @ we need user to check if user is an HR recriuter
      let user = await User.findById(req.user.id);
      // @ we need company to insert company field (Job Schema)
      let company = await Company.findOne({ hr_recruiter: req.user.id });
      // @Create new Job Post
      // @check if user is an HR recruiter & company's Hr recruiuter is this user
      if (company) {
        jobPostFields.postedby = req.user.id;
        jobPostFields.company = company._id;
        jobPostFields.companyname = company.name;
        jobPostFields.hr_recruiter = user.name;
        jobPostFields.imagepost = gravatar.url(user.email, {
          s: "200",
          r: "pg",
          d: "mm",
        });
        jobpost = new Job(jobPostFields);
        await jobpost.save();
        return res.json(jobpost);
      } else {
        return res
          .status(401)
          .json({ msg: "You are not authorized to post a job !" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/jobs/job/:id
// @desc  Delete Job post by ID ( deleted by HR Recruiter)
// @access private
router.delete("/job/:id", auth, async (req, res) => {
  try {
    // @ we need company to check if the actual user is an hr recruiter for company (company Schema)
    let company = await Company.findOne({ hr_recruiter: req.user.id });

    if (company) {
      // @we need job to check if job post exists
      let jobPost = await Job.findById(req.params.id);
      // @check if job is posted by this current HR recruiter
      if (jobPost.postedby.toString() === req.user.id) {
        await Job.findByIdAndDelete(req.params.id);
        return res.json("Job Post has been removed !");
      } else if (!jobPost) {
        // @if Job post not found
        return res.status(404).json({ msg: "Job Post Not Found !" });
      } else {
        return res.status(401).json({ msg: "You are not authorized!" });
      }
    } else {
      return res.status(401).json({ msg: "You are not authorized!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/jobs/job/:id
// @desc  Close Job Offer post by ID ( closed by HR Recruiter)
// @access private
router.put("/job/close/:id", auth, async (req, res) => {
  try {
    // @ we need company to check if the actual user is an hr recruiter for company (company Schema)
    let company = await Company.findOne({ hr_recruiter: req.user.id });

    if (company) {
      // @we need job to check if job post exists
      let jobPost = await Job.findById(req.params.id);
      // @check if job is posted by this current HR recruiter
      if (jobPost.postedby.toString() === req.user.id) {
        await Job.findByIdAndUpdate(
          { _id: req.params.id },
          { isactive: false }
        );
        return res.json("Job Post has been Closed !");
      } else if (!jobPost) {
        // @if Job post not found
        return res.status(404).json({ msg: "Job Post Not Found !" });
      } else {
        return res.status(401).json({ msg: "You are not authorized!" });
      }
    } else {
      return res.status(401).json({ msg: "You are not authorized!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/jobs/job/:id
// @desc  Active Job Offer post by ID ( Activate by HR Recruiter)
// @access private
router.put("/job/activate/:id", auth, async (req, res) => {
  try {
    // @ we need company to check if the actual user is an hr recruiter for company (company Schema)
    let company = await Company.findOne({ hr_recruiter: req.user.id });

    if (company) {
      // @we need job to check if job post exists
      let jobPost = await Job.findById(req.params.id);
      // @check if job is posted by this current HR recruiter
      if (jobPost.postedby.toString() === req.user.id) {
        await Job.findByIdAndUpdate({ _id: req.params.id }, { isactive: true });
        return res.json("Job Post has been Activated !");
      } else if (!jobPost) {
        // @if Job post not found
        return res.status(404).json({ msg: "Job Post Not Found !" });
      } else {
        return res.status(401).json({ msg: "You are not authorized!" });
      }
    } else {
      return res.status(401).json({ msg: "You are not authorized!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/jobs/job/:id
// @desc  Get Job Post by ID
// @access private
router.get("/job/:id", auth, async (req, res) => {
  try {
    let jobpost = await Job.find({ _id: req.params.id }).select("-aplieddby");
    if (!jobpost) {
      return res.status(404).json({ msg: "Job Post Not Found !" });
    }
    res.json(jobpost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/jobs/
// @desc  Get all Job Post
// @access private
router.get("/", auth, async (req, res) => {
  try {
    let jobposts = await Job.find();
    if (!jobposts) {
      return res
        .status(404)
        .json({ msg: "There are no Job posts to display !" });
    }
    res.json(jobposts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/jobs/applyjob/:id
// @desc apply job
// @access private
router.put("/applyjob/:id", auth, async (req, res) => {
  try {
    const jobPost = await Job.findById(req.params.id);
    const activity = await Activity.findOne({ user: req.user.id });
    if (
      jobPost.appliedby.filter((offer) => offer.user.toString() === req.user.id)
        .length > 0
    ) {
      return res
        .status(401)
        .json({ msg: "You have been applied this Job post!" });
    }
    const newApp = {
      user: req.user.id,
      name: req.user.name,
      email: req.user.email,
    };
    const newActivity = {
      job: req.params.id,
      company: jobPost.company,
    };
    jobPost.appliedby.unshift(newApp);
    jobPost.save();
    activity.jobs.unshift(newActivity);
    activity.save();
    res.json(jobPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Server");
  }
});

// @route GET api/jobs/:job_id/users
// @desc  Get Job Seekers by Job Post
// @access private
router.get("/:job_id/users", auth, async (req, res) => {
  try {
    let jobPost = await Job.findById({ _id: req.params.job_id });

    if (!jobPost) {
      return res.status(404).json({ msg: "Job Post Not Found !" });
    }

    if (jobPost.postedby.toString() !== req.user.id) {
      return res.status(401).send({ msg: "You are not authorized !" });
    }
    let jobSeekers = await Job.find({ _id: req.params.job_id }).select(
      "appliedby"
    );
    return res.json(jobSeekers);

    // let jobSeekers =await Job.find({_id: req.params.job_id}).select("appliedby")
    // .sort({name: 1})
    // .populate('users')
    // .exec(function(err, docs) {
    //    if(err){
    //     return  res.status(401).send({msg:'You are not authorized !'})
    //    }
    //    return res.json(docs)
    //  })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/jobs/:company_id/jobs
// @desc  Get Job Posts by company
// @access private
router.get("/:company_id/jobposts", auth, async (req, res) => {
  try {
    let jobPosts = await Job.find({ company: req.params.company_id })
      .populate("companies")
      .select("-appliedby");

    if (!jobPosts) {
      return res.status(404).json({ msg: "There is no Job Posts !" });
    }

    return res.json(jobPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/jobs
// @desc  Update Job post (updated by HR Recruiter)
// @access private

router.put("/jobpost/:id", auth, async (req, res) => {
  const {
    type,
    jobtitle,
    location,
    description,
    skills,
    startdate,
    isactive,
  } = req.body;

  // @Build Job Post Object

  const jobPostFields = {};

  if (type) jobPostFields.type = type;
  if (jobtitle) jobPostFields.jobtitle = jobtitle;
  if (location) jobPostFields.location = location;
  if (description) jobPostFields.description = description;
  if (startdate) jobPostFields.startdate = startdate;
  if (isactive) jobPostFields.isactive = isactive;

  if (skills) {
    jobPostFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  try {
    // @ we need company to insert company field (Job Schema)
    let company = await Company.findOne({ hr_recruiter: req.user.id });
    // @Create new Job Post
    // @check if user is an HR recruiter & company's Hr recruiuter is this user
    if (company) {
      let jobPost = await Job.findOne({ _id: req.params.id });
      // @if Job Psts exists the update it
      if (jobPost) {
        jobPost = await Job.findOneAndUpdate(
          { _id: req.params.id },
          { $set: jobPostFields },
          { new: true }
        );
        return res.json(jobPost);
      }
    } else {
      return res
        .status(401)
        .json({ msg: "You are not authorized to update a job !" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
