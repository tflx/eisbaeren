import {getUser} from './user';

function getAllEmails(players) {
  let emails = '';
  const myEmail = getUser().addresses[0].email;
  emails = emails.concat(players.map((player) =>
    (myEmail !== player.addresses[0].email ? player.addresses[0].email : null)
  ));
  return emails;
}

export default {
  getAllEmails
};