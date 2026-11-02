export default function QuantityStepper({ value, onChange }) {
  return (
    <div className="inline-flex items-center border-b border-ink-500 text-xs">
      <span className="w-10 px-2 py-1.5" aria-live="polite">{value}</span>
      <button type="button" aria-label="Decrease quantity" className="px-3 py-1.5 hover:bg-ink-600" onClick={() => onChange(value - 1)}>−</button>
      <span className="h-4 w-px bg-ink-500" />
      <button type="button" aria-label="Increase quantity" className="px-3 py-1.5 hover:bg-ink-600" onClick={() => onChange(value + 1)}>+</button>
    </div>
  )
}
