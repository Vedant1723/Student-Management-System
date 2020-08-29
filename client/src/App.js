import React, { Fragment, useEffect, useContext } from "react";
import Toolbar from "./components/layout/Toolbar";
import "./App.css";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/layout/Login";
import Signup from "./components/layout/Signup";
import Dashboard from "./components/layout/Dashboard/Dashboard";
import AuthState from "./context/auth/AuthState";
import CreateStudent from "./components/layout/Student/CreateStudent";
import StudentState from "./context/student/StudentState";
import authContext from "./context/auth/authContext";
import GetStudents from "./components/layout/Student/GetStudents";
import EditStudent from "./components/layout/Student/EditStudent";
import GetTeachers from "./components/layout/Teachers/GetTeachers";

function App() {
  // const AuthContext = useContext(authContext);
  // const { loadUser, isAuthenticated } = AuthContext;
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     loadUser();
  //   }
  // });
  return (
    <AuthState>
      <StudentState>
        <Router>
          <Fragment>
            <Toolbar />
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/createStudent" component={CreateStudent} />
            <Route path="/getStudents" component={GetStudents} />
            <Route path="/editStudent" component={EditStudent} />
            <Route path="/getTeachers" component={GetTeachers} />
          </Fragment>
        </Router>
      </StudentState>
    </AuthState>
  );
}

export default App;
