import { useState, useEffect, useMemo } from 'react'
import { useTemplates } from '../hooks/useTemplates.js'
import TemplateCard from './TemplateCard.jsx'
import { CATEGORIES, templateMatchesCategory } from '../utils/categories.js'

function SkeletonGrid() {
  return (
    <div className="meme-grid">
      {Array.from({ length: 16 }).map((_, i) => (
        <div className="meme-item" key={i}>
          <div className="skeleton-title" />
          <div className="skeleton-img"   />
          <div className="skeleton-btn"   />
        </div>
      ))}
    </div>
  )
}

export default function TemplateGallery({ onSelect, onTemplatesLoaded }) {
  const {
    templates,
    allTemplates,
    loading,
    error,
    query,
    setQuery,
  } = useTemplates()

  const [activeCategory, setActiveCategory] = useState('all')

  // Pass full list up to App for R key
  useEffect(() => {
    if (allTemplates.length > 0 && onTemplatesLoaded) {
      onTemplatesLoaded(allTemplates)
    }
  }, [allTemplates])

  // Random button
  const handleRandom = () => {
    if (!allTemplates.length) return
    const random = allTemplates[Math.floor(Math.random() * allTemplates.length)]
    onSelect(random)
  }

  // Filter by category on top of search filter
  const displayedTemplates = useMemo(() => {
    if (activeCategory === 'all') return templates
    return templates.filter(t =>
      templateMatchesCategory(t.name, activeCategory)
    )
  }, [templates, activeCategory])

  // Count how many templates per category
  const categoryCounts = useMemo(() => {
    const counts = {}
    CATEGORIES.forEach(cat => {
      if (cat.id === 'all') {
        counts[cat.id] = allTemplates.length
      } else {
        counts[cat.id] = allTemplates.filter(t =>
          templateMatchesCategory(t.name, cat.id)
        ).length
      }
    })
    return counts
  }, [allTemplates])

  return (
    <div className="gallery">

      {/* Search + Random row */}
      <div className="gallery-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            placeholder="search for ur meme fr fr..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="search-input"
          />
          {!loading && (
            <span className="search-count">
              {displayedTemplates.length} found
            </span>
          )}
        </div>

        <button
          className="random-btn"
          onClick={handleRandom}
          disabled={loading}
          title="Pick a random template (R)"
        >
          🎲 RANDOM
        </button>
      </div>

      {/* Category filters */}
      {!loading && !error && (
        <div className="category-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'category-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
              <span className="category-count">
                {categoryCounts[cat.id] || 0}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Keyboard shortcut hints */}
      <div className="shortcut-hint">
        <span className="shortcut-tag">R</span>
        <span className="shortcut-desc">random template</span>
        <span className="shortcut-tag">ESC</span>
        <span className="shortcut-desc">back to gallery</span>
        <span className="shortcut-tag">ENTER</span>
        <span className="shortcut-desc">generate AI ideas</span>
      </div>

      {/* States */}
      {loading && <SkeletonGrid />}

      {error && (
        <div className="gallery-error">
          <p>😕</p>
          <p>bruh. failed to load. not bussin fr</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && displayedTemplates.length === 0 && (
        <div className="gallery-empty">
          <p>🔍</p>
          <p>no memes found bestie</p>
          <p>try a different search or category fr</p>
        </div>
      )}

      {!loading && !error && displayedTemplates.length > 0 && (
        <div className="meme-grid">
          {displayedTemplates.map((t, i) => (
            <TemplateCard
              key={t.id}
              template={t}
              onSelect={onSelect}
              index={i}
            />
          ))}
        </div>
      )}

    </div>
  )
}