import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { API_URL } from "../../common/api"
import { login } from "./loginAPI"
import styles from "./loginPage.module.css"
import logo from "../../pngs/mafya_logo.png"

const LoginPage = () => {
  const history = useHistory()
  const [userCode, setUserCode] = useState("")
  const [password, setPassword] = useState("")
  const [isStart, setIsStart] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const userCodeHandler = (event) => {
    setUserCode(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const formIsVaild = userCode && password

  const loginHandler = async (event) => {
    event.preventDefault()
    const userForm = { userCode, password }
    axios
      .post(API_URL + "student/login/", userForm, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.resultCode === 0) {
          window.localStorage.setItem("userCode", userCode)
          const token = res.data.accessToken
          window.localStorage.setItem("token", token)
          if (res.data.isManager === "Y") {
            window.localStorage.setItem("isManager", res.data.isManager)
            window.localStorage.setItem("classCode", res.data.classCode)

            history.push("/admin")
          } else {
            window.localStorage.setItem("teamCode", res.data.teamCode)

            history.push("/student")
          }
        } else {
          alert("로그인 에러")
        }
      })

      .catch((error) => {
        console.log(error)
      })
  }
  const toggleStart = (event) => {
    setIsChange(true)
    setTimeout(() => {
      setIsStart(true)
    }, 1000)
  }
  return (
    <div className={styles.loginBack}>
      <div className={styles.overlay} onClick={toggleStart}>
        {!isStart ? (
          <div className={isChange ? styles.mainPageChange : styles.mainPage}>
            <div className={styles.logoBox}>
              <img className={styles.logo} src={logo} alt="preview" />
            </div>
            <div className={styles.seviceInfo}>
              <p className={styles.catchPhrase}>
                Mafya는 SSAFY인의 건강한 출석을 위한 프로그램 입니다.
              </p>
              <p className={styles.seviceDetail}>
                학생들은 본인의 출석을 확인하고
              </p>
              <p>관리자는 학생들의 현황을 간단하게 확인하세요!</p>
            </div>
          </div>
        ) : (
          <div className={styles.overlay_Inner}>
            <div className={styles.overlay_title}>
              <h2>Login</h2>
            </div>
            <div className={styles.division}>
              <div className={styles.inputBox}>
                <form onSubmit={loginHandler}>
                  <div>
                    <div>
                      <span>아이디</span>
                    </div>
                    <input
                      onChange={userCodeHandler}
                      type="text"
                      id="userCode"
                      placeholder="아이디"
                      className={styles.loginInput}
                    />
                  </div>
                  <div className={styles.passwordBox}>
                    <div>
                      <span>비밀번호</span>
                    </div>
                    <input
                      onChange={passwordHandler}
                      type="password"
                      id="password"
                      placeholder="비밀번호"
                      className={styles.loginInput}
                    />
                  </div>
                  <div className={styles.loginBtnBox}>
                    <button
                      className={
                        formIsVaild ? styles.loginBtn : styles.loginBtnFalse
                      }
                      type="submit"
                      disabled={!formIsVaild}
                    >
                      로그인
                    </button>
                  </div>
                </form>
              </div>
              <div className={styles.infoBox}>
                <div>
                  <div className={styles.clauseText}>
                    <p>개인정보 수집 및 이용</p>
                    <br />
                    <p>1. 개인정보의 수집목적</p>
                    <p>
                      MaFya 홈페이지에서는 기본적인 회원 서비스 제공을 위한
                      필수정보를 수집하고 있습니다. MaFya 홈페이지에서는
                      정보주체의 기본적 인권 침해의 우려가 있는 민감한
                      개인정보(사상,신념, 노동조합,정당의 가입,탈퇴, 정치적
                      견해, 건강, 성생활, 유전정보 및 범죄경력에 관한 정보 등)는
                      수집하지 않습니다.
                    </p>
                    <br />
                    <p>가. 수집하는 개인정보의 항목</p>
                    <p>
                      ○ MaFya 홈페이지 회원서비스의 제공을 위해 아래와 같은
                      회원정보를 온라인상에서 입력받고 있습니다.
                    </p>
                    <p>- (수집 항목)개인 정면 사진</p>
                    <p>
                      ○ 여러분이 우리구 홈페이지를 이용할 경우 다음의 정보는
                      자동적으로 수집,저장됩니다.
                    </p>
                    <p>- 로그인 일시, 회원 가입 일시</p>
                    <br />
                    <p>나. 개인정보 수집방법</p>
                    <p>○ 홈페이지 관리자에 의한 등록</p>
                    <br />
                    <p>2. 개인정보의 수집·이용목적 및 보유·이용기간</p>
                    <p>
                      MaFya 홈페이지에서는 정보주체의 회원 가입일로부터 서비스를
                      제공하는 기간 동안에 한하여 MaFya 홈페이지 서비스를
                      이용하기 위한 최소한의 개인정보를 보유 및 이용 하게
                      됩니다. 회원가입 등을 통해 개인정보의 수집, 이용, 제공
                      등에 대해 동의하신 내용은 언제든지 철회하실 수 있습니다.
                      회원 탈퇴를 요청하거나 수집, 이용목적을 달성하거나 보유,
                      이용기간이 종료한 경우, 사업 폐지 등의 사유발생시 당해
                      개인정보를 지체없이 파기합니다.
                    </p>
                    <p>○ 개인정보의 수집,이용 목적</p>
                    <p>- 홈페이지 이용에 따른 본인 식별, 인증 절차에 이용</p>
                    <p>○ 개인정보의 보유 및 이용기간</p>
                    <p>
                      - 개인정보는 등록 후 1년까지 보유되며, 정보주체는
                      개인정보의 수집·이용목적에 대한 동의를 거부할 수 있고,
                      동의 거부시에는 MaFya 홈페이지에 사용이 불가능 해지며,
                      MaFya 홈페이지에서 제공하는 서비스를 이용할 수 없습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.wave}></div>
      <div className={styles.waveThree}></div>
      <div className={styles.waveTwo}></div>
    </div>
  )
}

export default LoginPage
