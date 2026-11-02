export default function Button({ variant = 'primary', icon, className = '', children, ...props }) {
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand-hover',
    secondary: 'bg-ink-600 text-gray-100 hover:bg-ink-500',
  }
  return (
    <button
      className={`inline-flex items-center justify-between gap-6 px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </button>
  )
}
