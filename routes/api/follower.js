const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Follower = require("../../models/Follower");
const Following = require("../../models/Following");

// @route POST api/followers/follow/:id
// @desc  Follow Person
// @access private
router.post("/follow/:id", auth, async (req, res) => {
  try {
    const isfollowed = await Follower.findOne(
      { userB: req.params.id },
      { userA: req.user.id }
    ).populate("users");
    const user = await User.findById(req.params.id);
    if (isfollowed) {
      return res.status(401).json({ msg: "Profile is followed" });
    }

    //@ Add new person(userB) to the follower list (userA)
    let newFollower = {
      userA: req.user.id,
      userB: req.params.id,
      userBname: user.name,
      userBavatar: user.avatar,
    };
    //@ Add new person(userA) to the following list (userB)
    let newFollowing = {
      userA: user._id,
      userB: req.user.id,
      userBname: req.user.name,
      userBavatar: req.user.avatar,
    };
    //@ save new follower
    let newfollow = new Follower(newFollower);
    let newfollowing = new Following(newFollowing);
    await newfollow.save();
    //@save new following
    await newfollowing.save();
    return res.json(newFollower);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/followers/unfollow/:id
// @desc  Unfollow Person
// @access private
router.delete("/unfollow/:id", auth, async (req, res) => {
  try {
    const follower = await Follower.findOne(
      { userA: req.user.id },
      { userB: req.params.id }
    );
    const following = await Following.findOne(
      { userA: req.params.id },
      { userB: req.user.id }
    );

    if (!follower || !following) {
      return res.status(404).json({ msg: "Profile followed is not find" });
    }
    await Follower.findByIdAndDelete(follower._id);
    await Following.findByIdAndDelete(following._id);
    res.json("You have unfollowed this person with success !");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route Get api/followers
// @desc  Get followers list
// @access private
router.get("/", auth, async (req, res) => {
  try {
    const followers = await Follower.find({ userA: req.user.id });
    if (!followers) {
      res.status(404).json({ msg: "Followers list error !" });
    }
    res.json(followers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route Get api/followers/followings
// @desc  Get followings list
// @access private
router.get("/followings", auth, async (req, res) => {
    try {
      const followings = await Following.find({ userA: req.user.id });
      if (!followings) {
        res.status(501).json({ msg: "Followers list error !" });
      }
      res.json(followings);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
