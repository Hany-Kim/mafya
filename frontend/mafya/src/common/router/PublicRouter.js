import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { useSelector } from "react-redux";
import { isAdmin, isLogin } from "../api/isLogin";

export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  // const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() && restricted ? (
          <Redirect to="/admin" />
        ) : isLogin() && restricted ? (
          <Redirect to="/student" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
