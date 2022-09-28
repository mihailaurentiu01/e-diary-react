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

export function updateCategory(data) {
  return axios.put(baseUrl + `categories/${data.id}.json`, data.category);
}

export function deleteCategory(data) {
  return axios.delete(baseUrl + `categories/${data.id}.json`);
}

export function addNote(data) {
  return axios.post(baseUrl + `notes.json`, data);
}

export function getNotes() {
  return axios.get(baseUrl + '/notes.json');
}

export function deleteNote(data) {
  return axios.delete(baseUrl + `notes/${data.id}.json`);
}

export function addNoteDetails(data) {
  return axios.post(baseUrl + 'notesDetails.json', data);
}

export function getNoteDetails() {
  return axios.get(baseUrl + `notesDetails.json`);
}

export function deleteNoteDetails(data) {
  return axios.delete(baseUrl + `notesDetails/${data.id}.json`);
}

export default {
  getBaseUrl() {
    return baseUrl;
  },
};
