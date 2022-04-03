import axios from "axios";

const BASE_URL = "http://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api";

const tokenString = localStorage.getItem('token');
    const TOKEN = JSON.parse(tokenString);
    
export default axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});