import { Link, Navigate } from 'react-router-dom'
import BookCard from '../components/BookCard'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { getBook } from '../data/books'
import { useStore } from '../store/useStore'

export default function SuccessPage() {
  const { lastOrder } = useStore()
  if (!lastOrder) return <Navigate to="/" replace />

  return (
    <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center p-4">
      <section className="w-full max-w-3xl bg-ink-700 p-6 text-center shadow-xl sm:p-8" role="status">
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
          <Icon name="check" />
        </span>
        <p className="mt-4 text-sm">
          Your purchase of the<br />following reads is successful
        </p>
        <p className="mt-1 text-[11px] text-gray-400">Order {lastOrder.id}</p>
        <div className="mt-6 grid gap-6 text-left sm:grid-cols-2">
          {lastOrder.items.map((i) => <BookCard key={i.bookId} book={getBook(i.bookId)} compact />)}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/" className="text-white hover:no-underline">
            <Button type="button" icon={<Icon name="library" size={14} />}>Continue your Shopping</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
