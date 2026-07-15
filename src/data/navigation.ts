export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/tutoriales', label: 'Tutoriales' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
];
