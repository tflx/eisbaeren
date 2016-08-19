const days = {
  0: 'søndag',
  1: 'mandag',
  2: 'tirsdag',
  3: 'onsdag',
  4: 'torsdag',
  5: 'fredag',
  6: 'lørdag',
};

export function getDay(day) {
  return days[day];
}