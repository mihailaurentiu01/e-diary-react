import axios from 'axios';
const baseUrl =
  'https://e-diary-react-default-rtdb.europe-west1.firebasedatabase.app/';

export function signUpUser(data) {
  return axios.post(baseUrl + 'users.json', data);
}

export default {
  getBaseUrl() {
    return baseUrl;
  },
};
