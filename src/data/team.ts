// Equipo (página Nosotros). Agrega foto con la ruta o URL en `photo`; sin foto se muestra la inicial.

export type TeamMember = { name: string; role: string; bio: string; photo?: string };

export const team: TeamMember[] = [
  { name: "Nombre y apellido", role: "Dirección y diseño", bio: "Breve presentación: trayectoria, especialidad y enfoque de trabajo." },
  { name: "Nombre y apellido", role: "Producción y taller", bio: "Breve presentación: experiencia en fabricación y control de calidad." },
  { name: "Nombre y apellido", role: "Atención al cliente", bio: "Breve presentación: cómo acompaña a cada cliente durante el proyecto." },
];
