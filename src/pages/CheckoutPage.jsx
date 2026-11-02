import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import BookCard from '../components/BookCard'
import Button from '../components/Button'
import Field from '../components/Field'
import Icon from '../components/Icon'
import QuantityStepper from '../components/QuantityStepper'
import { formatPrice } from '../data/books'
import { useStore } from '../store/useStore'

const savedAddress = {
  firstName: 'Priya', lastName: 'Sharma', address: '12 MG Road', email: 'priya@example.com',
  city: 'Bengaluru', pin: '560001', dialCode: '+91', phone: '9876543210', state: 'Karnataka', country: 'India',
}
const emptyAddress = { firstName: '', lastName: '', address: '', email: '', city: '', pin: '', dialCode: '+91', phone: '', state: '', country: 'India' }

function SummaryRow({ label, value, strong }) {
  return (
    <div className={`flex justify-between ${strong ? 'font-semibold text-white' : ''}`}>
      <dt>{label}</dt><dd>{value}</dd>
    </div>
  )
}

export default function CheckoutPage() {
  const { totals, setQty, coupon, applyCoupon } = useStore()
  const navigate = useNavigate()
  const [useSaved, setUseSaved] = useState(false)
  const [form, setForm] = useState(emptyAddress)
  const [couponCode, setCouponCode] = useState('')
  const [couponMsg, setCouponMsg] = useState('')

  const values = useSaved ? savedAddress : form
  const bind = (name) => ({
    name,
    value: values[name],
    disabled: useSaved,
    required: true,
    onChange: (e) => setForm((f) => ({ ...f, [name]: e.target.value })),
  })

  const onApply = () => {
    setCouponMsg(applyCoupon(couponCode) ? 'Coupon applied' : 'Invalid coupon (try BOOK100)')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    navigate('/payment')
  }

  if (totals.items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center text-sm">
        <p className="mb-4 text-gray-300">Your cart is empty.</p>
        <Link to="/">Browse the catalogue</Link>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-[1400px] px-4 py-4">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />
      <h1 className="mb-3 mt-2 text-sm">Shopping Cart</h1>

      <section className="bg-ink-700 p-4 sm:p-6" aria-label="Cart items">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {totals.items.map(({ book, qty }) => (
            <BookCard key={book.id} book={book}>
              <QuantityStepper value={qty} onChange={(n) => setQty(book.id, n)} />
            </BookCard>
          ))}
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-[3fr_2fr]">
        <section className="bg-ink-700 p-4 sm:p-6" aria-label="Address">
          <h2 className="mb-3 text-sm">Address</h2>
          <label className="mb-4 flex items-center gap-2 text-xs">
            <input type="checkbox" checked={useSaved} onChange={(e) => setUseSaved(e.target.checked)} className="accent-brand" />
            Use Saved Address
          </label>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="First Name" placeholder="First Name" {...bind('firstName')} />
            <Field label="Last Name" placeholder="Last Name" {...bind('lastName')} />
            <Field label="Address" placeholder="Address Line 2" {...bind('address')} />
            <Field label="e-mail" type="email" placeholder="e-mail" className="sm:col-span-2" {...bind('email')} />
            <Field label="City" placeholder="City" {...bind('city')} />
            <Field label="Pin" placeholder="000000" inputMode="numeric" pattern="\d{6}" title="6-digit PIN code" {...bind('pin')} />
            <div className="sm:col-span-2">
              <span className="mb-1 block text-xs text-gray-400">Phone Number</span>
              <div className="flex gap-2">
                <Field label="" aria-label="Country code" as="select" options={['+91', '+1', '+44']} className="w-24 [&>label]:hidden" {...bind('dialCode')} />
                <Field label="" aria-label="Phone number" type="tel" placeholder="12345567890" inputMode="numeric" pattern="\d{10}" title="10-digit phone number" className="flex-1 [&>label]:hidden" {...bind('phone')} />
              </div>
            </div>
            <Field label="State" placeholder="State" {...bind('state')} />
            <Field label="Country" as="select" options={['India', 'United States', 'United Kingdom']} {...bind('country')} />
          </div>
        </section>

        <section className="flex flex-col gap-4 bg-ink-700 p-4 sm:flex-row sm:p-6" aria-label="Grand total">
          <div className="hidden w-28 shrink-0 self-stretch rounded-sm bg-[#1b4f80] sm:block" aria-hidden="true" />
          <div className="flex-1 text-xs">
            <h2 className="mb-3 text-sm">Grand Total</h2>
            <dl className="space-y-2 text-gray-300">
              <SummaryRow label={`Price (${totals.count} item${totals.count > 1 ? 's' : ''})`} value={`${formatPrice(totals.price)}.00`} />
              <SummaryRow label="Tax" value={`${formatPrice(totals.tax)}.00`} />
              <SummaryRow label="Delivery Charges" value="Free" />
            </dl>
            <div className="my-3 flex border-t border-ink-500 pt-3">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Apply Coupon"
                aria-label="Coupon code"
                className="input min-w-0 flex-1 bg-transparent"
              />
              <button type="button" onClick={onApply} className="bg-brand px-4 text-white hover:bg-brand-hover">Apply</button>
            </div>
            {(couponMsg || coupon) && <p className="mb-2 text-[11px] text-gray-400" role="status">{couponMsg}</p>}
            <dl className="space-y-2 text-gray-300">
              <SummaryRow label="Discount" value={formatPrice(totals.discount)} />
              <div className="border-t border-ink-500 pt-2">
                <SummaryRow label="Total Amount" value={formatPrice(totals.total)} strong />
              </div>
            </dl>
            <div className="mt-4 flex justify-end">
              <Button type="submit" icon={<Icon name="card" size={14} />}>Pay Now</Button>
            </div>
          </div>
        </section>
      </div>
    </form>
  )
}
