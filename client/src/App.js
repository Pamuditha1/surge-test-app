import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./css/styles.css";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";
import User from "./components/User";

function App() {
  return (
    <div className="container">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/user"
            element={<PrivateRoute path="/user" component={User} />}
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
