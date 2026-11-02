import { Link } from 'react-router-dom'
import BookSection from '../components/BookSection'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { getBook } from '../data/books'
import { useStore } from '../store/useStore'

export function OrdersPage() {
  const { orders, addToCart } = useStore()
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <h1 className="mb-4 text-base">My Orders</h1>
      {[...orders].reverse().map((o) => (
        <BookSection
          key={o.id}
          title={`${o.id} · ${o.date}`}
          books={o.items.map((i) => getBook(i.bookId))}
          renderAction={(b) => (
            <Button variant="secondary" className="!py-1.5 text-xs" icon={<Icon name="cart" size={14} />} onClick={() => addToCart(b.id)}>
              Buy again
            </Button>
          )}
        />
      ))}
    </div>
  )
}

export function WishlistPage() {
  const { wishlist, toggleWishlist } = useStore()
  const items = wishlist.map(getBook)
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <h1 className="mb-4 text-base">My Wishlist</h1>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400">Nothing here yet. <Link to="/">Browse books</Link></p>
      ) : (
        <BookSection
          title=""
          books={items}
          renderAction={(b) => (
            <Button variant="secondary" className="!py-1.5 text-xs" onClick={() => toggleWishlist(b.id)}>Remove</Button>
          )}
        />
      )}
    </div>
  )
}

export function WritersPage() {
  const { purchased } = useStore()
  const names = [...new Set(purchased.map((b) => b.author))]
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <h1 className="mb-4 text-base">My Writers</h1>
      {names.length === 0 ? (
        <p className="text-sm text-gray-400">Authors you have bought from will appear here.</p>
      ) : (
        <ul className="space-y-1 text-sm">{names.map((n) => <li key={n}>{n}</li>)}</ul>
      )}
    </div>
  )
}
