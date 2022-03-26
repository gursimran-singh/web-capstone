import axios from "axios";

const BASE_URL = "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api";
//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   //headers: { token: `Bearer ${TOKEN}` },
// });


export default axios.create({
  baseURL: BASE_URL
});