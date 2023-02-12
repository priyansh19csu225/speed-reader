import axios from 'axios';

const formDataAxiosClient = axios.create();

// Intercept request
formDataAxiosClient.interceptors.request.use(
  (request) => {
    request.headers['Content-Type'] = 'multipart/form-data';
    return request;
  },
  null,
  { synchronous: true }
);


formDataAxiosClient.defaults.baseURL = '/api/v1';

formDataAxiosClient.defaults.headers = {
  'Content-Type': 'application/json, text/plain, */*',
  Accept: 'application/json, text/plain, */*',
};

// All request will wait 5 seconds before timeout
formDataAxiosClient.defaults.timeout = 10000;

// formDataAxiosClient.defaults.withCredentials = true;

export default formDataAxiosClient;
