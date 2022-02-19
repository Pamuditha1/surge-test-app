import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { userLogin } from "../services/user";

function Login() {
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({
    emailORusername: "",
    password: "",
  });

  const onchange = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const jwt = await userLogin(loginData);
      if (jwt) {
        localStorage.setItem("token", jwt);
        navigate("/user", { replace: true });
      }
    } catch (error) {
      console.log("Unexpected Error", error);
      toast.error("Unexpected Error");
    }
  };

  return (
    <div>
      <center>
        <Link to="/register">
          <button type="button" className="btn btn-light mb-5 shadow">
            Not Registered Yet? Register
          </button>
        </Link>
      </center>
      <form className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 form shadow">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="emailORusername" className="col-5">
                  Username / Email
                </label>
                <input
                  onChange={onchange}
                  value={loginData.emailORusername}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="emailORusername"
                  name="emailORusername"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  onChange={onchange}
                  value={loginData.password}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <button
                    onClick={submit}
                    type="submit"
                    className="btn btn-light"
                  >
                    Login
                  </button>
                </center>
              </div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </form>
    </div>
  );
}

export default Login;
