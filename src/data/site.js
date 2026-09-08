/* Every fact here was read off dojosantgervasi.es on 2026-08-12 and re-read on
   2026-09-08 (rendered pages, not raw HTML). Nothing is invented. The ONLY deliberate change from their live site is the
   spelling of "Acondicionamiento", which their own /horarios/ table gets right
   and their /contacto/ form gets wrong. */

export const brand = {
  name: 'Dojo Sant Gervasi',
  claim: 'Artes marciales y defensa personal en Barcelona',
  /* Their words, not ours: "Llevamos más de 40 años impartiendo clases"
     (/nuestros-valores/), "Más de 40 años de experiencia nos avalan" (/clases/) and
     "+ 40 años de experiencia" (/equipo/). They publish no founding year anywhere,
     so we do not print one. Kept here for the record and deliberately NOT rendered:
     the only years figure on the page is Lluís's own "50 años" from the brief, and
     two different numbers on one site would read as a mistake. */
  experience: 'más de 40 años',
  address: 'Carrer de Buscarons, 18',
  city: '08022 Sant Gervasi, Barcelona',
  phone: '93 211 22 66',
  phoneHref: 'tel:+34932112266',
  email: 'info@dojosantgervasi.es',
  crest: 'escudo-def.jpg',
  /* The WhatsApp number their own joinchat widget dials on every page of
     dojosantgervasi.es (data-settings telephone: 34634710979), read off the
     rendered page on 2026-09-08. */
  whatsapp: '+34 634 71 09 79',
  whatsappHref: 'https://wa.me/34634710979',
  /* Verbatim off the "Encuéntranos" block of their discipline pages, e.g.
     /clases/brasilian-jiu-jitsu/. Their /tarifas/ sidebar splits the same hours
     into "Mañanas" and "Tardes". */
  hours: 'De 9:00 a 13:30 y de 17:00 a 22:00',
  /* /nosotros/: "Somos una escuela de valores." */
  valuesClaim: 'Escuela de valores',
  /* /nuestros-valores/, their four words. */
  values: ['Esfuerzo', 'Disciplina', 'Respeto', 'Autocontrol'],
  /* Lluis Escalona's brief of 2026-09-07, his wording for the home header.
     Their site says "más de 40 años" (/equipo/, /nuestros-valores/) and
     "Más de 45" (kids page); the 50 is his, from the brief. */
  briefHeadline: 'Artes marciales en Sant Gervasi',
  briefSub: '50 años formando personas dentro y fuera del tatami',
};

/* /horarios/, transcribed cell by cell, re-read on 2026-09-08: since August they
   have added two Friday BJJ sessions (Open mat 17:30 and BJJ (+15) 18:30). Their note above the table, verbatim:
   "Los horarios de clase pueden cambiar. Por favor avisanos si vas a asistir
   para que podamos informarte si es necesario." That sentence is the whole
   reason this booking flow exists. */
export const timetableNote =
  'Los horarios de clase pueden cambiar. Por favor avísanos si vas a asistir para que podamos informarte si es necesario.';

export const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export const timetable = [
  {
    time: '10:00 a 11:00',
    slots: [
      ['Judo adulto (+15)'],
      ['Kickboxing (+15)'],
      ['Judo adulto (+15)'],
      ['Kickboxing (+15)'],
      [],
    ],
  },
  /* The open mat row is the one cell on this table that does NOT come from
     /horarios/. Their published table puts OPEN MAT BJJ (+15) in the Friday
     17:30 to 18:30 cell, next to Acondicionamiento Físico. Lluís gave the BJJ
     week by WhatsApp on 2026-09-08 and put the Friday open mat at 16:30 to
     17:30, an hour earlier. His message is newer, so it wins here and on the BJJ
     page. Worth one line of confirmation from him before this goes live. */
  {
    time: '16:30 a 17:30',
    slots: [[], [], [], [], ['Open mat BJJ (+15)']],
  },
  {
    time: '17:30 a 18:30',
    slots: [
      ['Karate alevín (5 a 10 años)', 'BJJ (8 a 15 años)'],
      ['Karate alevín B (5 a 10 años)', 'Judo alevín (5 a 10 años)'],
      ['Karate alevín (5 a 10 años)', 'BJJ (8 a 15 años)'],
      ['Karate alevín B (5 a 10 años)', 'Judo alevín (5 a 10 años)'],
      ['Acondicionamiento físico (+15)'],
    ],
  },
  {
    time: '18:30 a 19:30',
    slots: [
      ['Karate juvenil (11 a 15 años)'],
      ['Karate juvenil B (11 a 15 años)', 'Judo juvenil (11 a 15 años)'],
      ['Karate juvenil (11 a 15 años)'],
      ['Karate juvenil B (11 a 15 años)', 'Judo juvenil (11 a 15 años)'],
      ['Kickboxing (+15)', 'BJJ (+15)'],
    ],
  },
  {
    time: '19:30 a 20:30',
    slots: [
      ['Krav Maga (+15)', 'Muay Thai'],
      ['Kickboxing (+15)', 'BJJ (+15)'],
      ['Krav Maga (+15)', 'Muay Thai'],
      ['Kickboxing (+15)', 'BJJ (+15)'],
      [],
    ],
  },
  {
    time: '20:30 a 21:30',
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
  { label: 'Entrenamientos personales', price: 'A convenir', unit: '' },
  { label: 'Matrícula de inscripción', price: 'Gratis', unit: '' },
  { label: 'Clase de prueba', price: 'Gratis', unit: '' },
];

/* The two Avisos at the foot of /tarifas/, verbatim in substance. They are
   mandatory costs, so a price panel that hides them is not "claro". */
export const avisos = [
  'Cada actividad requiere la compra de un equipo o material específico.',
  'Para la práctica en el Dojo es obligatorio el pago anual del seguro deportivo.',
];

/* The discipline checklist from their own /contacto/ free-class form, with three
   deliberate changes: the "Acondiciomamiento" typo corrected, Muay Thai added
   (it is on their timetable and in their nav but missing from the form), and
   their three children's rows merged into one tile. Every name below is spelled
   and capitalised as the /clases/ index and the main nav spell it, re-read
   2026-09-08. */
export const disciplines = [
  { key: 'judo', name: 'Judo', img: 'karate3-2-1.jpg' },
  { key: 'karate', name: 'Karate', img: 'KARATE.jpg' },
  { key: 'kickboxing', name: 'Kickboxing', img: 'kick2-2.jpg' },
  { key: 'kravmaga', name: 'Krav Maga', img: 'dojo-sant-gervasi-krav-maga.jpg' },
  { key: 'bjj', name: 'Brazilian Jiu Jitsu', img: 'Dojo-Sant-Gervasi-brasilian-jujitsu.jpg' },
  { key: 'dpf', name: 'Defensa Personal Femenina', img: 'dojo-sant-gervasi-defensa-personal-femenina.jpg' },
  { key: 'acond', name: 'Acondicionamiento Físico', img: 'dojo-sant-gervasi-acondicionamiento-fisico.jpg' },
  { key: 'mma', name: 'MMA', img: 'MMA.jpg' },
  { key: 'muaythai', name: 'Muay Thai', img: 'two-boxers-fight-with-the-martial-arts-of-muay-tha-2023-11-27-04-56-34-utc.jpg' },
  { key: 'infantil', name: 'Judo, Karate y BJJ para niños', img: 'girl-in-kimono-practicing-karate-2023-11-27-05-04-38-utc.jpg' },
];

/* Map a timetable cell to the discipline keys it belongs under, so picking a
   discipline filters the real timetable rather than a made-up one.
   Almost every cell belongs to exactly one. The exception is the kids' BJJ
   session: their own /contacto/ checklist calls the children's option "judo y
   karate para niños", so a parent looking for BJJ for an 8 year old would pick
   Brazilian Jiu Jitsu and see only the adult slots. It belongs under both. */
export function disciplinesOf(cell) {
  const c = cell.toLowerCase();
  if (c.includes('bjj') && c.includes('8 a 15')) return ['infantil', 'bjj'];
  const one = disciplineOf(cell);
  return one ? [one] : [];
}

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
          disciplines: disciplinesOf(cell),
        });
      });
    });
  });
  return out;
}


/* /nosotros/equipo/, the roster exactly as published. Nobody is added, nobody is
   promoted: the grades and titles below are their own words. */
export const teachers = [
  { name: 'Lluis Escalona', role: 'Krav Maga' },
  { name: 'Arnald Armentano', role: 'Judo alevín e infantil' },
  { name: 'Lluis Escalona', role: 'Karate cadete, juvenil y adultos' },
  { name: 'Carlos Perez', role: 'Karate alevín e infantil' },
  { name: 'Pompeu Fabregas', role: 'Karate deportivo y competición' },
  { name: 'Ben Petrequin', role: 'Judo adultos' },
  /* /nosotros/equipo/ lists Víctor Aparicio under "Brazilian Jiu Jitsu y MMA".
     On 2026-09-08 Lluís told us by WhatsApp that the BJJ profesor is Steve
     Luzardo, so BJJ is listed under Steve and Víctor keeps MMA. If Víctor also
     still teaches BJJ, this is the line to correct. */
  { name: 'Víctor Aparicio', role: 'MMA' },
  { name: 'Steve Luzardo', role: 'Brazilian Jiu Jitsu, cinturón negro' },
  { name: 'Alex Usieto', role: 'Muay Thai' },
];

/* The BJJ instructor, as Lluís Escalona gave him to us by WhatsApp on
   2026-09-08. Their site still names Víctor for BJJ; Lluís's message is newer
   and specific, so this page follows it. The credential lines and the way of
   teaching are his own words, shortened. He has no photo of Steve yet, so the
   page shows a monogram tile rather than a stock face or a broken frame. */
export const bjjTeacher = {
  name: 'Steve Luzardo',
  belt: 'Cinturón negro',
  role: 'Profesor de Brazilian Jiu Jitsu',
  initials: 'SL',
  photo: null,
  credentials: [
    'Más de 15 años entrenando y enseñando Brazilian Jiu Jitsu',
    'Profesor titulado de la filial de Cícero Costha',
    'Alumno directo de Javier Feliubadaló, con quien sigue formándose',
  ],
  approach: [
    'Cada alumno tiene su propio ritmo y su propio camino dentro del BJJ. Por eso sus clases combinan una enseñanza técnica y estructurada con un seguimiento cercano de la evolución de cada practicante, adaptando el entrenamiento a su nivel, su experiencia y sus características.',
    'En sus sesiones se trabaja de forma progresiva la técnica, el control, las posiciones, las finalizaciones y la aplicación práctica del BJJ. La idea no es memorizar movimientos, sino entender por qué y cuándo se usa cada recurso.',
    'Así, quien llega al Brazilian Jiu Jitsu por primera vez se integra y progresa con seguridad, y quien ya lleva años sigue desarrollando su juego.',
  ],
  /* His closing line, kept because it is the one sentence that says what the
     tatami actually feels like. */
  closing:
    'Por encima de todo, Steve busca crear en el tatami un ambiente de trabajo exigente, cercano y respetuoso, en el que cada alumno pueda aprender, ponerse a prueba y disfrutar del proceso de mejora.',
};

/* Their /clases/brasilian-jiu-jitsu/ page, in their own terms. "Duración 60
   minutos" and the two age groups are printed there; the weekly sessions come
   from /horarios/, which as of 2026-09-08 lists two more than the BJJ page does
   (Friday open mat and Friday BJJ +15). We show the timetable and let their own
   note about changes do the rest. */
export const bjjFacts = {
  duration: '60 minutos',
  groups: [
    { label: 'Niños y jóvenes', detail: 'entre los 8 y los 15 años' },
    { label: 'Adultos', detail: 'a partir de 15 años' },
  ],
};

/* Every BJJ line on the weekly table, in table order. */
export function bjjSlots() {
  return allSlots().filter((s) => s.disciplines.includes('bjj'));
}
