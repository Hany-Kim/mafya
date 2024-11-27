import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { API_URL } from "../../../common/api"
import axios1 from "../../../common/api/axios"
import styles from "./attendInformation.module.css"
import styled from "@emotion/styled"
import { useHistory } from "react-router-dom"

const AnimatedCircle = styled.circle`
  animation: circle-fill-animation 2s ease;

  @keyframes circle-fill-animation {
    0% {
      stroke-dasharray: 0 ${2 * Math.PI * 90};
    }
  }
`
const AttendInformation = (props) => {
  const [information, setInformation] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const history = useHistory()

  const logoutHandler = (event) => {
    axios1
      .get(API_URL + "student/logout/", {
        headers: {
          accessToken: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        window.localStorage.clear()
        history.push("/")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    const userCode = localStorage.getItem("userCode")

    axios1
      .get(API_URL + `attendance/situation/${userCode}/${props.month}`, {
        headers: {
          accessToken: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setInformation(res.data)
      })

    setIsLoading(false)
  }, [props.month])

  return (
    !isLoading && (
      <div>
        <div className={styles.attendTitle}>{props.month}월 출결 현황</div>
        <div className={styles.attendOverlay}>
          <div className={styles.leftSide}>
            <div className={styles.userNameBox}>
              <p>
                <span className={styles.userName}>홍제민</span> 님
                <div className={styles.logoutBtnBox}>
                  <button className={styles.logoutBtn} onClick={logoutHandler}>
                    <span className="material-symbols-outlined">logout</span>
                  </button>
                </div>
              </p>
            </div>
            <div>
              <div className={styles.percentageBox}>
                {information.totalDay ? (
                  <div className={styles.percentageP}>
                    {(information.totalAttend / information.totalDay) * 100}%
                  </div>
                ) : (
                  <div className={styles.percentageP}>0%</div>
                )}
              </div>
              <div className={styles.percentageChart}>
                <svg viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="78"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="20"
                  />
                  <AnimatedCircle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="white"
                    strokeWidth="20"
                    strokeDasharray={`${
                      2 *
                      Math.PI *
                      90 *
                      (information.totalAttend / information.totalDay)
                    } ${
                      2 *
                      Math.PI *
                      90 *
                      (1 - information.totalAttend / information.totalDay)
                    }`}
                    strokeDashoffset={2 * Math.PI * 90 * 0.25}
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.attendOneFloor}>
              <div className={styles.rightSideInfoBox}>
                <p>출석수</p>
                <div className={styles.numBox}>{information.totalAttend}</div>
              </div>
              <div className={styles.rightSideInfoBox}>
                <p>교육 일수</p>
                <div className={styles.numBox}>{information.totalDay}</div>
              </div>
            </div>
            <div className={styles.attendTwoFloor}>
              <div className={styles.rightSideInfoBox}>
                <p>지각</p>
                <div className={styles.numBox}>{information.trady}</div>
              </div>
              <div className={styles.rightSideInfoBox}>
                <p>결석</p>
                <div className={styles.numBox}>{information.absent}</div>
              </div>
            </div>
          </div>
        </div>
        {/* <table className={styles.table}>
          <thead>
            <tr>
              <th>출석</th>
              <th>결석</th>
              <th>지각</th>
              <th>교육 지원금</th>
              <th>교육 일수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{information.totalAttend}</td>
              <td>{information.absent}</td>
              <td>{information.trady}</td>
              <td>{information.money}</td>
              <td>{information.totalDay}</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    )
  )
}

export default AttendInformation
