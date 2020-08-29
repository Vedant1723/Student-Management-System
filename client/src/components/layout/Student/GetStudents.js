import React, { useContext, useEffect, Fragment } from "react";
import studentContext from "../../../context/student/studentContext";
import Spinner from "../Spinner";
import Edit from "../Assets/edit.png";
import Bin from "../Assets/bin.png";
import "./CreateStudent.css";
import { Link, useHistory } from "react-router-dom";

const GetStudents = () => {
  const StudentContext = useContext(studentContext);
  const history = useHistory();
  const { getStud, loading, students, removeStud, getObj } = StudentContext;
  useEffect(() => {
    getStud();
  }, [getStud]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        <h2>Student Data</h2>
        <table>
          <tr>
            <th>Roll Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Class</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
          {students.length > 0 ? (
            students.map((s) => (
              <tr>
                <td>{s.rollNumber}</td>
                <td>{s.firstName}</td>
                <td>{s.lastName}</td>
                <td>{s.classOfStudent}</td>
                <td>{s.department}</td>
                <td>{s.phoneNumber}</td>
                <td>{s.email}</td>
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
            ))
          ) : (
            <Fragment>
              <h4>No Data Found</h4>
              <Link to="/createStudent" className="button">
                Create Student
              </Link>
            </Fragment>
          )}
        </table>
      </div>
    </Fragment>
  );
};

export default GetStudents;
