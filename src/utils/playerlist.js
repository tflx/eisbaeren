function getPlayers(filtered = false) {
  let list = JSON.parse(sessionStorage.getItem('holdsport_playerList'));
  if (filtered) {
    list = list.filter((player) =>
      player.firstname.toLowerCase() !== 'lejesvend'
    );
  }
  return list;
}

function savePlayers(playerList) {
  sessionStorage.setItem('holdsport_playerList', JSON.stringify(playerList));
}

export default {
  getPlayers,
  savePlayers
};