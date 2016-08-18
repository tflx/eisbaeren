import cookie from 'react-cookie';
import base64 from 'base-64';

export function getUser() {
  return cookie.load('holdsport');
}


export function encodeLogin(username, password) {
  const login = `${username}:${password}`;
  const encoded = `Basic ${base64.encode(login)}`;
  return encoded;
}

export function saveUser(username, password) {
  cookie.save('holdsport', encodeLogin(username, password));
}