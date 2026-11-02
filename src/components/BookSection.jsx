import BookCard from './BookCard'

export default function BookSection({ title, books, renderAction }) {
  if (books.length === 0) return null
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-sm text-gray-100">{title}</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 2xl:grid-cols-3">
        {books.map((b) => (
          <BookCard key={b.id} book={b}>{renderAction?.(b)}</BookCard>
        ))}
      </div>
    </section>
  )
}
