export default function Sidebar({ categories, active, onSelect, open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={onClose} aria-hidden="true" />}
      <aside
        className={`fixed inset-y-0 left-0 top-12 z-40 w-56 overflow-y-auto bg-ink-800 transition-transform lg:static lg:top-auto lg:z-auto lg:w-48 lg:shrink-0 lg:translate-x-0 lg:bg-transparent ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Categories"
      >
        <ul className="py-2 text-xs font-semibold">
          {categories.map((c) => (
            <li key={c}>
              <button
                onClick={() => { onSelect(c); onClose?.() }}
                aria-current={active === c ? 'true' : undefined}
                className={`block w-full border-l-2 px-3 py-2 text-left hover:bg-ink-700 ${
                  active === c ? 'border-brand bg-ink-700 text-white' : 'border-transparent text-gray-300'
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}
