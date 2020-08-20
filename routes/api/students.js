const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Student = require("../../models/Student");
const User = require("../../models/User");

//This route will GET api/students will get the list of Students of Specific Department by User
router.get("/", auth, async (req, res) => {
  try {
    const userDept = await User.findById({
      _id: req.user.id,
    });
    const students = await Student.find({
      department: userDept.department,
    });
    console.log("USer Deept", req.query.rollNumber);
    console.log("Student Object", req.user);
    if (!students) {
      return res
        .status(400)
        .json({ msg: "There are no Students of this Department" });
    }
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//This route will create the Student
router.post(
  "/",
  [
    auth,
    check("rollNumber", "Roll Number is Required").not().isEmpty(),
    check("firstName", "First Name is Required").not().isEmpty(),
    check("lastName", "Last Name is Required").not().isEmpty(),
    check("classOfStudent", "Class is Required").not().isEmpty(),
    check("department", "Department is Required").not().isEmpty(),
    check("phoneNumber", "Phone Number is Required").not().isEmpty(),
    check("email", "Email is Required").not().isEmpty(),
    check("address", "Address is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      rollNumber,
      firstName,
      lastName,
      classOfStudent,
      department,
      phoneNumber,
      email,
      address,
    } = req.body;
    //Build Student Object
    const studentFields = {};
    if (rollNumber) studentFields.rollNumber = rollNumber;
    if (address) studentFields.address = address;
    if (department) {
      studentFields.department = department;
    }
    if (firstName) studentFields.firstName = firstName;
    if (lastName) studentFields.lastName = lastName;
    if (classOfStudent) studentFields.classOfStudent = classOfStudent;
    if (phoneNumber) studentFields.phoneNumber = phoneNumber;
    if (email) studentFields.email = email;

    try {
      let studentProfile = await Student.findOne({
        rollNumber: req.query.rollNumber,
      });
      let oldStudent = await Student.findOne({
        rollNumber: req.query.rollNumber,
      });
      if (oldStudent != studentProfile) {
        //Update
        studentProfile = await Student.findOneAndUpdate(
          { rollNumber: req.query.rollNumber },
          { $set: studentFields },
          { new: true }
        );
        return res.json(studentProfile);
      }
      if (studentFields === oldStudent) {
        return res.json(studentProfile);
      }
      //Create
      studentProfile = new Student(studentFields);
      await studentProfile.save();
      res.json(studentProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Delete the Student
router.delete("/", auth, async (req, res) => {
  try {
    await Student.findOneAndRemove({ rollNumber: req.query.rollNumber });
    res.json({ msg: "Student Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
