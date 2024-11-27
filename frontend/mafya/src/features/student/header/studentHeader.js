import classes from "./student.module.css";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../login/loginAPI";
import axios from "axios";
import { API_URL } from "../../../common/api";
import axios1 from "../../../common/api/axios";

const StudentHeader = () => {
  const history = useHistory();
  const logoutHandler = (event) => {
    axios1
      .get(API_URL + "student/logout/", {
        headers: {
          accessToken: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        window.localStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav className={classes.navbar}>
      <Link to="/student" className={classes.navbar__logo}>
        SSAFY
      </Link>
      <ul className={classes.navbar__menu}>
        <Link to="/student" className={classes.navbar__item}>
          Main
        </Link>
        <span className={classes.navbar__item} onClick={logoutHandler}>
          Logout
        </span>

        {/* 향후에 드랍다운으로 처리합시다.  할꺼는 패스워드 바꾸기, 로그아웃*/}
        {/* <span className={classes.navbar__item}>Logout</span> */}
      </ul>
    </nav>
  );
};

export default StudentHeader;
