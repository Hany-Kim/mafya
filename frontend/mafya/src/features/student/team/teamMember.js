import { useState } from "react";
import { useEffect } from "react";
import TeamMemberRow from "./teamMemberRow.";
import styles from "./teamMember.module.css";
import axios from "axios";
import { API_URL } from "../../../common/api";
import axios1 from "../../../common/api/axios";

const TeamMember = (props) => {
  localStorage.getItem("teamCode");

  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const teamCode = localStorage.getItem("teamCode");
    axios1
      .get(API_URL + `attendance/team/${teamCode}`, {
        headers: {
          accessToken: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data;
        setTeam(data.slice(0, 5));
      });

    setIsLoading(false);
  }, []);

  return (
    !isLoading && (
      <div>
        <div className={styles.teamMemberTitle}>팀원 현황</div>
        <div className={styles.teamMemberOverlay}>
          <table className={styles.table}>
            {team.map((student) => {
              return (
                <TeamMemberRow
                  key={student.id}
                  student={student}
                  setIds={props.setIds}
                  mmsHandler={props.mmsHandler}
                />
              );
            })}
          </table>
        </div>
      </div>
    )
  );
};

export default TeamMember;
