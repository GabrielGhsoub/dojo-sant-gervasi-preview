/* Every fact here was read off dojosantgervasi.es on 2026-08-12.
   Nothing is invented. The ONLY deliberate change from their live site is the
   spelling of "Acondicionamiento", which their own /horarios/ table gets right
   and their /contacto/ form gets wrong. */

export const brand = {
  name: 'Dojo Sant Gervasi',
  claim: 'Artes marciales y defensa personal en Barcelona',
  since: 1997,
  address: 'Carrer de Buscarons, 18',
  city: '08022 Sant Gervasi, Barcelona',
  phone: '93 211 22 66',
  phoneHref: 'tel:+34932112266',
  email: 'info@dojosantgervasi.es',
  crest: 'escudo-def.jpg',
};

/* /horarios/, transcribed cell by cell. Their note above the table, verbatim:
   "Los horarios de clase pueden cambiar. Por favor avisanos si vas a asistir
   para que podamos informarte si es necesario." That sentence is the whole
   reason this booking flow exists. */
export const timetableNote =
  'Los horarios de clase pueden cambiar. Por favor avísanos si vas a asistir para que podamos informarte si es necesario.';

export const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export const timetable = [
  {
    time: '10:00 – 11:00',
    slots: [
      ['Judo adulto (+15)'],
      ['Kickboxing (+15)'],
      ['Judo adulto (+15)'],
      ['Kickboxing (+15)'],
      [],
    ],
  },
  {
    time: '17:30 – 18:30',
    slots: [
      ['Karate alevín (5 a 10 años)', 'BJJ (8 a 15 años)'],
      ['Karate alevín B (5 a 10 años)', 'Judo alevín (5 a 10 años)'],
      ['Karate alevín (5 a 10 años)', 'BJJ (8 a 15 años)'],
      ['Karate alevín B (5 a 10 años)', 'Judo alevín (5 a 10 años)'],
      ['Acondicionamiento físico (+15)'],
    ],
  },
  {
    time: '18:30 – 19:30',
    slots: [
      ['Karate juvenil (11 a 15 años)'],
      ['Karate juvenil B (11 a 15 años)', 'Judo juvenil (11 a 15 años)'],
      ['Karate juvenil (11 a 15 años)'],
      ['Karate juvenil B (11 a 15 años)', 'Judo juvenil (11 a 15 años)'],
      ['Kickboxing (+15)'],
    ],
  },
  {
    time: '19:30 – 20:30',
    slots: [
      ['Krav Maga (+15)', 'Muay Thai'],
      ['Kickboxing (+15)', 'BJJ (+15)'],
      ['Krav Maga (+15)', 'Muay Thai'],
      ['Kickboxing (+15)', 'BJJ (+15)'],
      [],
    ],
  },
  {
    time: '20:30 – 21:30',
    slots: [
      ['Karate (+15)'],
      ['MMA (+15)', 'Judo adulto (+15)'],
      ['Karate (+15)'],
      ['MMA (+15)', 'Judo adulto (+15)'],
      [],
    ],
  },
];

/* /tarifas/, exactly as published. Not used to price the free trial, shown so
   the visitor knows what happens after it. */
export const tarifas = [
  { label: '1 día a la semana', price: '50€', unit: '/mes' },
  { label: '2 a 3 días a la semana', price: '74€', unit: '/mes', featured: true },
  { label: '2ª actividad', price: '20€', unit: '/mes' },
  { label: 'Asistencia ilimitada', price: '100€', unit: '/mes' },
  { label: 'Ac. física viernes (alumnos y familiares)', price: '20€', unit: '/mes' },
  { label: 'Ac. física viernes (clase única)', price: '35€', unit: '/mes' },
  { label: 'Clase suelta', price: '15€', unit: '/sesión' },
];

/* The discipline checklist from their own /contacto/ free-class form, with the
   typo corrected. */
export const disciplines = [
  { key: 'judo', name: 'Judo', img: 'karate3-2-1.jpg' },
  { key: 'karate', name: 'Karate', img: 'KARATE.jpg' },
  { key: 'kickboxing', name: 'Kickboxing', img: 'kick2-2.jpg' },
  { key: 'kravmaga', name: 'Krav Maga', img: 'dojo-sant-gervasi-krav-maga.jpg' },
  { key: 'bjj', name: 'Brazilian Jiu Jitsu', img: 'Dojo-Sant-Gervasi-brasilian-jujitsu.jpg' },
  { key: 'dpf', name: 'Defensa personal femenina', img: 'dojo-sant-gervasi-defensa-personal-femenina.png' },
  { key: 'acond', name: 'Acondicionamiento físico', img: 'dojo-sant-gervasi-acondicionamiento-fisico.png' },
  { key: 'mma', name: 'MMA', img: 'MMA.jpg' },
  { key: 'muaythai', name: 'Muay Thai', img: 'two-boxers-fight-with-the-martial-arts-of-muay-tha-2023-11-27-04-56-34-utc.jpg' },
  { key: 'infantil', name: 'Judo y karate para niños', img: 'girl-in-kimono-practicing-karate-2023-11-27-05-04-38-utc.jpg' },
];

/* Map a timetable cell to a discipline key so picking a discipline filters the
   real timetable rather than a made-up one. */
export function disciplineOf(cell) {
  const c = cell.toLowerCase();
  if (c.includes('judo') && (c.includes('alevín') || c.includes('alevin') || c.includes('juvenil'))) return 'infantil';
  if (c.includes('karate') && (c.includes('alevín') || c.includes('alevin') || c.includes('juvenil'))) return 'infantil';
  if (c.includes('bjj') && c.includes('8 a 15')) return 'infantil';
  if (c.includes('judo')) return 'judo';
  if (c.includes('karate')) return 'karate';
  if (c.includes('kickboxing')) return 'kickboxing';
  if (c.includes('krav')) return 'kravmaga';
  if (c.includes('bjj')) return 'bjj';
  if (c.includes('acondicionamiento')) return 'acond';
  if (c.includes('mma')) return 'mma';
  if (c.includes('muay')) return 'muaythai';
  return null;
}

/* Every slot in the week, flattened, for the booking step. */
export function allSlots() {
  const out = [];
  timetable.forEach((row) => {
    row.slots.forEach((cells, dayIndex) => {
      cells.forEach((cell) => {
        out.push({
          day: days[dayIndex],
          dayIndex,
          time: row.time,
          cell,
          discipline: disciplineOf(cell),
        });
      });
    });
  });
  return out;
}
