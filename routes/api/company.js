const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const gravatar = require('gravatar')
const User = require("../../models/User");
const Company = require("../../models/Company");

// @route POST api/company
// @desc  Create or Update CompanyProfile
// @access private

router.post(
  "/",
  [
    auth,
    [
      check("name", "Company name is Required!").not().isEmpty(),
      check("location", "Company location is Required!").not().isEmpty(),
      check("description", "Company desscription is Required!").not().isEmpty(),
      check("website", "Company website is Required!").not().isEmpty(),
      check("created_date", "Company Created date is Required!").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, location, description, website, created_date } = req.body;

    // @Build Company Profile Object

    const companyFields = {};

    if (name) companyFields.name = name;
    if (location) companyFields.location = location;
    if (description) companyFields.description = description;
    if (website) companyFields.website = website;
    if (created_date) companyFields.created_date = created_date;
    companyFields.hr_recruiter = req.user.id;

    try {
      let user = await User.findById(req.user.id);
      let company = await Company.findOne({ hr_recruiter: req.user.id });
      if(user){
        companyFields.logo = gravatar.url(user.email, ({
             s:'200',
             r:'pg',
             d:'mm'}))
        }
      /* @if company exists and profile is an
         HR recruiter then update comapny data*/

      if (user.type === "hrRecruiter" && company) {
        company = await Company.findOneAndUpdate(
          { hr_recruiter: req.user.id },
          { $set: companyFields },
          { new: true }
        );
        return res.json(company);
      } 
      else if (user.type === "hrRecruiter" && !company) {
        // @Create new Company Profile
        company = new Company(companyFields);
        await company.save();
        res.json(company);
      } 
      else {
        return res.status(401).send({msg:'You are not authorized !'});
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/company/:id
// @desc  get CompanyProfile
// @access private

router.get('/:id', auth, async(req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        if(!company){
          return  res.status(404).json({msg:'Company Profile Not Found !'})
        }
        
        res.send(company)
    } catch (error) {
        console.error(error.message)
        if(error.kind === 'ObjectId'){
            return res.status(404).send({ msg:'Company Profile Not Found !'})
          }
        res.status(500).send('Server Error !')

    }
})

// @route GET api/company/
// @desc  get all CompanyProfile
// @access private

router.get('/', auth, async(req, res) => {
    try {
        const company = await Company.find()
        if(!company){
          return  res.status(404).json({msg:'There is no Company profiles!'})
        }
        res.send(company)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error !')

    }
})
module.exports = router;
