import React, { useContext, useEffect, Fragment } from "react";
import studentContext from "../../../context/student/studentContext";
import Spinner from "../Spinner";
import Edit from "../Assets/edit.png";
import Bin from "../Assets/bin.png";
import "./CreateStudent.css";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import authContext from "../../../context/auth/authContext";

const GetStudents = () => {
  const StudentContext = useContext(studentContext);
  const AuthContext = useContext(authContext);
  const { isAuthenticated } = AuthContext;
  const history = useHistory();
  const {
    getStud,
    loading,
    students,
    removeStud,
    getObj,
    filterStud,
    filterStudents,
  } = StudentContext;
  const [fil, setFil] = useState();
  useEffect(() => {
    if (isAuthenticated) {
      getStud();
    } else {
      history.push("/");
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   filterStud(fil && fil.value);
  // }, [fil]);

  const options = [
    {
      label: "Placed",
      value: "Placed",
    },
    { label: "Unplaced", value: "Unplaced" },
    { label: "All", value: "All" },
  ];

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {students.length > 0 ? (
        <div>
          <div className="row">
            <h2>Student Data</h2>
            <Select
              options={options}
              value={fil}
              className="col s4"
              onChange={(e) => setFil(e)}
            />
            <Link to="/createStudent" className="buttons">
              Add a Student
            </Link>
          </div>
          <table>
            <tr>
              <th>Roll Number</th>
              <th>Batch</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Class</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Placement Status</th>
              <th>Placement Type</th>
              <th>Company Name</th>
              <th>Salary Package</th>
              <th>Father Name</th>
              <th>Father Number</th>
              <th>Mother Name</th>
              <th>Mother Number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {students.map((s) => (
              <tr>
                <td>{s.rollNumber}</td>
                <td>{s.batchYear}</td>
                <td>{s.firstName}</td>
                <td>{s.lastName}</td>
                <td>{s.classOfStudent}</td>
                <td>{s.department}</td>
                <td>{s.phoneNumber}</td>
                <td>{s.email}</td>
                <td>{s.placementStatus}</td>
                <td>
                  {s.placementStatus == "Placed" ? s.typeOfSelection : "---"}
                </td>
                <td>{s.placementStatus == "Placed" ? s.companyName : "---"}</td>
                <td>{s.placementStatus == "Placed" ? s.salaryPkg : "---"}</td>
                <td>{s.fatherName}</td>
                <td>{s.fatherNumber}</td>
                <td>{s.motherName}</td>
                <td>{s.motherNumber}</td>
                <td>{s.address}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div
                      onClick={() => {
                        getObj(s);
                        history.push("/editStudent");
                      }}
                    >
                      <img src={Edit} height="20" width="20"></img>
                    </div>{" "}
                    <div onClick={() => removeStud(s._id)}>
                      <img src={Bin} height="20" width="20"></img>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div className="center-align">
          <h4>No Data Found</h4>
          <Link to="/createStudent" className="button">
            Create Student
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default GetStudents;
