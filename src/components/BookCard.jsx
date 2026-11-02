import { Link } from 'react-router-dom'
import BookCover from './BookCover'
import { deliveryDate, formatPrice } from '../data/books'

/**
 * Reusable book card. `layout="row"` shows cover beside details (catalogue, related reads).
 * `children` renders at the bottom for extra actions (e.g. a "Buy Again" button).
 */
export default function BookCard({ book, compact = false, children }) {
  return (
    <article className="flex gap-3">
      <Link to={`/book/${book.id}`} className={`shrink-0 ${compact ? 'w-24' : 'w-28 sm:w-32'} text-[0.7rem] sm:text-xs`} aria-label={`View ${book.title}`}>
        <BookCover book={book} />
      </Link>
      <div className="min-w-0 text-xs">
        <h3 className="text-sm text-gray-100">
          <Link to={`/book/${book.id}`} className="text-gray-100 hover:underline">{book.title}</Link>
        </h3>
        <p className="mt-0.5 text-[11px]">by <a href="#author" className="underline">{book.author}</a></p>
        <p className="mt-2 line-clamp-2 text-[11px] text-gray-400">{book.description}</p>
        <p className="mt-2 text-[11px] text-gray-200">{book.format}</p>
        <p className="text-[11px]">
          {book.genres.map((g, i) => (
            <span key={g}>
              <a href="#genre" className="underline">{g}</a>{i < book.genres.length - 1 && ', '}
            </span>
          ))}
        </p>
        <p className="mt-2 text-base font-semibold text-white">{formatPrice(book.price)}</p>
        <p className="text-[10px] text-gray-300">Delivery by <strong>{deliveryDate}</strong></p>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </article>
  )
}
