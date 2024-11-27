import axios from "axios";
import { API_URL } from "../../common/api";

export const login = async (userForm, userCode) => {
  axios
    .post(API_URL + "student/login/", userForm, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      window.localStorage.setItem("userCode", userCode);
      if (res.data.isManager === "Y") {
        window.localStorage.setItem("isManager", res.data.isManager);
      } else {
        window.localStorage.setItem("teamCode", res.data.teamCode);
      }
      const token = res.data.accessToken;
      console.log(token);
      axios.defaults.headers.common[`accessToken`] = token;
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = async () => {
  axios
    .get(API_URL + "student/logout/")
    .then((res) => {
      delete axios.defaults.headers.common[`accessToken`];
      window.localStorage.clear();
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
