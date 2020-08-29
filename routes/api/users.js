const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

//This route will POST api/users or we can say register user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is Required").isEmail(),
    check("password", "Password is Required").isLength({ min: 8 }),
    check("department", "Department is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, department } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        avatar,
        password,
        department,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //   res.send("User Registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const userDept = await User.findById({
      _id: req.user.id,
    });
    const users = await User.find({
      department: userDept.department,
    });
    if (!users) {
      return res
        .status(400)
        .json({ msg: "There are no Teachers of this Department" });
    }
    res.json(users);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
