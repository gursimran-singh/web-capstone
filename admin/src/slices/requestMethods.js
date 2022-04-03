import axios from "axios";

const BASE_URL = "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api";

const tokenString = localStorage.getItem('token');
    const TOKEN = JSON.parse(tokenString);
   // console.log(TOKEN);
export default axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN.token}` },
});
