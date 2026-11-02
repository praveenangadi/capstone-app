import { useState } from 'react'

function Star({ filled, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" className={className} fill={filled ? '#f1c21b' : 'none'} stroke={filled ? '#f1c21b' : '#c6c6c6'} strokeWidth="1.6" aria-hidden="true">
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
    </svg>
  )
}

/** Read-only when `onChange` is omitted; interactive star picker otherwise. */
export default function Rating({ value = 0, onChange }) {
  const [hover, setHover] = useState(0)
  const shown = hover || value
  return (
    <span className="inline-flex gap-0.5" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) =>
        onChange ? (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
          >
            <Star filled={n <= shown} className="h-5 w-5" />
          </button>
        ) : (
          <Star key={n} filled={n <= value} />
        ),
      )}
    </span>
  )
}
