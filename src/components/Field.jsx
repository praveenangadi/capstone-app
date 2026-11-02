import { useId } from 'react'

/** Labelled form control. `as="select"` renders a select with `options`. */
export default function Field({ label, as = 'input', options, className = '', ...props }) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-xs text-gray-400">{label}</label>
      {as === 'select' ? (
        <select id={id} className="input" {...props}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input id={id} className="input" {...props} />
      )}
    </div>
  )
}
