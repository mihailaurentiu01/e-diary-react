import axios from 'axios';
const baseUrl =
  'https://e-diary-react-default-rtdb.europe-west1.firebasedatabase.app/';

export function signUpUser(data) {
  return axios.post(baseUrl + 'users.json', data);
}

export function getAllUsers() {
  return axios.get(baseUrl + 'users.json');
}

export function addCategory(data) {
  return axios.post(baseUrl + 'categories.json', data);
}

export function getCategories() {
  return axios.get(baseUrl + 'categories.json');
}

export default {
  getBaseUrl() {
    return baseUrl;
  },
};
