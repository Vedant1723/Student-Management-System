const express = require("express");
const router = express.Router();

//This route will GET api/users
router.get("/", (req, res) => {
  res.send("Students Route");
});

module.exports = router;
