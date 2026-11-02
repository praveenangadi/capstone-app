export default function BookCover({ book, className = '' }) {
  const { bg, fg, accent, sub } = book.cover
  const titleWords = book.title.replace(/^The /i, '').toUpperCase()
  return (
    <div
      className={`relative flex aspect-[2/3] flex-col items-center justify-between overflow-hidden p-2 text-center ${className}`}
      style={{ backgroundColor: bg, color: fg }}
      role="img"
      aria-label={`Cover of ${book.title} by ${book.author}`}
    >
      <div className="mt-1 w-full">
        <p className="text-[0.55em] font-semibold tracking-widest opacity-80">{book.title.startsWith('The ') ? 'THE' : ''}</p>
        <p className="font-bold leading-tight tracking-wide" style={{ fontSize: '1.05em' }}>{titleWords}</p>
      </div>
      <div className="h-[22%] w-[38%] rounded-full border-4" style={{ borderColor: accent }} />
      {sub && <p className="px-1 text-[0.4em] leading-tight opacity-80">{sub}</p>}
      <p className="mb-1 text-[0.65em] font-semibold tracking-widest">{book.author.toUpperCase()}</p>
    </div>
  )
}
