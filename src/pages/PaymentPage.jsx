import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Field from '../components/Field'
import Icon from '../components/Icon'
import { formatPrice } from '../data/books'
import { useStore } from '../store/useStore'

const methods = ['Credit Card', 'Debit card', 'UPI', 'Wallet']

function CardForm() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Card Number" placeholder="XXXX-XXXX-XXXX-XXXX" inputMode="numeric" pattern="[\d\- ]{16,19}" required />
      <Field label="Name on Card" placeholder="Name" autoComplete="cc-name" required />
      <Field label="CVV" placeholder="XXX" inputMode="numeric" pattern="\d{3,4}" maxLength={4} type="password" required />
      <Field label="Date of Expiry" placeholder="MM/YYYY" pattern="(0[1-9]|1[0-2])\/\d{4}" title="MM/YYYY" required />
    </div>
  )
}

function UpiForm() {
  return <Field label="UPI ID" placeholder="name@bank" pattern="[\w.\-]+@[\w]+" title="e.g. name@bank" required />
}

function WalletForm() {
  return <Field label="Wallet" as="select" options={['Paytm', 'PhonePe', 'Amazon Pay']} />
}

export default function PaymentPage() {
  const { totals, placeOrder } = useStore()
  const navigate = useNavigate()
  const [method, setMethod] = useState(methods[0])

  if (totals.items.length === 0) return <Navigate to="/" replace />

  const onSubmit = (e) => {
    e.preventDefault()
    placeOrder()
    navigate('/success')
  }

  return (
    <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-2xl bg-ink-700 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-900 px-4 py-3 text-sm">
          <h1>Complete Payment</h1>
          <p className="font-semibold">Payable Amount: {formatPrice(totals.total)}</p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div role="tablist" aria-label="Payment method" className="flex sm:w-36 sm:flex-col">
            {methods.map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={method === m}
                onClick={() => setMethod(m)}
                className={`flex-1 border-l-2 px-3 py-3 text-left text-xs sm:flex-none ${
                  method === m ? 'border-brand bg-ink-700 font-semibold text-white' : 'border-transparent bg-ink-600 text-gray-300 hover:bg-ink-500'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="flex-1 p-4" role="tabpanel">
            {(method === 'Credit Card' || method === 'Debit card') && <CardForm key={method} />}
            {method === 'UPI' && <UpiForm />}
            {method === 'Wallet' && <WalletForm />}
            <div className="mt-6 flex justify-end">
              <Button type="submit" icon={<Icon name="card" size={14} />}>Pay Now</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
