import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'
import { useStore } from '../store/useStore'

const links = [
  { to: '/orders', label: 'My Orders' },
  { to: '/wishlist', label: 'My Wishlist' },
  { to: '/writers', label: 'My Writers' },
]

export default function Navbar() {
  const { totals } = useStore()
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center border-b border-ink-700 bg-ink-800 px-4 text-sm">
      <Link to="/" className="flex items-center gap-3 font-semibold text-gray-100">
        <Icon name="library" size={18} />
        Book Worm
      </Link>
      <span className="mx-4 hidden h-5 w-px bg-ink-600 sm:block" />
      <nav className="hidden gap-5 sm:flex">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className="text-xs text-gray-300 hover:text-white">
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-4 text-gray-200">
        <Link to="/checkout" aria-label={`Cart, ${totals.count} items`} className="relative text-gray-200 hover:text-white">
          <Icon name="cart" />
          {totals.count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] text-white">
              {totals.count}
            </span>
          )}
        </Link>
        <button aria-label="Account"><Icon name="user" /></button>
      </div>
    </header>
  )
}
