const base = { width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

const paths = {
  cart: <><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.8L20 7H6" /></>,
  user: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="10" r="3" /><path d="M6.2 18.2a7 7 0 0 1 11.6 0" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  card: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 10h18" /></>,
  library: <><rect x="3" y="4" width="18" height="16" rx="1" /><path d="M9 4v16M13 8h5M13 12h5" /></>,
  check: <path d="m5 12 5 5 9-10" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  dollar: <path d="M12 3v18M16 7.5c0-1.5-1.8-2.5-4-2.5s-4 1-4 2.5 1.8 2.3 4 2.5 4 1 4 2.5-1.8 2.5-4 2.5-4-1-4-2.5" />,
}

export default function Icon({ name, size = 20, className = '' }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      {paths[name]}
    </svg>
  )
}
