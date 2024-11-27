import classes from "./adminHeader.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../common/api";
import axios1 from "../../../common/api/axios";

import React, { useState } from "react";
import styled from "styled-components";
import MenuIcon from '@mui/icons-material/Menu';

const AdminHeader = () => {
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
        console.log(err);
      });
  };
  // add
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  
  // return (
  //   <nav className={classes.navbar}>
  //     <Link to="/admin" className={classes.navbar__logo}>
  //       SSAFY
  //     </Link>
  //     <ul className={classes.navbar__menu}>
  //       <Link to="/admin" className={classes.navbar__item}>
  //         Main
  //       </Link>
  //       <Link to="/admin/form" state={null} className={classes.navbar__item}>
  //         Create
  //       </Link>
  //       <span className={classes.navbar__item} onClick={logoutHandler}>
  //         Logout
  //       </span>
  //       <Link to="/enter" className={classes.navbar__item}>
  //         프로님 버전
  //       </Link>
  //       <Link to="/exit" className={classes.navbar__item}>
  //         컨설턴트님 버전
  //       </Link>
  //       {/* <span className={classes.navbar__item}>Logout</span> */}
  //     </ul>
  //     <div className={classes.navbar__hamburger}>
  //       <MenuIcon fontSize="large">

  //       </MenuIcon>
  //     </div>
  //   </nav>
  // );
  return (
    <nav className={classes.navbar} isToggled={isToggled} userToggled={userToggled}>
      <Link to="/admin" className={classes.navbar__logo}>
        SSAFY
      </Link>
      <ul className={classes.navbar__menu}>
        <Link to="/admin" className={classes.navbar__item}>
          Main
        </Link>
        <Link to="/admin/form" state={null} className={classes.navbar__item}>
          Create
        </Link>
        <span className={classes.navbar__item} onClick={logoutHandler}>
          Logout
        </span>
        <Link to="/enter" className={classes.navbar__item}>
          프로님 버전
        </Link>
        <Link to="/exit" className={classes.navbar__item}>
          컨설턴트님 버전
        </Link>
        {/* <span className={classes.navbar__item}>Logout</span> */}
      </ul>
      <div className={classes.navbar__hamburger} 
      onClick={() => {
          setIsToggled(!isToggled);
        }}>
        <MenuIcon fontSize="large" >

        </MenuIcon>
      </div>
    </nav>
  );
};

export default AdminHeader;
