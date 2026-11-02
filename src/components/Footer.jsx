export default function Footer() {
  return (
    <footer className="mt-10 border-t border-ink-700 bg-ink-800 px-4 py-6 text-xs text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Book Worm. All rights reserved.</span>
        <nav className="flex gap-4">
          <a href="#about">About</a>
          <a href="#help">Help</a>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </nav>
      </div>
    </footer>
  )
}
