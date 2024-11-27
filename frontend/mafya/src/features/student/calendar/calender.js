import FullCalendar, { preventContextMenu } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";
import { useEffect, useRef } from "react";
import EvenItem from "./evenItem";
import axios from "axios";
import { API_URL } from "../../../common/api";
import axios1 from "../../../common/api/axios";
import styles from "./calender.module.css";

const Calender = (props) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 달 이동 시에 state 변환
  const calendarRef = useRef();

  useEffect(() => {
    setEvents([]);
    const userCode = localStorage.getItem("userCode");
    axios1
      .get(API_URL + `attendance/calendar/${userCode}`, {
        headers: {
          accessToken: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const calenderInformation = res.data;
        const data = [];
        calenderInformation.forEach((dayInformation) => {
          if (dayInformation.enterTime !== "") {
            let enterInformation = {
              title: dayInformation.enterTime + " 입실",
              date: dayInformation.date,
              type: "입실",
            };
            data.push(enterInformation);
          }
          if (dayInformation.exitTime !== "") {
            let exitInformation = {
              title: dayInformation.exitTime + " 퇴실",
              date: dayInformation.date,
              type: "퇴실",
            };
            data.push(exitInformation);
          }
          const status = (attendanceStatus) => {
            if (attendanceStatus === 0) {
              return "입실";
            } else if (attendanceStatus === 10) {
              return "지각";
            } else if (attendanceStatus === 11) {
              return "조퇴";
            } else if (attendanceStatus === 12) {
              return "지각";
            } else if (attendanceStatus === 2) {
              return "조퇴";
            } else if (attendanceStatus === 3) {
              return "퇴실";
            } else if (attendanceStatus === 4) {
              return "오류";
            } else {
              return "결석";
            }
          };
          let typeInformation = {
            title: status(dayInformation.type),
            date: dayInformation.date,
            type: "현황",
          };
          data.push(typeInformation);
        });
        const result = data.filter((tmpEvent, index) => {
          const month = new Date(tmpEvent.date).getMonth() + 1;
          if (month === props.month) {
            return true;
          }
        });

        setEvents(result);
        setIsLoading(false);
      });
  }, [props.month]);
  // useEffect(() => {
  //   console.log("안녕하신가");
  //   if (document.readyState === "complete") {
  //     document
  //       .getElementsByClassName("fc-prev-button")[0]
  //       .removeEventListener("click", onClickPrevButton);
  //     console.log("hello");
  //     // document
  //     //   .getElementsByClassName("fc-prev-button")[0]
  //     //   .addEventListener("click", onClickPrevButton, { once: true });
  //   }
  // }, [currentMonth]);
  // const handleClick = (event) => {
  //   event.preventDefault();
  //   console.log(event.dateStr);
  // };
  return (
    !isLoading && (
      <div className={styles.calenderOverlay}>
        <div className={styles.calenderOverlayInner}>
          {!isLoading && (
            <FullCalendar
              ref={calendarRef}
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin]}
              weekends={true}
              contentHeight="618px"
              events={events}
              eventContent={(info) => <EvenItem info={info} />}
              eventBackgroundColor={"transparent"}
              eventBorderColor={"transparent"}
              // eventTextColor={"#000"}
              customButtons={{
                myCustomPrev: {
                  text: <span>{"<"}</span>,
                  click: function () {
                    calendarRef.current.getApi().prev();
                    props.setMonth(props.month === 1 ? 12 : props.month - 1);
                  },
                  className: styles.leftBtn,
                },

                myCustomToday: {
                  text: <span class="material-symbols-outlined">today</span>,
                  click: function () {
                    calendarRef.current.getApi().today();
                    props.setMonth(new Date().getMonth() + 1);
                  },
                },
                myCustomNext: {
                  text: <span>{">"}</span>,
                  click: function () {
                    calendarRef.current.getApi().next();

                    props.setMonth((props.month % 12) + 1);
                  },
                },
              }}
              headerToolbar={{
                right: "myCustomPrev myCustomToday myCustomNext",
              }}
            />
          )}
        </div>
      </div>
    )
  );
};

export default Calender;
