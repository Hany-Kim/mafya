import { StylesContext } from "@material-ui/styles"
import { useState } from "react"
import CustomModal from "../../../common/modal/modal"
import styles from "./teamMember.module.css"

const TeamMemberRow = ({ student, mmsHandler, setIds }) => {
  const status = (attendanceStatus) => {
    if (attendanceStatus === 0) {
      return "입실"
    } else if (attendanceStatus === 10) {
      return "지각"
    } else if (attendanceStatus === 11) {
      return "조퇴"
    } else if (attendanceStatus === 12) {
      return "지각"
    } else if (attendanceStatus === 2) {
      return "조퇴"
    } else if (attendanceStatus === 3) {
      return "퇴실"
    } else if (attendanceStatus === 4) {
      return "오류"
    } else {
      return "결석"
    }
  }

  return (
    <div
      className={
        (student.attendanceStatus === 0) | (student.attendanceStatus === 3)
          ? styles.teamBoxAttend
          : styles.teamBoxAbscent
      }
    >
      <div className={styles.teamInner}>
        <div className={styles.teamName}>
          <span>{student.name}</span>
        </div>
        <div className={styles.teamStatus}>
          <span>{status(student.attendanceStatus)}</span>
        </div>
        <button
          className={
            (student.attendanceStatus === 0) | (student.attendanceStatus === 3)
              ? styles.msgBtnFalse
              : styles.msgBtnTrue
          }
          onClick={() => {
            mmsHandler()
            setIds(student.id)
          }}
        >
          <span className="material-symbols-outlined">mail</span>
        </button>

        {/* 향후에 MMS 기능 넣으면 끝 */}
        {/* 
      <td>
        <button type="button" onClick={(event) => updateHandler(student)}>
          Edit
        </button>
      
      </td> */}
      </div>
    </div>
  )
}

export default TeamMemberRow
