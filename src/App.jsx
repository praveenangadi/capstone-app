import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import CataloguePage from './pages/CataloguePage'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'
import { OrdersPage, WishlistPage, WritersPage } from './pages/AccountPages'
import { StoreProvider } from './store/StoreProvider'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<CataloguePage />} />
            <Route path="/book/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/writers" element={<WritersPage />} />
          </Route>
          <Route element={<Layout bare />}>
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
