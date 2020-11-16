const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route GET api/profile/me
// @desc get current user profile
// @access private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user !" });
    }
    res.json(profile)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/profile
// @desc  Create or Update User Profile
// @access private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is Required!").not().isEmpty(),
      check("skills", "Skills is Required!").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    // @Build Profile Object

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //Build Social Media Object

    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      // @if profile exists the update profile data
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // @Create new Profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/profile
// @desc  Get all profile
// @access public

router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error !");
  }
});

// @route GET api/profile/user/:user_id
// @desc  Get Profile By user ID
// @access public

router.get("/user/:user_id", async (req, res) => {
  let userID = req.params.user_id;
  try {
    const profile = await Profile.findOne({ user: userID }).populate("user", [
      "name",
      "avatar",
    ]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile Not found !" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile Not found !" });
    }
    res.status(500).send("Server Error !");
  }
});

// @route DELETE api/profile
// @desc  remove Profile, User Account & Posts/Job Posts
// @access private

router.delete("/", auth, async (req, res) => {
  try {
    // @remove Profile (User Account, Profile & posts)
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json("User has been removed !");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error !");
  }
});

// @route PUT api/profile/experience
// @desc  Add experience field 
// @access private

router.put('/experience', [auth, [
    check('company', 'Company is Reqiured !').not().isEmpty(),
    check('type', 'Type is Reqiured !').not().isEmpty()
]], async(req, res) =>{
    const errors = validationResult(req)
    let{
     title,
     company,
     location,
     from,
     to,
     current,
     description
    } = req.body

    const newExp ={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
       const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name", "email"]);
       if (profile){
           profile.experience.unshift(newExp)
           await profile.save()
           
          res.json(profile)
       }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route DELETE api/profile/experience/:exp_id
// @desc  Delete experience  
// @access private

router.delete('/experience/:exp_id', auth, async(req, res) =>{
        try {
        const profile = await Profile.findOne({user: req.user.id})
        // @search Index of experience
        const expIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
        // @remove experience from profile
        profile.experience.splice(expIndex,1)
        // @save changes
        await profile.save()

        res.json(profile)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error !')
    }
})

// @route PUT api/profile/education
// @desc  Add education field 
// @access private

router.put('/education', [auth, [
  check('school', 'School is Reqiured !').not().isEmpty(),
  check('degree', 'Degree is Reqiured !').not().isEmpty(),
  check('fieldofstudy', 'Field of Study is Reqiured !').not().isEmpty(),
  check('from', 'Date from is Reqiured !').not().isEmpty()
]], async(req, res) =>{
  const errors = validationResult(req)
  let{
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body

  const newEduc ={
     school,
     degree,
     fieldofstudy,
     from,
     to,
     current,
     description
  }

  try {
     const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name", "email"]);
     if (profile){
         profile.education.unshift(newEduc)
         await profile.save()
         
        res.json(profile)
     }
  } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
  }
})

// @route DELETE api/profile/education/:educ_id
// @desc  Delete experience  
// @access private

router.delete('/education/:educ_id', auth, async(req, res) =>{
      try {
      const profile = await Profile.findOne({user: req.user.id})
      // @search Index of education
      const educIndex = profile.education.map(item => item.id).indexOf(req.params.educ_id)
      // @remove education from profile
      profile.education.splice(educIndex,1)
      // @save changes
      await profile.save()

      res.json(profile)

  } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error !')
  }
})


// @route POST api/profile/experience/exp_id
// @desc  Update an experience
// @access private


 router.put('/experience/:exp_id', auth, async (req, res) =>{
      const newExp = {}
      if (req.body.title) newExp.title = req.body.title;
      if (req.body.company) newExp.company = req.body.company;
      if (req.body.location) newExp.location = req.body.location;
      if (req.body.from) newExp.from = req.body.from;
      if (req.body.to) newExp.to = req.body.to;
      if (req.body.current) newExp.current = req.body.current;
      if (req.body.description) newExp.description = req.body.description;
     let profile =  await Profile.findOne({user: req.user.id})
     let subExperience = profile.experience.id(req.params.exp_id)
     subExperience.set(newExp)
     profile.save().then(function(saveExperience){
          res.send(saveExperience)
        }).catch(function(err){
          res.status(500).send(err)
        })
})

// @route POST api/profile/experience/exp_id
// @desc  Update an experience
// @access private


router.put('/education/:educ_id', auth, async (req, res) =>{
  const newEduc = {}
  if (req.body.school) newEduc.school = req.body.school;
  if (req.body.degree) newEduc.degree = req.body.degree;
  if (req.body.fieldofstudy) newEduc.fieldofstudy = req.body.fieldofstudy;
  if (req.body.from) newEduc.from = req.body.from;
  if (req.body.to) newEduc.to = req.body.to;
  if (req.body.current) newEduc.current = req.body.current;
  if (req.body.description) newEduc.description = req.body.description;
 let profile =  await Profile.findOne({user: req.user.id})
 let subEducatuion = profile.education.id(req.params.educ_id)
 subEducatuion.set(newEduc)
 profile.save().then(function(saveEducation){
      res.send(saveEducation)
    }).catch(function(err){
      res.status(500).send(err)
    })
})

module.exports = router;
