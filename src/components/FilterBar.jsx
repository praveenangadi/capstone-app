import Icon from './Icon'

const box = 'w-full bg-ink-700 px-3 py-2 text-left text-xs'

export function SearchBox({ value, onChange }) {
  return (
    <label className="block">
      <span className="block px-3 pt-1 text-[10px] text-gray-400">Search you want to read here</span>
      <span className="relative block">
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search"
          className={`${box} pr-8 text-gray-100 placeholder-gray-500 outline-none focus:ring-1 focus:ring-brand`}
        />
        <Icon name="search" size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
      </span>
    </label>
  )
}

export function SelectBox({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="block px-3 pt-1 text-[10px] text-gray-400">{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${box} appearance-none pr-8 text-gray-200 outline-none focus:ring-1 focus:ring-brand`}
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <Icon name="chevron" size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
      </span>
    </label>
  )
}

export default function FilterBar({ children }) {
  return <div className="grid grid-cols-1 gap-3 bg-ink-800 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_1fr]">{children}</div>
}
