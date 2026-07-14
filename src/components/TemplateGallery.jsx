import { useEffect } from 'react'
import { useTemplates } from '../hooks/useTemplates.js'
import TemplateCard from './TemplateCard.jsx'

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
    setQuery
  } = useTemplates()

  // Pass full template list up to App so R key works
  useEffect(() => {
    if (allTemplates.length > 0 && onTemplatesLoaded) {
      onTemplatesLoaded(allTemplates)
    }
  }, [allTemplates])

  // Random button handler
  const handleRandom = () => {
    if (!allTemplates.length) return
    const random = allTemplates[Math.floor(Math.random() * allTemplates.length)]
    onSelect(random)
  }

  return (
    <div className="gallery">

      {/* Search + Random row */}
      <div className="gallery-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            placeholder="Search templates..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="search-input"
          />
          {!loading && (
            <span className="search-count">{templates.length}</span>
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
          <p>Failed to load templates</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && templates.length === 0 && (
        <div className="gallery-empty">
          <p>🔍</p>
          <p>No templates found</p>
          <p>Try a different search term</p>
        </div>
      )}

      {!loading && !error && templates.length > 0 && (
        <div className="meme-grid">
          {templates.map((t, i) => (
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