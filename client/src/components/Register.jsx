import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { userRegister } from "../services/user";

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Mininum 3 characters")
        .max(15, "Maximum 10 characters")
        .required("Username is Required"),
      fullName: Yup.string()
        .min(3, "Mininum 3 characters")
        .required("Full Name is Required"),
      email: Yup.string().email("Invalid Email").required("Email is Required"),
      password: Yup.string()
        .min(5, "Minimum 5 Characters")
        .required("Password is Required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords Not Match")
        .required("Confirm Password is Required"),
    }),
    onSubmit: async (values) => {
      const { repeatPassword, ...body } = values;
      formik.resetForm();
      try {
        const jwt = await userRegister(body);
        if (jwt) {
          localStorage.setItem("token", jwt);
          navigate("/user", { replace: true });
        }
      } catch (error) {
        console.log("Unexpected Error", error);
        toast.error("Unexpected Error");
      }
    },
  });

  return (
    <div>
      <center>
        <Link to="/login">
          <button type="button" className="btn btn-light mb-5 shadow">
            Already Registered? Login
          </button>
        </Link>
      </center>
      <form
        onSubmit={formik.handleSubmit}
        className="container"
        autoComplete="off"
      >
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 form">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="fullName" className="col-5">
                  Full Name
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="fullName"
                  name="fullName"
                />
                {formik.errors.fullName && formik.touched.fullName && (
                  <p className="ml-5 mt-2 text-light">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="email" className="col-5">
                  Email
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="form-control col-11 ml-3"
                  type="email"
                  id="email"
                  name="email"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="ml-5 mt-2 text-light">{formik.errors.email}</p>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="username" className="col-5">
                  Username
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="username"
                  name="username"
                />
                {formik.errors.username && formik.touched.username && (
                  <p className="ml-5 mt-2 text-light">
                    {formik.errors.username}
                  </p>
                )}
              </div>

              <div className="form-group col-12">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="password"
                  name="password"
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="ml-5 mt-2 text-light">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="repeatPassword" className="col-5">
                  Repeat Password
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.repeatPassword}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                />
                {formik.errors.repeatPassword &&
                  formik.touched.repeatPassword && (
                    <p className="ml-5 mt-2 text-light">
                      {formik.errors.repeatPassword}
                    </p>
                  )}
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <button type="submit" className="btn btn-light">
                    Register
                  </button>
                </center>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
