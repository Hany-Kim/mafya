import React from "react";
import EnterCamera from "./features/webcam/enterCamera";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import studentForm from "./features/Admin/studentForm/studentForm";
import MainPage from "./features/Admin/mainPage/mainPage";
import LoginPage from "./features/login/loginPage";
import StudentMainPage from "./features/student/studentMainPage";
import ExitCamera from "./features/webcam/exitCamera";
import "./App.module.css";
import PublicRoute from "./common/router/PublicRouter";
import PrivateRoute from "./common/router/PrivateRouter";
import AdminRoute from "./common/router/AdminRouter";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "./common/api";
import WomanNormalEnter from "./features/webcam/womanNormalEnter";
import WomanAbnormalEnter from "./features/webcam/womanAbnormalEnter";
import WomanAbsentEnter from "./features/webcam/womanAbsentEnter.js";
import ManNormalEnter from "./features/webcam/manNormalEnter";
import ManAbnormalEnter from "./features/webcam/manAbnormalEnter";
import ManAbsentEnter from "./features/webcam/manAbsentEnter";
import ManAbnormalExit from "./features/webcam/manAbnormalExit.js";
import ManNormalExit from "./features/webcam/manNormalExit";
import WomanAbnormalExit from "./features/webcam/womanAbnormalExit";
import WomanNormalExit from "./features/webcam/womanNormalExit";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <AdminRoute exact path="/enter" component={EnterCamera}></AdminRoute>
          <AdminRoute
            exact
            path="/admin/form"
            component={studentForm}
          ></AdminRoute>
          <AdminRoute exact path="/admin" component={MainPage}></AdminRoute>
          <AdminRoute exact path="/admin/woman/0" component={WomanAbnormalEnter}></AdminRoute>
          <AdminRoute exact path="/admin/woman/2" component={WomanNormalExit}></AdminRoute>
          <AdminRoute exact path="/admin/woman/3" component={WomanNormalExit}></AdminRoute>
          <AdminRoute exact path="/admin/woman/10" component={WomanAbnormalEnter}></AdminRoute>
          <AdminRoute exact path="/admin/woman/99" component={WomanAbsentEnter}></AdminRoute>
          <AdminRoute exact path="/admin/man/0" component={ManNormalEnter}></AdminRoute>
          <AdminRoute exact path="/admin/man/2" component={ManAbnormalExit}></AdminRoute>
          <AdminRoute exact path="/admin/man/3" component={ManNormalExit}></AdminRoute>
          <AdminRoute exact path="/admin/man/10" component={ManAbnormalEnter}></AdminRoute>
          <AdminRoute exact path="/admin/man/99" component={ManAbsentEnter}></AdminRoute>



          <PublicRoute restricted exact path="/" component={LoginPage} />
          <AdminRoute exact path="/exit" component={ExitCamera} />
          <PrivateRoute exact path="/student" component={StudentMainPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
