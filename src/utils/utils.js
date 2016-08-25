import {getUser} from './user';

export function getAllEmails(players) {
  let emails = '';
  const myEmail = getUser().addresses[0].email;
  console.log(myEmail, players);
  emails = emails.concat(players.map((player) =>
    (myEmail !== player.addresses[0].email ? player.addresses[0].email : null)
  ));
  return emails;
}