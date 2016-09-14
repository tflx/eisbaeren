import consts from '../consts';

const players = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case consts.SAVE_PLAYERS:
      return {
        players: action.players
      };
    default:
      return state;
  }
};


export default players;
