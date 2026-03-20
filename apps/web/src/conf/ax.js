import axios from "axios"
import conf from './main'

export const axData = {
  jwt: null
}

const ax = axios.create({
  baseURL: conf.urlPrefix,
  
})

ax.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = axData.jwt;
  if (!token) {
    token = sessionStorage.getItem(conf.jwtSessionStorageKey);
  }
  
  if (token && config.url !== conf.loginEndpoint) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default ax;