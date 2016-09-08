const days = {
  0: 'Søndag',
  1: 'Mandag',
  2: 'Tirsdag',
  3: 'Onsdag',
  4: 'Torsdag',
  5: 'Fredag',
  6: 'Lørdag',
};

const months = {
  0: 'Januar',
  1: 'Februar',
  2: 'Marts',
  3: 'April',
  4: 'Maj',
  5: 'Juni',
  6: 'Juli',
  7: 'August',
  8: 'September',
  9: 'Oktober',
  10: 'November',
  11: 'December',
};

export function getDay(day) {
  return days[day];
}

export function parseDate(eventDate, showTime = true) {
  const start = new Date(eventDate);
  const parsedKickoff = getKickOff(eventDate);
  const weekday = this.getDay(start.getDay());
  const date = start.getDate();
  const month = start.getMonth() + 1;
  const meet = `${pad(start.getHours())}:${pad(start.getMinutes())}`;
  const kickoff = showTime ? `${pad(parsedKickoff.getHours())}:${pad(parsedKickoff.getMinutes())}` : null;
  const convertedDate = `${date}/${month}`;
  const time = showTime ? meet : null;
  const monthName = months[start.getMonth()];

  return {time, convertedDate, kickoff, weekday, month, monthName, date};
}

function pad(int) {
  return (int < 10 ? `0${int}` : int);
}

function getKickOff(eventDate) {
  const start = new Date(eventDate);
  const kickoff = new Date(start.getTime() + 45 * 60000);
  return kickoff;
}