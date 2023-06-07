import axios from 'axios';
// import {history} from '../index';

// axios.interceptors.response.use(response => {
//     const pagination = response.headers.pagination;
//     if (pagination) {
//       response = {data: response.data, pagination: JSON.parse(pagination)}
//       return response;
//     }
//
//     return response;
//   },
//   (error) => {
//     const {data, status, config} = error.response
//     switch (status) {
//       case 400:
//         if (config.method === 'get' && data.errors.id) {
//           history.push('/error/404');
//         }
//         if (data.errors) {
//           throw data.errors;
//         } else {
//           history.push('/error/400');
//         }
//         break;
//       case 401:
//         history.push('/error/401');
//         break;
//       case 403:
//         history.push('/error/403');
//         break;
//       case 404:
//         history.push('/error/404');
//         break;
//       case 500:
//         history.push('/error/500');
//         break;
//       default:
//         history.push('/error')
//     }
//     return Promise.reject(error);
//   })

const responseBody = (response) => response.data;

const requests = {
  get: async (url) => axios.get(url).then(responseBody),
  getPagination: async (url, params) => axios.get(url, {params}),
  post: async (url, body) => axios.post(url, body).then(responseBody),
  put: async (url, body) => axios.put(url, body).then(responseBody),
  del: async (url) => axios.delete(url).then(responseBody),
}

const Auth = {
  current: () => requests.get('/get-current-user'),
  login: (user) => requests.post('/login', user),
  register: (user) => requests.post('/register', user),
}

const Products = {
  list: (params) => requests.getPagination('products', params),
  del: (id) => requests.del(`products/${id}`),
  get: (id) => requests.get(`products/${id}`),
}

const agent = {
  Auth,
  Products
}

export default agent;