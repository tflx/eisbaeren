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