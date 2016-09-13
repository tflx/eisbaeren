import cookie from 'react-cookie';
import base64 from 'base-64';

export function getLogin() {
  return cookie.load('holdsport_login');
}

export function encodeLogin(username, password) {
  const login = unescape(encodeURIComponent(`${username}:${password}`));
  const encoded = `Basic ${base64.encode(login)}`;
  return encoded;
}

export function saveLogin(username, password) {
  const today = new Date();
  const expires = new Date(today.setMonth(today.getMonth() + 3));
  const options = {expires};
  cookie.save('holdsport_login', encodeLogin(username, password), options);
}

export function getUser() {
  return JSON.parse(localStorage.getItem('holdsport_user'));
}

export function saveUser(user) {
  localStorage.setItem('holdsport_user', JSON.stringify(user));
}

export function deleteUser() {
  cookie.remove('holdsport_login');
  localStorage.removeItem('holdsport_user');
}