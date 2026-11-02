import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs">
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <span key={item.label} className="flex items-center gap-1">
            {item.to && !last ? <Link to={item.to}>{item.label}</Link> : <span className="text-gray-200">{item.label}</span>}
            {!last && <span className="text-gray-500">/</span>}
          </span>
        )
      })}
    </nav>
  )
}
