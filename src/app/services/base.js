import axios from 'axios';
const axiosClient = axios.create();

// Intercept request
axiosClient.interceptors.request.use(
  (request) => {
    request.headers['Content-Type'] = 'application/json';
    return request;
  },
  null,
  { synchronous: true }
);


// axiosClient.defaults.baseURL = '/api/v1';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// All request will wait 1 min before timeout
axiosClient.defaults.timeout = 60000;

// axiosClient.defaults.withCredentials = true;

export default axiosClient;
