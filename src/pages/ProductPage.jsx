import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import BookCover from '../components/BookCover'
import BookCard from '../components/BookCard'
import Button from '../components/Button'
import Icon from '../components/Icon'
import Rating from '../components/Rating'
import { authors, deliveryDate, formatPrice, getBook } from '../data/books'
import { useStore } from '../store/useStore'

const MAX_REVIEW = 100

function BackCover({ book }) {
  return (
    <div className="flex aspect-[2/3] flex-col justify-between bg-[#fbd116] p-4 text-[0.65rem] leading-snug text-black">
      <p className="text-center italic">“A refreshing path to clarity in a cluttered world.”</p>
      <p>Discover how less can truly be more. In <em>{book.title}</em>, {book.author} guides you through practical strategies to declutter your mind, space, and schedule.</p>
      <div>
        <p className="font-bold">About the Author</p>
        <p>{book.author} is a productivity coach and advocate for intentional living.</p>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-bold">Q</span>
        <span className="h-6 w-16 bg-[repeating-linear-gradient(90deg,#000_0_2px,#fff_2px_4px)]" />
      </div>
    </div>
  )
}

function ReviewForm({ onSubmit }) {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)
  const submit = (e) => {
    e.preventDefault()
    if (!text.trim() || !rating) return
    onSubmit({ name: 'You', rating, text: text.trim() })
    setText('')
    setRating(0)
  }
  return (
    <form onSubmit={submit} className="flex flex-col">
      <div className="flex justify-between text-[11px] text-gray-400">
        <label htmlFor="review">Leave Your Review</label>
        <span>{text.length}/{MAX_REVIEW}</span>
      </div>
      <textarea
        id="review"
        value={text}
        maxLength={MAX_REVIEW}
        onChange={(e) => setText(e.target.value)}
        placeholder="Placeholder text"
        className="input mt-1 h-28 resize-y bg-ink-700"
      />
      <div className="mt-3 flex items-center justify-between">
        <Rating value={rating} onChange={setRating} />
        <Button type="submit" disabled={!text.trim() || !rating} icon={<Icon name="arrow" size={14} />}>Submit</Button>
      </div>
    </form>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const book = getBook(id)
  const { addToCart, toggleWishlist, wishlist, reviews, addReview, recommendFor, totals } = useStore()

  if (!book) {
    return (
      <div className="p-8 text-center">
        <p className="mb-3">Book not found.</p>
        <Link to="/">Back to catalogue</Link>
      </div>
    )
  }

  const author = authors[book.author]
  const bookReviews = reviews[book.id] ?? []
  const inWishlist = wishlist.includes(book.id)
  const inCart = totals.items.some((i) => i.bookId === book.id)
  const related = recommendFor(book.id)

  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-4 lg:grid-cols-[1fr_20rem]">
      <div className="min-w-0">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Non-Fiction', to: '/' }, { label: book.genres[1] ?? book.category, to: '/' }]} />

        <div className="mt-4 grid gap-6 md:grid-cols-[repeat(2,minmax(0,13rem))_1fr]">
          <BookCover book={book} className="text-sm" />
          <BackCover book={book} />
          <div className="text-xs md:col-span-2 lg:col-span-1">
            <h1 className="text-base text-white">{book.title}</h1>
            <p className="mt-1">by <a href="#author" className="underline">{book.author}</a></p>
            <p className="mt-2 text-gray-400">{book.description}</p>
            <p className="mt-3 text-[11px]">Published by: <a href="#publisher" className="underline">{book.publisher}</a></p>
            <p className="mt-3 text-gray-200">{book.format}</p>
            <p>{book.genres.map((g, i) => <span key={g}><a href="#genre" className="underline">{g}</a>{i < book.genres.length - 1 && ', '}</span>)}</p>
            <p className="mt-5 text-2xl font-semibold text-white">{formatPrice(book.price)}</p>
            <p className="text-[11px] text-gray-300">Delivery by <strong>{deliveryDate}</strong></p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button icon={<Icon name="cart" size={14} />} onClick={() => addToCart(book.id)}>
                {inCart ? 'Add another' : 'Add to Cart'}
              </Button>
              <Button variant="secondary" aria-pressed={inWishlist} icon={<Icon name="bookmark" size={14} />} onClick={() => toggleWishlist(book.id)}>
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
            {inCart && <p className="mt-2"><Link to="/checkout">Go to checkout →</Link></p>}

            <dl className="mt-5 grid grid-cols-3 gap-3 text-[11px]">
              <div><dt className="flex items-center gap-1 text-gray-300"><Icon name="globe" size={12} /> Language</dt><dd><a href="#lang" className="underline">{book.language}</a></dd></div>
              <div><dt className="text-gray-300">Rating</dt><dd><Rating value={book.rating} /></dd></div>
              <div><dt className="flex items-center gap-1 text-gray-300"><Icon name="dollar" size={12} /> Sells</dt><dd className="font-semibold">{book.sold} copies sold</dd></div>
            </dl>
          </div>
        </div>

        {author && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm">About the writer</h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-ink-600 text-xl font-semibold" aria-hidden="true">
                {book.author.split(' ').map((w) => w[0]).join('')}
              </div>
              <div>
                <h3 className="text-sm">{book.author}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-gray-400">{author.bio}</p>
              </div>
            </div>
          </section>
        )}

        <section className="mt-8">
          <h2 className="mb-3 text-sm">Reviews</h2>
          <div className="grid gap-6 md:grid-cols-[minmax(0,22rem)_1fr]">
            <ReviewForm onSubmit={(r) => addReview(book.id, r)} />
            <ul className="space-y-5">
              {bookReviews.length === 0 && <li className="text-xs text-gray-400">No reviews yet. Be the first!</li>}
              {bookReviews.map((r) => (
                <li key={r.id} className="text-xs">
                  <p className="text-sm">{r.name}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-gray-400">{r.text}</p>
                  <div className="mt-2"><Rating value={r.rating} /></div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <aside className="lg:border-l lg:border-ink-700 lg:pl-6" aria-label="Related reads">
        <h2 className="mb-4 text-sm">Related Reads</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {related.map((b) => <BookCard key={b.id} book={b} compact />)}
        </div>
      </aside>
    </div>
  )
}
