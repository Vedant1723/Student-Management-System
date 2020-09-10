import React, { useContext, Fragment } from "react";
import authContext from "../../../context/auth/authContext";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import studentContext from "../../../context/student/studentContext";
import "./CreateStudent.css";
import { useEffect } from "react";
import Select from "react-select";

const EditStudent = () => {
  const AuthContext = useContext(authContext);
  const history = useHistory();
  const { user, isAuthenticated } = AuthContext;
  const StudentContext = useContext(studentContext);
  const { updateStud, student } = StudentContext;
  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);
  const options = [
    {
      label: "Placed",
      value: "Placed",
    },
    {
      label: "Unplaced",
      value: "Unplaced",
    },
  ];

  const [roll, setRoll] = useState(student.rollNumber);
  const [fName, setfName] = useState(student.firstName);
  const [lName, setlName] = useState(student.lastName);
  const [classStud, setclassStud] = useState(student.classOfStudent);
  const [dept, setdept] = useState(student.department);
  const [mobile, setmobile] = useState(student.phoneNumber);
  const [emailID, setemailID] = useState(student.email);
  const [location, setlocation] = useState(student.address);
  const [placement, setPlacement] = useState(student.placementStatus);
  const [placementType, setPlacementType] = useState(
    student.typeOfSelection ? student.typeOfSelection : "---"
  );
  const [batch, setBatch] = useState(student.batchYear);
  const [salary, setSalary] = useState(
    student.salaryPkg ? student.salaryPkg : "---"
  );
  const [company, setCompany] = useState(
    student.companyName ? student.companyName : "---"
  );
  const [father, setFather] = useState(student.fatherName);
  const [fatherNo, setFatherNo] = useState(student.fatherNumber);
  const [mother, setMother] = useState(student.motherName);
  const [motherNo, setMotherNo] = useState(student.motherNumber);

  const sample = () => {
    const data = {
      rollNumber: roll,
      firstName: fName,
      lastName: lName,
      classOfStudent: classStud,
      department: dept,
      phoneNumber: mobile,
      email: emailID,
      address: location,
      placementStatus: placement,
      typeOfSelection: placementType,
      batchYear: batch,
      companyName: company,
      salaryPkg: salary,
      fatherName: father,
      fatherNumber: fatherNo,
      motherName: mother,
      motherNumber: motherNo,
    };
    console.log(data);
    updateStud(student._id, data);
    alert(`Student ${fName} Updated!`);
    history.push("/dashboard");
  };
  return (
    <Fragment>
      {student != null ? (
        <div class="row">
          <h2>Edit Student</h2>
          <form class="col s12">
            <div class="row">
              <div class="input-field col s5">
                <input
                  id="first_name"
                  type="text"
                  class="validate"
                  value={fName}
                  onChange={(e) => {
                    setfName(e.target.value);
                  }}
                />
                <label for="first_name">First Name</label>
              </div>
              <div class="input-field col s5">
                <input
                  id="last_name"
                  type="text"
                  class="validate"
                  value={lName}
                  onChange={(e) => {
                    setlName(e.target.value);
                  }}
                />
                <label for="last_name">Last Name</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s5">
                <input
                  id="roll"
                  type="number"
                  class="validate"
                  value={roll}
                  onChange={(e) => {
                    setRoll(e.target.value);
                  }}
                />
                <label for="roll">Roll Number</label>
              </div>

              <div class="input-field col s5">
                <input
                  id="classOfStudent"
                  type="text"
                  class="validate"
                  value={classStud}
                  onChange={(e) => {
                    setclassStud(e.target.value);
                  }}
                />
                <label for="classOfStudent">Class</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s4">
                <input
                  id="email"
                  type="email"
                  class="validate"
                  value={emailID}
                  onChange={(e) => {
                    setemailID(e.target.value);
                  }}
                />
                <label for="email">Email</label>
              </div>

              <div className="input-field col s4">
                <input
                  disabled
                  id="dept"
                  type="text"
                  value={user.department}
                  class="validate"
                />
              </div>
              <div className="input-field col s4">
                <Select
                  placeholder="Placement Status"
                  options={options}
                  value={placement}
                  onChange={(e) => {
                    setPlacement(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s5">
                <input
                  type="number"
                  id="phone"
                  className="validate"
                  value={mobile}
                  onChange={(e) => {
                    setmobile(e.target.value);
                  }}
                />
                <label for="phone">Phone</label>
              </div>
              <div class="input-field col s5">
                <input
                  id="address"
                  type="text"
                  class="validate"
                  value={location}
                  onChange={(e) => {
                    setlocation(e.target.value);
                  }}
                />
                <label for="address">Address</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s5">
                <input
                  type="text"
                  id="batch"
                  className="validate"
                  value={batch}
                  onChange={(e) => {
                    setBatch(e.target.value);
                  }}
                />
                <label for="batch">Batch</label>
              </div>
              <div class="input-field col s5">
                <input
                  id="placementType"
                  type="text"
                  class="validate"
                  value={placementType}
                  onChange={(e) => {
                    setPlacementType(e.target.value);
                  }}
                />
                <label for="placementType">Placement Type</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s5">
                <input
                  type="text"
                  id="company"
                  className="validate"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />
                <label for="company">Company Name</label>
              </div>
              <div class="input-field col s5">
                <input
                  id="salary"
                  type="text"
                  class="validate"
                  value={salary}
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                />
                <label for="salary">Salary</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s5">
                <input
                  type="text"
                  id="fatherName"
                  className="validate"
                  value={father}
                  onChange={(e) => {
                    setFather(e.target.value);
                  }}
                />
                <label for="fatherName">Father Name</label>
              </div>
              <div class="input-field col s5">
                <input
                  id="fatherNumber"
                  type="text"
                  class="validate"
                  value={fatherNo}
                  onChange={(e) => {
                    setFatherNo(e.target.value);
                  }}
                />
                <label for="fatherNumber">Father Number</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s5">
                <input
                  type="text"
                  id="motherName"
                  className="validate"
                  value={mother}
                  onChange={(e) => {
                    setMother(e.target.value);
                  }}
                />
                <label for="motherName">Mother Name</label>
              </div>
              <div class="input-field col s5">
                <input
                  id="motherNumber"
                  type="text"
                  class="validate"
                  value={motherNo}
                  onChange={(e) => {
                    setMotherNo(e.target.value);
                  }}
                />
                <label for="motherNumber">Mother Number</label>
              </div>
            </div>
          </form>
          <button
            className="buttons"
            onClick={() => {
              sample();
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          You are Logged Out{" "}
          <Link to="/login" className="buttons">
            Please Login
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default EditStudent;
