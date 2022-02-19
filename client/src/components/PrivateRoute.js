import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ component: Component, types, ...rest }) => {
  let jwt = localStorage.getItem("token");

  let token;
  if (jwt) {
    token = jwtDecode(jwt);
  }
  return <>{token ? <Component {...rest} /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
