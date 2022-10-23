import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://pomodoro-api-t.herokuapp.com",
});
