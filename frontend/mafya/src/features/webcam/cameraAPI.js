import axios from "axios";
import { API_URL } from "../../common/api";

export const detectFace = async (formData) => {
  try {
    const response = await axios.post(API_URL + "img/face/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const gateLog = async (userCode) => {
  try {
    const response = await axios.get(API_URL + `gatelog/${userCode}/`);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const detectMasking = async (formData) => {
  try {
    const response = await axios.post(API_URL + "img/mask/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
