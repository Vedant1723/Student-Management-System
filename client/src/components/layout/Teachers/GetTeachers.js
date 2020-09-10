import React, { Fragment } from "react";
import { useContext } from "react";
import authContext from "../../../context/auth/authContext";
import { useEffect } from "react";
import Spinner from "../Spinner";
import "../Student/CreateStudent.css";
import { Link, useHistory } from "react-router-dom";

const GetTeachers = () => {
  const history = useHistory();
  const AuthContext = useContext(authContext);
  const { loadTeachers, loading, users, isAuthenticated } = AuthContext;
  useEffect(() => {
    loadTeachers();
  }, [loadTeachers]);
  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        <h2>Teacher's Data</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
          </tr>
          {users !== null ? (
            users.map((u) => (
              <tr>
                <td>{u.name}</td>
                <td>{u.department}</td>
                <td>{u.email}</td>
              </tr>
            ))
          ) : (
            <Fragment>
              <h4>No Data Found</h4>
              <Link to="/dashboard" className="button">
                Back to Dashboard
              </Link>
            </Fragment>
          )}
        </table>
      </div>
    </Fragment>
  );
};

export default GetTeachers;
