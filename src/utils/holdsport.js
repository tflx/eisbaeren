
import config from '../../mock-api/config.json';
import {getLogin, encodeLogin} from './user';
import 'whatwg-fetch';


function getOptions() {
  const options = {
    method: 'GET',
    hostname: `${config.holdsport.api}`,
    port: 80,
    headers: { Authorization: getLogin() },
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // mode: 'no-cors',
    credentials: 'include'
  };

  return options;
}

function validateHoldsportLogin(username, password) {
  const options = getOptions();
  options.credentials = 'include';
  options.headers = { Authorization: encodeLogin(username, password) };
  const subPath = 'user';

  return fetch(options.hostname + subPath, options)
  .then((response) => {
    console.log(response);
    // response.json().then(json => console.log(json));
    handleResponse(response)
    . then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
  });
}

function get(path) {
  const options = getOptions();
  const subPath = path ? `teams/${config.holdsport.teamId}/${path}` : 'user';

  return fetch(options.hostname + subPath, options)
  .then(response => handleResponse(response));
}

function push(path, data, method) {
  const options = {
    method,
    hostname: 'https://api.holdsport.dk',
    port: 80,
    headers: {
      Authorization: getLogin(),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch(options.hostname + path, options)
  .then(response => handleResponse(response));
}


function handleResponse(response) {
  console.log(response);
  // if (response.status >= 200 && response.status < 300) {
  if (response.status === 0) {
    return response.json().then((json) => {
      console.log(json);
      return json;
    });
  }

  const error = new Error(`${response.status} - ${response.statusText}`);
  error.response = response;
  throw error;
}

export default {
  get,
  push,
  validateHoldsportLogin
};