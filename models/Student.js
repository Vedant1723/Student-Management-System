const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  rollNumber: {
    type: Number,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  placementStatus: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  // if therer is any other detail u think of u can add it
  //   and check this parent array of object
  parents: [
    {
      father: [
        {
          name: {
            type: String,
          },
          phoneNumber: {
            type: Number,
            maxlength: 10,
          },
          occupation: {
            type: String,
          },
        },
      ],
      mother: [
        {
          name: {
            type: String,
          },
          phoneNumber: {
            type: Number,
            maxlength: 10,
          },
          occupation: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = Student = mongoose.model("students", StudentSchema);
