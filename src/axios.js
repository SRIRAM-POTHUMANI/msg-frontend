import axios from "axios";

const instance = axios.create({
  baseURL: "https://rps-msg.herokuapp.com/",
});
export default instance;
