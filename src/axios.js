import axios from "axios";
const instance = axios.create({ baseURL: process.env.REACT_APP_MANGA_API_URL });
export default instance;
