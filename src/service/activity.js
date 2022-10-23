import { axiosInstance } from "../config/axios";

export const getAllActivity = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/api/activities")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addActivity = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/api/activities", {
        data: data,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteActivity = (id) => {
  const url = `/api/activities/${id}`;
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
