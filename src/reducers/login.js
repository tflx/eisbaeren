import consts from '../consts';

const login = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case consts.LOGIN_SUCCESS:
      return {
        loggedIn: true
      };

    case consts.LOGOUT_SUCCESS:
      return {
        loggedIn: false
      };

    default:
      return state;
  }
};


export default login;
