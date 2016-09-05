let players = null;

export function getPlayers() {
  return players;
}

export function savePlayers(playerList) {
  players = playerList;
}