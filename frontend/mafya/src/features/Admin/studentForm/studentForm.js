import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { API_URL } from "../../../common/api";
import AdminHeader from "../header/adminHeader";
import styles from "./studentForm.module.css";

import Grid from "@material-ui/core/Grid";
import axios1 from "../../../common/api/axios";

const StudentForm = () => {
  const location = useLocation();
  const history = useHistory();
  const student = location.state;
  const [name, setName] = useState(student ? student.name : "");
  const [userCode, setUserCode] = useState(student ? student.userCode : "");
  const [teamCode, setTeamCode] = useState(student ? student.teamCode : "");
  const [classCode, setClassCode] = useState(student ? student.classCode : "");
  const [phoneNum, setPhoneNum] = useState(student ? student.phoneNum : "");

  const [teamLeader, setTeamLeader] = useState(
    student ? student.teamLeader : null
  );
  const [isUserCodeUnique, setIsUserCodeUnique] = useState(
    student ? true : false
  );
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewURL] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (!student) {
      setName("");
      setUserCode("");
      setTeamCode("");
      setClassCode("");
      setPhoneNum("");
      setTeamLeader(false);
      setIsUserCodeUnique(false);
      setFile(null);
      setPreviewURL(null);
      const fileInput = document.querySelector('input[type="file"]');
      const dataTransfer = new DataTransfer();
      fileInput.files = dataTransfer.files;
    } else {
      axios
        .get(API_URL + `img/${student.userCode}`, {
          headers: {
            accessToken: window.localStorage.getItem("token"),
          },
        })
        .then(async (res) => {
          const url = res.data;
          setPreviewURL(url);
          const response = await fetch(url);
          console.log(response);
          const data = await response.blob();
          console.log(data);
          const ext = url.split(".").pop();
          const filename = url.split("/").pop();
          const metadata = { type: `image/${ext}` };
          const tmpFile = new File([data], filename, metadata);
          setFile(tmpFile);
          const fileInput = document.querySelector('input[type="file"]');
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(tmpFile);
          fileInput.files = dataTransfer.files;
        })
        .catch((err) => {
          alert("이미지 업로드 실패");
        });
    }
  }, [student]);
  const nameChangeHandler = (event) => {
    const tempName = event.target.value;
    setName(tempName);
  };

  const userCodeChangeHandler = (event) => {
    const tempUserCode = event.target.value;
    setUserCode(tempUserCode);
  };

  const userCodeDupCheckHandler = async () => {
    const tempUserCode = userCode;
    if (userCode.trim() === "") {
      alert("학번을 입력해주세요");
      return;
    }
    axios
      .get(API_URL + `student/checkId/${tempUserCode}`, {
        headers: {
          accessToken: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.resultCode === 0) {
          alert("사용 가능한 학번입니다.");
          setName((prevState) => name);
          setIsUserCodeUnique(() => true);
          document.getElementById("userCode").readOnly = true;
        } else if (res.data.resultCode === 1) {
          alert("이미 존재하는 학번입니다.");
          setIsUserCodeUnique(() => false);
          return;
        }
      })
      .catch((err) => {
        alert("에러 발생");
      });
  };

  const teamCodeChangeHandler = (event) => {
    const tempTeamCode = event.target.value;
    setTeamCode(tempTeamCode);
  };

  const classCodeChangeHandler = (event) => {
    const tempClassCode = event.target.value;
    setClassCode(tempClassCode);
  };

  const phoneNumChangeHandler = (event) => {
    const tempPhoneNum = event.target.value;
    setPhoneNum(tempPhoneNum);
  };

  const teamLeaderChangeHandler = (event) => {
    console.log(event.target);
    setTeamLeader(!teamLeader);
    // if (event.target.value === "true") {
    //   const tempTeamLeader = true
    //   console.log(tempTeamLeader)
    //   setTeamLeader(tempTeamLeader)
    // } else if (event.target.value === "false") {
    //   const tempTeamLeader = false
    //   console.log(tempTeamLeader)
    //   setTeamLeader(tempTeamLeader)
    // } else if (event.target.value === "null") {
    //   setTeamLeader(null)
    // }
  };

  const handleFileOnChange = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  // const handleFileButtonClick = (e) => {
  //   e.preventDefault();
  //   fileRef.current.click();
  // };

  const isTeamLeader = (value) => {
    console.log(typeof value);
    console.log(value);
    if (typeof value === "boolean") {
      return true;
    } else {
      return false;
    }
  };
  const formIsVaild =
    name &&
    userCode &&
    teamCode &&
    classCode &&
    phoneNum &&
    isUserCodeUnique &&
    isTeamLeader(teamLeader) &&
    file;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const tmpStudentInfo = {
      name,
      userCode,
      teamCode,
      classCode,
      phoneNum,
      teamLeader,
      // file,
    };

    if (!student) {
      axios1
        .post(API_URL + "student/", tmpStudentInfo, {
          headers: {
            "Content-Type": "application/json",
            accessToken: window.localStorage.getItem("token"),
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("학생 정보 등록 완료");
        })
        .catch((err) => {
          alert("학생 정보 등록 실패");
        });
      let formData = new FormData();
      formData.set("file", file);
      formData.set("userCode", userCode);
      axios1
        .post(API_URL + `img/register/${userCode}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            accessToken: window.localStorage.getItem("token"),
            // "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          alert("학생 정보 등록 완료");
          window.location.reload();
        })
        .catch((err) => {
          alert("학생 정보 등록 실패");
        });
    } else {
      axios1
        .put(API_URL + `student/${student.id}`, tmpStudentInfo, {
          headers: {
            "Content-Type": "application/json",
            accessToken: window.localStorage.getItem("token"),
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("학생 정보 수정 완료");
        })
        .catch((err) => {
          alert("학생 정보 수정 실패");
        });

      let formData = new FormData();
      formData.set("file", file);
      formData.set("userCode", userCode);
      axios1
        .post(API_URL + `img/register/${userCode}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            accessToken: window.localStorage.getItem("token"),
            // "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          alert("학생 정보 수정 완료");
          history.push("/admin");
        })
        .catch((err) => {
          alert("학생 정보 수정 실패");
        });
    }
  };

  const backHandler = () => {
    history.push("/admin");
  };
  const resetButtonHandler = (event) => {
    event.preventDefault();
    setName("");
    setUserCode("");
    setTeamCode("");
    setClassCode("");
    setPhoneNum("");
    setTeamLeader(false);
    setIsUserCodeUnique(false);
    setFile(null);
    setPreviewURL(null);
  };
  return (
    // <div className={classes.v105_113}>
    //   <div className={classes.v105_123}>
    //     <span>학생 등록</span>
    //   </div>
    //   {/* <div className={classes.v105_123}></div> */}
    //   {/* <div className={classes.v105_124}></div> */}
    //   <div className={classes.v105_125}></div>
    //   {/* 이미지 공간 */}
    //   {/* <div className={classes.v107_143}></div> */}
    //   {/* <span className={classes.v107_147}>이번 달 지각</span>
    //   <span className={classes.v107_153}>특이 사항</span> */}
    //   {/* <div className={classes.v105_130}></div> */}
    //   <div className={classes.v105_134}></div>
    //   {/* <div className={classes.v107_144}></div> */}
    //   {/* <div className={classes.v107_152}></div> */}
    //   {/* <div className={classes.v107_145}></div> */}
    //   <div className={classes.v105_135}></div>
    //   <span className={classes.v105_136}>upload</span>
    //   {/* upload 버튼 */}

    //   <div className={classes.v107_150}></div>
    //   <span className={classes.v107_151}>Save</span>
    //   {/* save 버튼 */}
    //   <span className={classes.v105_137}>name</span>
    //   <span className={classes.v105_138}>age</span>
    //   <div className={classes.v105_139}></div>
    //   <span className={classes.v105_140}>team</span>
    // </div>

    <div className={styles.wholePage}>
      <AdminHeader />
      <div className={styles.firstPageBox}>
        <div className={styles.overlay}>
          <form onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={4} className={styles.imagePosition}>
                <div>
                  <div className={styles.imagePosition}>
                    <div className={styles.imagePlace}>
                      <div className={styles.cutImage}>
                        <img
                          className={styles.imageBox}
                          src={previewUrl}
                          alt="preview"
                          onClick={() => {
                            fileRef.current.click();
                          }}
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/jpg,impge/png,image/jpeg,image/gif"
                        name="profile_img"
                        id="file"
                        ref={fileRef}
                        style={{ display: "none" }}
                        onChange={handleFileOnChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <input
                      className={`${styles.tgl} ${styles.tglskewed}`}
                      id="cb5"
                      type="checkbox"
                      checked={teamLeader}
                      onChange={teamLeaderChangeHandler}
                    />
                    <label
                      className={styles.tglbtn}
                      data-tg-off="팀원"
                      data-tg-on="팀장"
                      for="cb5"
                    ></label>
                  </div>
                </div>
              </Grid>
              <Grid item xs={8}>
                {/* <div className={styles.createTitle}>
                  <span>{student ? "학생 정보 수정" : "학생 정보 등록"}</span>
                </div> */}
                <span> &nbsp;&nbsp;이름</span>
                <div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    placeholder="이름"
                    onChange={nameChangeHandler}
                    className={styles.userInput}
                  />
                </div>
                <div className={styles.spacingLine}>
                  <span className={styles.userInputSpan}>&nbsp;&nbsp;학번</span>
                </div>
                <Grid container spacing={3} className={styles.updown}>
                  <Grid item xs={9}>
                    <input
                      type="text"
                      id="userCode"
                      value={userCode}
                      readOnly={student ? true : false}
                      onChange={userCodeChangeHandler}
                      placeholder="학번"
                      className={styles.userCodeInput}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <button
                      className={
                        isUserCodeUnique
                          ? styles.userCodeBtnsFalse
                          : styles.userCodeBtns
                      }
                      onClick={userCodeDupCheckHandler}
                      type="button"
                    >
                      {student
                        ? "수정 불가"
                        : isUserCodeUnique
                        ? "사용 가능"
                        : "중복 확인"}
                    </button>
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item xs={2}>
                    <span>&nbsp;&nbsp;&nbsp;반</span>
                    <input
                      type="text"
                      id="classCode"
                      value={classCode}
                      onChange={classCodeChangeHandler}
                      placeholder="반"
                      className={styles.userInput}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <span>&nbsp;&nbsp;팀 코드</span>
                    <input
                      type="text"
                      id="teamCode"
                      value={teamCode}
                      onChange={teamCodeChangeHandler}
                      placeholder="팀 코드"
                      className={styles.userTeamInput}
                    />
                  </Grid>
                </Grid>
                <div className={styles.spacingLine}>
                  <span>&nbsp;&nbsp;핸드폰 번호</span>
                </div>
                <div>
                  <input
                    type="text"
                    id="phoneNum"
                    value={phoneNum}
                    onChange={phoneNumChangeHandler}
                    placeholder="- 없이 입력하세요"
                    className={styles.userInput}
                  />
                </div>
                {/* <div>
                  <input
                    type="radio"
                    name="teamLeader"
                    onChange={teamLeaderChangeHandler}
                    value="true"
                  />
                  {"팀장"}
                  <input
                    type="radio"
                    name="teamLeader"
                    onChange={teamLeaderChangeHandler}
                    value="false"
                  />
                  {"팀원"}
                </div> */}
                <Grid container>
                  <Grid item xs={12} className={styles.centered}>
                    <button
                      disabled={!formIsVaild}
                      className={
                        formIsVaild
                          ? styles.registerBtn
                          : styles.registerBtnFalse
                      }
                    >
                      {student ? "정보 수정" : "Register"}
                    </button>
                  </Grid>
                  <Grid item xs={6} className={styles.centered}>
                    <button
                      onClick={resetButtonHandler}
                      className={styles.resetBtn}
                    >
                      {" "}
                      Reset{" "}
                    </button>
                  </Grid>
                  <Grid item xs={6} className={styles.centered}>
                    <button onClick={backHandler} className={styles.backBtn}>
                      {" "}
                      Back{" "}
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
