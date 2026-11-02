import { useCallback, useMemo, useState } from 'react'
import { StoreContext } from './StoreContext'
import { books, defaultReviews, getBook } from '../data/books'

const TAX_RATE = 0.12
const COUPONS = { BOOK100: 100 }

// Seed order history so "Buy Again" and "Related Reads" have something to work with.
const seedOrders = [
  { id: 'ORD-1001', date: '12 Jun', items: [{ bookId: 'art-of-focus', qty: 1 }] },
  { id: 'ORD-1002', date: '28 Jun', items: [{ bookId: 'midnight-hour', qty: 1 }, { bookId: 'final-frontier', qty: 1 }] },
]

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]) // [{ bookId, qty }]
  const [wishlist, setWishlist] = useState([])
  const [orders, setOrders] = useState(seedOrders)
  const [reviews, setReviews] = useState({ 'joy-of-minimalism': defaultReviews })
  const [coupon, setCoupon] = useState(null) // { code, amount }
  const [lastOrder, setLastOrder] = useState(null)

  const addToCart = useCallback((bookId) => {
    setCart((c) => {
      const found = c.find((i) => i.bookId === bookId)
      if (found) return c.map((i) => (i.bookId === bookId ? { ...i, qty: i.qty + 1 } : i))
      return [...c, { bookId, qty: 1 }]
    })
  }, [])

  const setQty = useCallback((bookId, qty) => {
    setCart((c) =>
      qty <= 0 ? c.filter((i) => i.bookId !== bookId) : c.map((i) => (i.bookId === bookId ? { ...i, qty } : i)),
    )
  }, [])

  const toggleWishlist = useCallback((bookId) => {
    setWishlist((w) => (w.includes(bookId) ? w.filter((id) => id !== bookId) : [...w, bookId]))
  }, [])

  const addReview = useCallback((bookId, review) => {
    setReviews((r) => ({ ...r, [bookId]: [{ id: Date.now(), ...review }, ...(r[bookId] ?? [])] }))
  }, [])

  const applyCoupon = useCallback((code) => {
    const amount = COUPONS[code.trim().toUpperCase()]
    if (!amount) return false
    setCoupon({ code: code.trim().toUpperCase(), amount })
    return true
  }, [])

  const totals = useMemo(() => {
    const items = cart.map((i) => ({ ...i, book: getBook(i.bookId) }))
    const price = items.reduce((s, i) => s + i.book.price * i.qty, 0)
    const count = items.reduce((s, i) => s + i.qty, 0)
    const tax = Math.round(price * TAX_RATE)
    const discount = coupon ? Math.min(coupon.amount, price + tax) : 0
    return { items, count, price, tax, delivery: 0, discount, total: price + tax - discount }
  }, [cart, coupon])

  const placeOrder = useCallback(() => {
    const order = {
      id: `ORD-${1000 + orders.length + 1}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      items: cart,
      total: totals.total,
    }
    setOrders((o) => [...o, order])
    setLastOrder(order)
    setCart([])
    setCoupon(null)
    return order
  }, [cart, orders.length, totals.total])

  // Books the user already bought, most recent first (for "Buy Again").
  const purchased = useMemo(() => {
    const ids = [...orders].reverse().flatMap((o) => o.items.map((i) => i.bookId))
    return [...new Set(ids)].map(getBook).filter(Boolean)
  }, [orders])

  // Recommend by category/genre overlap with order history, excluding the given book.
  const recommendFor = useCallback(
    (excludeId, limit = 3) => {
      const cats = new Set(purchased.map((b) => b.category))
      const exclude = new Set([excludeId])
      const scored = books
        .filter((b) => !exclude.has(b.id))
        .map((b) => ({ b, score: (cats.has(b.category) ? 2 : 0) + (purchased.some((p) => p.id === b.id) ? 1 : 0) }))
        .sort((a, z) => z.score - a.score || z.b.sold - a.b.sold)
      return scored.slice(0, limit).map((s) => s.b)
    },
    [purchased],
  )

  const value = {
    cart, wishlist, orders, reviews, coupon, lastOrder, totals, purchased,
    addToCart, setQty, toggleWishlist, addReview, applyCoupon, placeOrder, recommendFor,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
