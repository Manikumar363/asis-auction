import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.asisauctions.com.au"
  // baseURL: "http://localhost:4000"
});


export default instance;
