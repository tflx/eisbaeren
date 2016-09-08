function getPlayers() {
  return JSON.parse(sessionStorage.getItem('holdsport_playerList'));
}

function savePlayers(playerList) {
  sessionStorage.setItem('holdsport_playerList', JSON.stringify(playerList));
}

export default {
  getPlayers,
  savePlayers
};