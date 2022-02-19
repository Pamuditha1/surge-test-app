import http from "./http";
import { toast } from "react-toastify";
import { api } from "./api";

export function userRegister(userData) {
  return http
    .post(`${api}/register`, userData)
    .then(function (response) {
      toast.success(response.data.data.msg);
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response.data) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
      if (error.response) {
        console.log(error.response);
        toast.error(error.response);
      } else {
        console.log(error);
        toast.error(error);
      }
    });
}

export function userLogin(loginData) {
  return http
    .post(`${api}/login`, loginData)
    .then(function (response) {
      toast.success(`${response.data.msg}`);
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response.data) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
      if (error.response) {
        console.log(error.response);
        toast.error(error.response);
      } else {
        console.log(error);
        toast.error(error);
      }
    });
}

export function getUser(id) {
  return http
    .get(`${api}/user/${id}`)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response.data) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
      if (error.response) {
        console.log(error.response);
        toast.error(error.response);
      } else {
        console.log(error);
        toast.error(error);
      }
    });
}

export function updateUser(user) {
  return http
    .put(`${api}/user`, user)
    .then(function (response) {
      toast.success(response.data.data.msg);
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response.data) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
      if (error.response) {
        console.log(error.response);
        toast.error(error.response);
      } else {
        console.log(error);
        toast.error(error);
      }
    });
}
