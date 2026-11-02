export const categories = [
  'All', 'Romance', 'Mystery', 'Science Fiction', 'Fantasy', 'Historical', 'Biography',
  'Self-help', 'Memoir', 'Travel', 'Cooking', "Children's", 'Young Adult',
  'Comics & Graphic Novels', 'Poetry', 'Drama', 'Science', 'Philosophy', 'Religion',
  'Language Learning',
]

export const languages = ['All', 'English', 'Hindi', 'Spanish', 'French']
export const formats = ['All', 'Paperback', 'Hardcover', 'eBook']
export const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹150', min: 0, max: 150 },
  { label: '₹150 - ₹300', min: 150, max: 300 },
  { label: '₹300 - ₹400', min: 300, max: 400 },
  { label: 'Above ₹400', min: 400, max: Infinity },
]
export const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Title: A-Z']

// cover: { bg, fg, accent } colours used by the generated <BookCover />
export const books = [
  {
    id: 'art-of-focus', title: 'The Art of Focus', author: 'Arjun Patel',
    description: 'Practical guide to mastering focus & boosting productivity every day.',
    format: 'Paperback', genres: ['Non-fiction', 'Self Help'], category: 'Self-help',
    price: 399, language: 'English', rating: 4, sold: 210, publisher: 'ABC Publishers',
    cover: { bg: '#f1ede4', fg: '#c0392b', accent: '#c0392b', sub: 'How to Prioritize Your Life for Maximum Productivity' },
    shelf: 'recommended',
  },
  {
    id: 'art-of-learning', title: 'The Art of Learning', author: 'Raj Patel',
    description: 'Master the mindset and methods for effective lifelong learning.',
    format: 'Paperback', genres: ['Non-fiction', 'Self Help'], category: 'Self-help',
    price: 259, language: 'English', rating: 4, sold: 180, publisher: 'ABC Publishers',
    cover: { bg: '#d6352b', fg: '#ffffff', accent: '#f4c542' },
    shelf: 'recommended',
  },
  {
    id: 'path-to-success', title: 'The Path to Success', author: 'James Wright',
    description: 'A practical guide to achieving goals with clarity and confidence.',
    format: 'Paperback', genres: ['Non-fiction', 'Self Help'], category: 'Self-help',
    price: 359, language: 'English', rating: 5, sold: 320, publisher: 'Bright Press',
    cover: { bg: '#1f7a8c', fg: '#f4c542', accent: '#f4c542' },
    shelf: 'recommended',
  },
  {
    id: 'midnight-hour', title: 'The Midnight Hour', author: 'James Adams',
    description: "Haunting tale of a man's journey & the shadows of a forgotten past.",
    format: 'Paperback', genres: ['Fiction', 'Thriller', 'Horror'], category: 'Mystery',
    price: 299, language: 'English', rating: 4, sold: 410, publisher: 'Nightfall Books',
    cover: { bg: '#16373a', fg: '#e8c872', accent: '#e8c872' },
    shelf: 'bestsellers',
  },
  {
    id: 'beneath-the-stars', title: 'Beneath the Stars', author: 'Jessica Martin',
    description: 'A heartwarming tale, where two souls discover who you need.',
    format: 'Hardcover', genres: ['Fiction', 'Love', 'Drama'], category: 'Romance',
    price: 499, language: 'English', rating: 5, sold: 520, publisher: 'Rosewood',
    cover: { bg: '#b5502e', fg: '#f6e3c5', accent: '#f6e3c5' },
    shelf: 'bestsellers',
  },
  {
    id: 'final-frontier', title: 'The Final Frontier', author: 'Laura Mitchell',
    description: 'A mission to space secrets to change humanity forever.',
    format: 'Paperback', genres: ['Fiction', 'Thriller'], category: 'Science Fiction',
    price: 359, language: 'English', rating: 4, sold: 275, publisher: 'Orbit House',
    cover: { bg: '#0f2a4a', fg: '#ffffff', accent: '#ff6b4a' },
    shelf: 'bestsellers',
  },
  {
    id: 'joy-of-minimalism', title: 'Joy of Minimalism', author: 'Daniel Reed',
    description: 'Declutter your life to uncover peace, clarity, and joy.',
    format: 'Paperback', genres: ['Non-fiction', 'Self Help'], category: 'Self-help',
    price: 149, language: 'English', rating: 5, sold: 145, publisher: 'ABC Publishers',
    cover: { bg: '#fbd116', fg: '#111111', accent: '#111111', sub: 'Simplify your life for greater clarity and happiness' },
    shelf: 'new',
  },
  {
    id: 'vanishing-house', title: 'The Vanishing House', author: 'Clara Nelson',
    description: 'A chilling mystery unfolds within a house that disappears.',
    format: 'eBook', genres: ['Fiction', 'Horror'], category: 'Mystery',
    price: 99, language: 'English', rating: 3, sold: 60, publisher: 'Nightfall Books',
    cover: { bg: '#23363a', fg: '#e9e4d0', accent: '#e9e4d0' },
    shelf: 'new',
  },
  {
    id: 'lost-kitten', title: 'The Lost Kitten', author: 'Emilly Parker',
    description: 'A heartwarming tale of courage, friendship, and feline adventure.',
    format: 'Hardcover', genres: ['Fiction', 'Children'], category: "Children's",
    price: 339, language: 'English', rating: 4, sold: 95, publisher: 'Little Paw',
    cover: { bg: '#f58220', fg: '#ffe9a8', accent: '#ffe9a8' },
    shelf: 'new',
  },
]

export const shelves = [
  { key: 'recommended', title: 'Recommended for You' },
  { key: 'bestsellers', title: 'Bestsellers this Month' },
  { key: 'new', title: 'New Launches' },
]

export const authors = {
  'Daniel Reed': {
    bio: 'Daniel Reed is a writer, minimalist, and productivity coach based in San Francisco. With a passion for intentional living, Daniel has dedicated his career to helping individuals simplify their lives — one habit, one space, and one thought at a time. He is the author of The Joy of Minimalism, an acclaimed guide to decluttering both physically and mentally. His other works include Less, But Better and The Focus Reset, which have helped thousands rethink consumerism, prioritize what truly matters, and build sustainable systems for personal growth.',
  },
}

export const defaultReviews = [
  {
    id: 1, name: 'John Smith', rating: 5,
    text: 'The accordion component delivers large amounts of content in a small space through progressive disclosure. The user gets key details about the underlying content and can choose to expand that content within the constraints of the accordion.',
  },
]

export const getBook = (id) => books.find((b) => b.id === id)

export const formatPrice = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`

export const deliveryDate = 'Mon, 21 Jul'
