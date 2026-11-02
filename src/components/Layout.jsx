import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

/** Shared chrome. `bare` pages (payment, success) use the illustrated background and no footer. */
export default function Layout({ bare = false }) {
  return (
    <div className={`flex min-h-screen flex-col ${bare ? 'page-bg' : ''}`}>
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      {!bare && <Footer />}
    </div>
  )
}
