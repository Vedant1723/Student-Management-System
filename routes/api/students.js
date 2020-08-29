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

//This route will  the Updatetudent
router.put(
  "/:id",
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
    console.log(req.params.id);
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
        _id: req.params.id,
      });
      console.log(studentProfile);
      if (studentProfile) {
        //Update
        studentProfile = await Student.findOneAndUpdate(
          { _id: req.params.id },
          { $set: studentFields },
          { new: true }
        );
        return res.json(studentProfile);
      }

      // //Create
      // studentProfile = new Student(studentFields);
      // await studentProfile.save();
      // res.json(studentProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//This Route will Create the Student
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
    console.log(req.params.id);
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
        _id: req.params.id,
      });
      console.log(studentProfile);
      if (studentProfile) {
        //Update
        studentProfile = await Student.findOneAndUpdate(
          { _id: req.params.id },
          { $set: studentFields },
          { new: true }
        );
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
router.delete("/:id", auth, async (req, res) => {
  try {
    await Student.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Student Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
