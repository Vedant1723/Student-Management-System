import React, { Fragment } from "react";
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
import GetStudents from "./components/layout/Student/GetStudents";
import EditStudent from "./components/layout/Student/EditStudent";
import GetTeachers from "./components/layout/Teachers/GetTeachers";
import TeacherState from "./context/teacher/TeacherState";
import GetTeacherProfile from "./components/layout/Teachers/GetTeacherProfile";
import { CreateTeacherProfile } from "./components/layout/Teachers/CreateTeacherProfile";
import { EditTeacherProfile } from "./components/layout/Teachers/EditTeacherProfile";

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
      <TeacherState>
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
              <Route path="/getProfile" component={GetTeacherProfile} />
              <Route path="/createProfile" component={CreateTeacherProfile} />
              <Route path="/editProfile" component={EditTeacherProfile} />
            </Fragment>
          </Router>
        </StudentState>
      </TeacherState>
    </AuthState>
  );
}

export default App;
