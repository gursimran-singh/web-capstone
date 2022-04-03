import axios from "axios";

const BASE_URL = "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api";

export default axios.create({
  baseURL: BASE_URL,
});