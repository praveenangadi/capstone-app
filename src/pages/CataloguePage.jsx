import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import FilterBar, { SearchBox, SelectBox } from '../components/FilterBar'
import BookSection from '../components/BookSection'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { books, categories, formats, languages, priceRanges, shelves, sortOptions } from '../data/books'
import { useStore } from '../store/useStore'

const sorters = {
  Relevance: () => 0,
  'Price: Low to High': (a, b) => a.price - b.price,
  'Price: High to Low': (a, b) => b.price - a.price,
  'Title: A-Z': (a, b) => a.title.localeCompare(b.title),
}

export default function CataloguePage() {
  const { purchased, addToCart } = useStore()
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('All')
  const [format, setFormat] = useState('All')
  const [price, setPrice] = useState('All')
  const [sort, setSort] = useState('Relevance')
  const [menuOpen, setMenuOpen] = useState(false)

  const filtered = useMemo(() => {
    const range = priceRanges.find((r) => r.label === price)
    const q = query.trim().toLowerCase()
    return books
      .filter((b) => category === 'All' || b.category === category)
      .filter((b) => language === 'All' || b.language === language)
      .filter((b) => format === 'All' || b.format === format)
      .filter((b) => b.price >= range.min && b.price < range.max)
      .filter((b) => !q || `${b.title} ${b.author}`.toLowerCase().includes(q))
      .sort(sorters[sort])
  }, [category, query, language, format, price, sort])

  return (
    <div className="mx-auto flex max-w-[1600px]">
      <Sidebar categories={categories} active={category} onSelect={setCategory} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 px-4 py-4">
        <button className="mb-3 flex items-center gap-2 text-xs text-gray-300 lg:hidden" onClick={() => setMenuOpen(true)}>
          <Icon name="menu" size={16} /> Categories: {category}
        </button>

        <FilterBar>
          <SearchBox value={query} onChange={setQuery} />
          <SelectBox label="Language" value={language} onChange={setLanguage} options={languages} />
          <SelectBox label="Format (Paperback, ebook etc)" value={format} onChange={setFormat} options={formats} />
          <SelectBox label="Price Range" value={price} onChange={setPrice} options={priceRanges.map((r) => r.label)} />
          <SelectBox label="Sort by" value={sort} onChange={setSort} options={sortOptions} />
        </FilterBar>

        <div className="mt-6">
          {purchased.length > 0 && category === 'All' && !query && (
            <BookSection
              title="Buy It Again"
              books={purchased.slice(0, 3)}
              renderAction={(b) => (
                <Button variant="secondary" className="!py-1.5 text-xs" icon={<Icon name="cart" size={14} />} onClick={() => addToCart(b.id)}>
                  Buy again
                </Button>
              )}
            />
          )}
          {shelves.map((s) => (
            <BookSection key={s.key} title={s.title} books={filtered.filter((b) => b.shelf === s.key)} />
          ))}
          {filtered.length === 0 && <p className="py-10 text-center text-sm text-gray-400">No books match your filters.</p>}
        </div>
      </div>
    </div>
  )
}
