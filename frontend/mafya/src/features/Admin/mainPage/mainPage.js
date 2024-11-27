import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../../common/api";
import AdminHeader from "../header/adminHeader";
import ReadonlyRow from "./ReadOnlyRow";
import styles from "./mainPage.module.css";
import AttendStudents from "./dangerList";
import NotAttendStudents from "./studentList";
import Pagination from "react-js-pagination";
import "./mainPage.css";
import DangerList from "./dangerList";
import StudentList from "./studentList";
import axios from "axios";
import axios1 from "../../../common/api/axios";
import CustomPagination from "./customPagination";
import CustomModal from "../../../common/modal/modal";

const MainPage = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dangerList, setDangerList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const offset = (page - 1) * limit;
  const [checkItems, setCheckItems] = useState([]);
  const [dangerCheckItems, setDangerCheckItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [messages, setMessages] = useState("");
  const [isName, setIsName] = useState(false);
  const [isUserCode, setIsUserCode] = useState(false);
  const [isClassCode, setIsClassCode] = useState(false);
  const [isTeamCode, setIsTeamCode] = useState(false);
  const [isAbsent, setIsAbsent] = useState(false);
  const [isTrady, setIsTrady] = useState(false);

  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(true);
  const [dangerModalOpen, setDangerModalOpen] = useState(false);

  const dangerOpenModal = () => {
    setDangerModalOpen(true);
  };
  const dangerCloseModal = () => {
    setDangerModalOpen(false);
    setMessages("");
  };

  const messegesHandler = (event) => {
    const tmpMessges = event.target.value;
    setMessages(tmpMessges);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setMessages("");
  };
  // const [activePage, setActivePage] = useState(1);
  // const [totalPages, setTotalPages] = useState(null);
  // const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
  // const [totalItemsCount, setTotalItemsCount] = useState(null);

  const history = useHistory();
  const deleteHandler = (studentId) => {
    axios1
      .delete(API_URL + `student/${studentId}`, {
        headers: {
          accessToken: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const newStudents = [...students];
        const index = students.findIndex((stduent) => stduent.id === studentId);
        newStudents.splice(index, 1);
        setStudents(newStudents);
        const newDangerList = [...dangerList];
        const dangerIndex = dangerList.findIndex(
          (stduent) => stduent.id === studentId
        );
        if (dangerIndex !== -1) {
          newDangerList.splice(dangerIndex, 1);
          setDangerList(newDangerList);
        }
        const newStudentList = [...studentList];
        const studentListIndex = studentList.findIndex(
          (stduent) => stduent.id === studentId
        );
        if (studentListIndex !== -1) {
          newStudentList.splice(studentListIndex, 1);
          setStudentList(newStudentList);
        }

        alert("학생 정보 제거");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const updateHandler = (stduent) => {
    history.push({ pathname: "/admin/form", state: stduent });
  };

  // const fetchStudents = (page) => {
  //   let tmpPage = page - 1;
  //   axios1
  //     .get(API_URL + `student?page=${tmpPage}&size=5`, {
  //       headers: {
  //         accessToken: window.localStorage.getItem("token"),
  //       },
  //     })
  //     .then((res) => {
  //       setStudents(res.data.userList.content);
  //       setTotalPages(res.data.userList.totalPages);
  //       setItemsCountPerPage(res.data.userList.size);
  //       setTotalItemsCount(res.data.userList.totalElements);
  //     })
  //     .catch((err) => {
  //       alert("학생 정보를 불러오지 못했습니다.");
  //     });
  // };

  const fetchDangerList = (classCode) => {
    axios1
      .get(API_URL + `attendance/danger/${classCode}`, {
        headers: {
          accessToken: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setDangerList(res.data);
      })
      .catch((err) => {
        alert("위험 리스트 정보를 불러오지 못했습니다.");
      });
  };

  const fetchStudentList = (classCode) => {
    axios1
      .get(API_URL + `attendance/class/${classCode}`, {
        headers: {
          accessToken: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setStudentList(res.data);
      })
      .catch((err) => {
        alert("학생 리스트 정보를 불러오지 못했습니다.");
      });
  };

  const fetchStudents = () => {
    setSearchLoading(true);
    axios1
      .post(
        API_URL + "search",
        { content: search, tradyOrder: isTrady, absentOrder: isAbsent },
        {
          headers: {
            accessToken: window.localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setStudents(res.data);
        setTotal(res.data.length);
        console.log(res.data);
      })
      .catch((err) => {
        alert("학생 리스트 정보를 불러오지 못했습니다.");
      });
    setSearchLoading(false);
  };
  // const handlePageChange = (pageNumber) => {
  //   setActivePage(pageNumber);
  // };

  // useEffect(() => {
  //   fetchStudents(activePage);
  // }, [activePage]);
  useEffect(() => {
    // fetchStudents(activePage);
    setIsLoading(true);
    const classCode = window.localStorage.getItem("classCode");
    fetchDangerList(classCode);
    setSearch(classCode);
    setIsLoading(true);
    fetchStudentList(classCode);

    setIsLoading(false);
  }, []);

  const searchChangeHandler = (event) => {
    const tmpSearch = event.target.value;
    setSearch(tmpSearch);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    setSearchLoading(true);
    axios1
      .post(
        API_URL + "search",
        { content: search, tradyOrder: isTrady, absentOrder: isAbsent },
        {
          headers: {
            accessToken: window.localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setStudents(res.data);
        setTotal(res.data.length);
        setIsAbsent(false);
        setIsClassCode(false);
        setIsName(false);
        setIsTeamCode(false);
        setIsUserCode(false);
        setIsTrady(false);
      })
      .catch((err) => {
        alert("학생 리스트 정보를 불러오지 못했습니다.");
      });
    setSearchLoading(false);
    // fetchStudents();
  };

  const searchNameHandler = (event) => {
    event.preventDefault();
    if (isName && students.length) {
      setIsName(!isName);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => x.name.localeCompare(y.name));
      setStudents(tmpStudents);
    } else if (!isName && students.length) {
      setIsName(!isName);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => y.name.localeCompare(x.name));
      setStudents(tmpStudents);
    }
  };

  const searchUserCodeHandler = (event) => {
    event.preventDefault();
    if (isUserCode && students.length) {
      setIsUserCode(!isUserCode);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => x.userCode.localeCompare(y.userCode));
      setStudents(tmpStudents);
    } else if (!isUserCode && students.length) {
      setIsUserCode(!isUserCode);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => y.userCode.localeCompare(x.userCode));
      setStudents(tmpStudents);
    }
  };

  const searchTeamCodeHandler = (event) => {
    event.preventDefault();
    if (isTeamCode && students.length) {
      setIsTeamCode(!isTeamCode);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => x.teamCode.localeCompare(y.teamCode));
      setStudents(tmpStudents);
    } else if (!isTeamCode && students.length) {
      setIsTeamCode(!isTeamCode);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => y.teamCode.localeCompare(x.teamCode));
      setStudents(tmpStudents);
    }
  };

  const searchClassCodeHandler = (event) => {
    event.preventDefault();
    if (isClassCode && students.length) {
      setIsClassCode(!isClassCode);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => x.classCode.localeCompare(y.classCode));
      setStudents(tmpStudents);
    } else if (!isClassCode && students.length) {
      setIsClassCode(!isClassCode);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => y.classCode.localeCompare(x.classCode));
      setStudents(tmpStudents);
    }
  };

  const searchAbsentHandler = (event) => {
    event.preventDefault();
    if (isAbsent && students.length) {
      setIsAbsent(!isAbsent);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => x.absent - y.absent);
      setStudents(tmpStudents);
    } else if (!isAbsent && students.length) {
      setIsAbsent(!isAbsent);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => y.absent - x.absent);
      setStudents(tmpStudents);
    }
  };

  const searchTardyHandler = (event) => {
    event.preventDefault();
    if (isTrady && students.length) {
      setIsTrady(!isTrady);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => x.trady - y.trady);
      setStudents(tmpStudents);
    } else if (!isTrady && students.length) {
      setIsTrady(!isTrady);
      const tmpStudents = students;
      tmpStudents.sort((x, y) => y.trady - x.trady);
      setStudents(tmpStudents);
    }
  };

  const handleSingleCheck = (checked, id) => {
    if (checkItems.includes(id)) {
      setCheckItems(checkItems.filter((el) => el !== id));
    } else {
      setCheckItems((prev) => [...prev, id]);
    }
    // if (checked) {
    //   setCheckItems((prev) => [...prev, id])
    // } else {
    //   setCheckItems(checkItems.filter((el) => el !== id))
    // }
    console.log(checkItems);
  };

  const dangerhandleSingleCheck = (checked, id) => {
    if (dangerCheckItems.includes(id)) {
      setDangerCheckItems(dangerCheckItems.filter((el) => el !== id));
    } else {
      setDangerCheckItems((prev) => [...prev, id]);
    }
    // if (checked) {
    //   setCheckItems((prev) => [...prev, id])
    // } else {
    //   setCheckItems(checkItems.filter((el) => el !== id))
    // }
    // console.log(checkItems)
  };

  const handleAllCheck = (checked) => {
    // if (checked) {
    //   const idArray = []
    //   studentList.forEach((el) => idArray.push(el.id))
    //   setCheckItems(idArray)
    // } else {
    //   setCheckItems([])
    // }
    if (checkItems.length === studentList.length) {
      setCheckItems([]);
    } else {
      const idArray = [];
      studentList.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    }
  };
  const dangerHandleAllCheck = (checked) => {
    // if (checked) {
    //   const idArray = []
    //   dangerList.forEach((el) => idArray.push(el.id))
    //   setDangerCheckItems(idArray)
    // } else {
    //   setDangerCheckItems([])
    // }
    if (dangerCheckItems.length === dangerList.length) {
      setDangerCheckItems([]);
    } else {
      const idArray = [];
      dangerList.forEach((el) => idArray.push(el.id));
      setDangerCheckItems(idArray);
    }
  };
  const mmsHandler = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const mmsDangerHandler = (event) => {
    event.preventDefault();
    setDangerModalOpen(true);
  };

  const mmsDangerTransferHandler = (event) => {
    event.preventDefault();
    const formData = { ids: dangerCheckItems, messages };
    axios1
      .post(API_URL + "mms", formData, {
        headers: { accessToken: window.localStorage.getItem("token") },
      })
      .then((res) => {
        alert("성공");
        setDangerModalOpen(false);
        setMessages("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mmsTransferHandler = (event) => {
    event.preventDefault();
    const formData = { ids: checkItems, messages };
    axios1
      .post(API_URL + "mms", formData, {
        headers: { accessToken: window.localStorage.getItem("token") },
      })
      .then((res) => {
        alert("성공");
        setModalOpen(false);
        setMessages("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    !isLoading && (
      <div className={styles.wholePage}>
        <AdminHeader />
        <CustomModal
          open={modalOpen}
          close={closeModal}
          ids={checkItems}
          header="Modal heading"
        >
          <form onSubmit={mmsTransferHandler}>
            전송할 메시지를 입력하세요!
            <div>
              <input
                type="textarea"
                value={messages}
                onChange={messegesHandler}
              />
            </div>
            <div>
              <button type="submit" className="close">
                전송
              </button>
            </div>
          </form>
        </CustomModal>

        <CustomModal
          open={dangerModalOpen}
          close={dangerCloseModal}
          ids={dangerCheckItems}
          header="Modal heading"
        >
          <form onSubmit={mmsDangerTransferHandler}>
            전송할 메시지를 입력하세요!
            <div>
              <input
                type="textarea"
                value={messages}
                onChange={messegesHandler}
              />
            </div>
            <div>
              <button type="submit" className="close">
                전송
              </button>
            </div>
          </form>
        </CustomModal>
        <div className={styles.inner}>
          <div className={styles.leftSideBox}>
            <div className={styles.teamStudentBox}>
              <div className={styles.boxTitle}>결석 위험군 명단</div>

              <div className={styles.teamStudentList}>
                <div>
                  {dangerList?.map((data, key) => (
                    <div
                      className={
                        dangerCheckItems.includes(data.id)
                          ? styles.studentListItem
                          : styles.studentListItemFalse
                      }
                      onClick={(e) => dangerhandleSingleCheck(data.id, data.id)}
                      key={key}
                    >
                      <div className={styles.studentListInner}>
                        <input
                          className={styles.studentListCheckBox}
                          type="checkbox"
                          name={`select-${data.id}`}
                          id={data.id}
                          checked={
                            dangerCheckItems.includes(data.id) ? true : false
                          }
                        />
                        <div>
                          <span className={styles.studentName}>
                            {data.name}
                          </span>
                        </div>
                        <div>
                          <span>
                            {data.phoneNum.slice(0, 3)}-
                            {data.phoneNum.slice(3, 7)}-
                            {data.phoneNum.slice(7, 11)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.dropdown}>
                <div className={styles.dropdownContent}>
                  <div className={styles.dropdownItem}>
                    <form onSubmit={mmsHandler}>
                      <button className={styles.sendBtn} type="submit">
                        <span class="material-symbols-outlined">
                          outgoing_mail
                        </span>
                      </button>
                    </form>
                  </div>
                  <div
                    onClick={dangerHandleAllCheck}
                    className={styles.dropdownItem}
                  >
                    {/* <input
                      type="checkbox"
                      name="select-all"
                      onChange={(e) => dangerHandleAllCheck(e.target.checked)}
                      checked={
                        dangerCheckItems.length === dangerList.length
                          ? true
                          : false
                      }
                    /> */}
                    {dangerCheckItems.length === dangerList.length ? (
                      <div className={styles.checked}>
                        <span className="material-symbols-outlined">
                          done_all
                        </span>
                      </div>
                    ) : (
                      <div className={styles.notChecked}>
                        <span className="material-symbols-outlined">
                          done_all
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button className={styles.dropbtn}>
                  <span class="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
            {/* <div className={styles.dangerInfoBox}>
              {dangerList?.length ? (
                <DangerList dangerList={dangerList} />
              ) : (
                <p>결석 위험군이 없습니다.</p>
              )}
            </div> */}
            {/* <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          name="select-all"
                          onChange={(e) => handleAllCheck(e.target.checked)}
                          checked={
                            checkItems.length === studentList.length
                              ? true
                              : false
                          }
                        />
                      </th>
                      <th>이름</th>
                      <th>전화번호</th>
                    </tr>
                  </thead> */}
            <div className={styles.teamStudentBox}>
              <div className={styles.boxTitle}>금일 명단</div>

              <div className={styles.teamStudentList}>
                <div>
                  {studentList?.map((data, key) => (
                    <div
                      className={
                        checkItems.includes(data.id)
                          ? styles.studentListItem
                          : styles.studentListItemFalse
                      }
                      onClick={(e) => handleSingleCheck(data.id, data.id)}
                      key={key}
                    >
                      <div className={styles.studentListInner}>
                        <input
                          className={styles.studentListCheckBox}
                          type="checkbox"
                          name={`select-${data.id}`}
                          id={data.id}
                          checked={checkItems.includes(data.id) ? true : false}
                        />
                        <div>
                          <span className={styles.studentName}>
                            {data.name}
                          </span>
                        </div>
                        <div>
                          <span>
                            {data.phoneNum.slice(0, 3)}-
                            {data.phoneNum.slice(3, 7)}-
                            {data.phoneNum.slice(7, 11)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.dropdown}>
                <div className={styles.dropdownContent}>
                  <div className={styles.dropdownItem}>
                    <form onSubmit={mmsHandler}>
                      <button className={styles.sendBtn} type="submit">
                        <span className="material-symbols-outlined">
                          outgoing_mail
                        </span>
                      </button>
                    </form>
                  </div>
                  <div onClick={handleAllCheck} className={styles.dropdownItem}>
                    {/* <input
                      type="checkbox"
                      name="select-all"
                      onChange={(e) => handleAllCheck(e.target.checked)}
                      checked={
                        checkItems.length === studentList.length ? true : false
                      }
                      id="dangerAllCheckBox"
                    /> */}
                    {checkItems.length === studentList.length ? (
                      <div className={styles.checked}>
                        <span className="material-symbols-outlined">
                          done_all
                        </span>
                      </div>
                    ) : (
                      <div className={styles.notChecked}>
                        <span className="material-symbols-outlined">
                          done_all
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button className={styles.dropbtn}>
                  <span class="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.rightSideBox}>
            <div>
              <h3>학생 명단</h3>
              <div className={styles.searchBox}>
                <form onSubmit={searchHandler}>
                  <input type="text" onChange={searchChangeHandler} />
                  <button type="submit">검색</button>
                </form>
                {students.length ? (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th onClick={searchNameHandler}>이름</th>
                        <th onClick={searchUserCodeHandler}>학번</th>
                        <th onClick={searchClassCodeHandler}>반</th>
                        <th onClick={searchTeamCodeHandler}>팀 코드</th>
                        <th>휴대폰 번호</th>
                        <th>팀장 여부</th>
                        <th onClick={searchAbsentHandler}>결석</th>
                        <th onClick={searchTardyHandler}>지각</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.slice(offset, offset + limit).map((student) => {
                        return (
                          <ReadonlyRow
                            key={students.indexOf(student)}
                            student={student}
                            deleteHandler={deleteHandler}
                            updateHandler={updateHandler}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p>검색 결과가 없습니다.</p>
                )}
                {students.length ? (
                  <CustomPagination
                    total={total}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MainPage;
