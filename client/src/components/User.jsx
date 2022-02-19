import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getUser, updateUser } from "../services/user";

function User() {
  const navigate = useNavigate();
  const initialValues = {
    _id: "",
    username: "",
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
  const [user, setUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const getUserData = async () => {
    const jwt = localStorage.getItem("token");
    const { _id } = jwtDecode(jwt);

    const userData = await getUser(_id);
    setUser(userData);
    formik.setValues(userData);
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      _id: Yup.string(),
      username: Yup.string()
        .min(3, "Mininum 3 characters")
        .max(15, "Maximum 10 characters")
        .required("Username is Required"),
      fullName: Yup.string()
        .min(3, "Mininum 3 characters")
        .required("Full Name is Required"),
      email: Yup.string().email("Invalid Email").required("Email is Required"),
      password: Yup.string().min(5, "Minimum 5 Characters"),
      repeatPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords Not Match"
      ),
    }),
    onSubmit: async (values) => {
      const { repeatPassword, ...body } = values;
      try {
        const result = await updateUser(body);
        if (result) {
          localStorage.setItem("token", result);
          getUserData();
          setIsEdit((state) => !state);
        }
      } catch (error) {
        console.log("Unexpected Error", error);
        toast.error("Unexpected Error");
      }
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="container text-center">
      <div>
        <div className="text-center">
          <button onClick={logout} className="btn btn-outline-dark mb-5">
            Logout
          </button>
        </div>
        <div className="row mt-5 mb-5">
          <h2>User</h2>
        </div>
        <div className="row user">
          {!isEdit ? (
            <>
              <div className="col-6">
                <h5>Full Name</h5>
                <h5>Username</h5>
                <h5>Email</h5>
              </div>{" "}
              <div className="col-6">
                <h4 className="fw-bold">{user.fullName}</h4>
                <h4 className="fw-bold">{user.username}</h4>
                <h4 className="fw-bold">{user.email}</h4>
              </div>
            </>
          ) : (
            <form
              className="container"
              onSubmit={formik.handleSubmit}
              autoComplete="off"
              style={{ margin: "auto" }}
            >
              <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
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
                        <p className="ml-5 mt-2 text-light">
                          {formik.errors.email}
                        </p>
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
                    <div className="row">
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-danger mt-5"
                          onClick={() => setIsEdit(false)}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-success mt-5"
                          onClick={formik.handleSubmit}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3"></div>
              </div>
            </form>
          )}
        </div>
        <div className="update_btn">
          {!isEdit && (
            <button
              type="button"
              className="btn btn-warning mt-5"
              onClick={() => setIsEdit(true)}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
