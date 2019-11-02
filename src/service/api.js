import axios from 'axios';
import { SERVER_ADDRESS, USER_TOKEN } from 'utils/constants';
import asyncLocalStorage from 'service/asyncLocalStorage';

class NetworkError {
  constructor(error) {
    this.message = error.message;
    this.error = error;
  }
}

let username;
let axiosInstance;

function init() {
  username = asyncLocalStorage.getItem(USER_TOKEN);

  axiosInstance = axios.create({
    baseURL: SERVER_ADDRESS,
    //timeout: 2500,
  });
  axiosInstance.interceptors.request.use(
    function(config) {
      if (username) {
        axiosInstance.defaults.headers.common.Authorization = username;
      }
      return config;
    },
    function(error) {
      console.log(error);
      return Promise.reject(new NetworkError(error));
    }
  );
}
init();


const API = {
  post: async (url, data, option) => {
    return axiosInstance.post(url, data, option);
  },
  get: async (url, option) => {
    return axiosInstance.get(url, option);
  },
  deleteRequest: async (url, option) => {
    return axiosInstance.delete(url, option);
  },
};
export default API;
