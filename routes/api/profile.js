const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");

//This route will GET api/users and get Current user Profile
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no Profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Create Profile or Update user Profile
router.post(
  "/",
  [
    auth,
    check("phone", "Phone number is Required").not().isEmpty(),
    check("skills", "Skills is Required").not().isEmpty(),
    check("designation", "Desgination is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { phone, address, skills, designation } = req.body;
    //Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (phone) profileFields.phone = phone;
    if (address) profileFields.address = address;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    if (designation) {
      profileFields.designation = designation;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);

        //Create
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@todo get the list of teacher(s) of respective department

// Delete Profile of the user and Delete the User
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
