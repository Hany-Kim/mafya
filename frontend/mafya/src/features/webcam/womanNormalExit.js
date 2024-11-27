import { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

import { drawRect } from "./utilities";
import axios from "axios";
import { API_URL } from "../../common/api";
import styles from "./webcam.module.css";
import { detectFace, detectMasking, gateLog } from "./cameraAPI";
import notenroll from "./female/enter/notenroll.mp3";
import putmask from "./female/enter/putmask.mp3";
import normalenter from "./female/enter/normalenter.mp3";
import abnormalenter from "./female/enter/abnormalenter.mp3";
import twoenter from "./female/enter/twoenter.mp3";
import correctmask from "./female/enter/correctmask.mp3";
import abnormalexit from "./female/exit/abnormalexit.mp3";
import normalexit from "./female/exit/normalexit.mp3";
import notenroll1 from "./female/exit/notenroll1.mp3";
import absent from "./female/enter/absent.mp3";
const Swal = require("sweetalert2");


function WomanNormalExit() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timerId, setTimerId] = useState(null);
  const [humanDetacting, setHumanDetacting] = useState(false);
  const [faceDetacting, setFaceDetacting] = useState(false);
  const [model, setModel] = useState(null);
  const [userCode, setUserCode] = useState(null);

  const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  
  const detect1 = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh

      const ctx = canvasRef.current.getContext("2d");

      console.log(obj);
      const findHuman = obj
        ? obj.filter((box) => {
            return box.class === "person" && box.score >= 0.8;
          })
        : null;

      let humanDetact = findHuman
        ? findHuman.filter((box) => {
            return (
              15 <= box.bbox[0] <= 160 &&
              15 <= box.bbox[1] <= 160 &&
              box.bbox[2] >= 350 &&
              box.bbox[3] >= 300
            );
          })
        : [];
      console.log(humanDetact);
      if (humanDetact.length > 0) {
        setHumanDetacting(true);
        // new Audio(humanDetactMp3).play();
        return new Promise((resolve) => {
          setTimeout(async () => {
            const imageUrl = webcamRef.current.getScreenshot();
            let imageFile = dataURLtoFile(imageUrl, "test.jpeg");
            let formData = new FormData();
            formData.set("file", imageFile);
            const res = await detectFace(formData);

            if (res.data.status === "0") {

                new Audio(normalexit).play();

                Swal.fire({
                  icon: "success",
                  title: `${res.data.name}님 퇴실하셨습니다.`,
                  showConfirmButton: false,
                  timer: 2500,
                });

                return new Promise((resolve) => {
                  setTimeout(() => {
                    setHumanDetacting(false);
                  }, 2500);
                });
              
              
            } else if (res.data.status === "1") {
              new Audio(notenroll).play();
              Swal.fire({
                icon: "error",
                title: "오류",
                text: "DB에 등록된 사용자가 아닙니다.",
                showConfirmButton: false,
                timer: 2500,
              });
              return new Promise((resolve) => {
                setTimeout(() => {
                  setHumanDetacting(false);
                }, 2500);
              });
            } else if (res.data.status === "2") {
              new Audio(notenroll1).play();
              Swal.fire({
                icon: "error",
                title: "오류",
                text: "중앙으로 와주세요",
                showConfirmButton: false,
                timer: 2500,
              });
              return new Promise((resolve) => {
                setTimeout(() => {
                  setHumanDetacting(false);
                }, 2500);
              });
            }
          }, 2000);
        });
      }
    }
  };

  const defineInterval = (net) => {
    
      if (net) {
        const timeId = setInterval(() => {
          detect1(net);
        }, 1000);
        setTimerId(timeId);
      }
      if (humanDetacting) {
        console.log("인간 인식", net);
        clearInterval(timerId);
        setTimerId(null);
      }
    
  };
  useEffect(() => {
    async function runModel() {
      const net = await cocossd.load();
      console.log("모델 업로드 끝");
      setModel(net);
      // defineInterval(net)
    }
    runModel();
    // runCocoSsd();
  }, []);

  useEffect(() => {
    console.log(model);
    if (model && !humanDetacting) {
      console.log("확인");

      defineInterval(model);
    } else if (model && humanDetacting) {
      defineInterval(null);
    }
  }, [humanDetacting, model]);

  useEffect(() => {
    return clearInterval(timerId);
  }, []);

  return (
    <div className={styles.mainPageContainer}>
      <div className={faceDetacting ? styles.humanNow : styles.noHumanNow}>
        <div
          className={
            humanDetacting
              ? faceDetacting
                ? styles.tmp
                : styles.detectNow
              : styles.nodetectNow
          }
        >
          <Webcam
            ref={webcamRef}
            muted={true}
            mirrored={true}
            screenshotFormat="image/jpeg"
            className={styles.webCamArea}
          />
          <canvas ref={canvasRef} className={styles.webCanvas} />
        </div>
      </div>
      {/* <span className={styles.forMJDesign}>{sentence}</span> */}
    </div>
  );
}

export default WomanNormalExit;
