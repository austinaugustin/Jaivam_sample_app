import axios from 'axios';
import { store } from '../src/store/store';

function select(state) {
  return state.userReducer.user != null ? state.userReducer.token.token : null
}

export default function request(type, url, params) {

  let token = select(store.getState())
  axios.defaults.headers.common['Authorization'] = 'bearer' + token

  switch (type) {
    case 'get':
      return axios.get(url, { params: params })
        .then(async function (response) {
          return await response?.data
        })
        .catch(async function (error) {
          if (error?.response?.status === 401) {
            return store.dispatch({ type: 'USER_LOGOUT' })
          }
          else {
            return await error?.response?.data
          }
        })
      break;
    case 'post':
      return axios.post(url, params, { maxContentLength: Infinity, maxBodyLength: 5242880 })
        .then(async function (response) {
          return await response?.data
        })
        .catch(async function (error) {
          if (error?.response?.status === 401) {
            return store.dispatch({ type: 'USER_LOGOUT' })
          }
          else {
            return await error?.response?.data
          }
        })
      break;
    case 'put':
      return axios.put(url, params, {
        headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data', }, maxContentLength: Infinity, maxBodyLength: 5242880
      })
        .then(async function (response) {
          return await response?.data
        })
        .catch(async function (error) {
          if (error?.response?.status === 401) {
            return store.dispatch({ type: 'USER_LOGOUT' })
          }
          else {
            return await error?.response?.data
          }
        })
      break;
    default:
      break;
  }
}