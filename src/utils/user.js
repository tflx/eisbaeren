import cookie from 'react-cookie';
import base64 from 'base-64';

export function getLogin() {
  return cookie.load('holdsport_login');
}

export function getUser() {
  return cookie.load('holdsport_user');
}

export function deletUser() {
  cookie.remove('holdsport_login');
  cookie.remove('holdsport_user');
}


export function encodeLogin(username, password) {
  const login = `${username}:${password}`;
  const encoded = `Basic ${base64.encode(login)}`;
  return encoded;
}

export function saveUser(user, username, password) {
  cookie.save('holdsport_user', user);
  cookie.save('holdsport_login', encodeLogin(username, password));
}