const days = {
  0: 'Søndag',
  1: 'Mandag',
  2: 'Tirsdag',
  3: 'Onsdag',
  4: 'Torsdag',
  5: 'Fredag',
  6: 'Lørdag',
};

export function getDay(day) {
  return days[day];
}

export function parseDate(eventDate, showTime = true) {
  const start = new Date(eventDate);
  const kickoffTime = getKickOff(eventDate);
  const date = {
    weekday: this.getDay(start.getDay()),
    day: start.getDate(),
    month: start.getMonth() + 1,
    meet: `${pad(start.getHours())}:${pad(start.getMinutes())}`,
    kickoff: `${pad(kickoffTime.getHours())}:${pad(kickoffTime.getMinutes())}`
  };

  const convertedDate = `${date.weekday} ${date.day}/${date.month}`;
  const time = showTime ? date.meet : null;
  const kickoff = showTime ? date.kickoff : null;

  return {time, convertedDate, kickoff};
}

function pad(int) {
  return (int < 10 ? `0${int}` : int);
}

function getKickOff(eventDate) {
  const start = new Date(eventDate);
  const kickoff = new Date(start.getTime() + 45 * 60000);
  return kickoff;
}