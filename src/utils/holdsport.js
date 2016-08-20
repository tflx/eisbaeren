
import config from '../../mock-api/config.json';
import {getUser, encodeLogin} from './user';


function getOptions() {
  const options = {
    method: 'GET',
    // hostname: 'https://api.holdsport.dk/v1/teams/2683/',
    hostname: `${config.holdsport.api}`,
    port: 80,
    headers: { Authorization: getUser() }
  };

  return options;
}

export function validateHoldsportLogin(username, password) {
  const options = getOptions();
  options.headers = { Authorization: encodeLogin(username, password) };
  const subPath = 'user';

  return fetch(options.hostname + subPath, options)
  .then((response) => handleResponse(response)
    .then((res) => res)
    .catch((error) => Promise.reject(error))
  );
}

export function get(path) {
  const options = getOptions();
  const subPath = path ? `teams/${config.holdsport.teamId}/${path}` : 'user';

  return fetch(options.hostname + subPath, options)
  .then(response => handleResponse(response));
}


function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json().then((json) => {
      if (json.error) {
        const error = new Error(response.error);
        error.response = json;
        throw error;
      }
      return json;
    });
  }

  const error = new Error(`${response.status} - ${response.statusText}`);
  error.response = response;
  throw error;
}