import styles from "./mainPage.module.css"

const DangerList = ({ dangerList }) => {
  const content = dangerList.length ? (
    dangerList.map((student) => (
      <div className={styles.dangerListLine} key={student.id}>
        <span>{student.name}</span>
        <span>{student.phoneNum}</span>
      </div>
    ))
  ) : (
    <span>결석한 학생이 없습니다.</span>
  )
  return (
    <div>
      <h3>결석 위험군</h3>
      <div className={styles.dangerListBox}>
        <div>{content}</div>
      </div>
    </div>
  )
}

export default DangerList
