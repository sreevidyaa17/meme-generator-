import { useState } from 'react'

export default function TemplateCard({ template, onSelect, index }) {
  const [liked, setLiked] = useState(false)

  const handleLike = (e) => {
    e.stopPropagation()
    setLiked(prev => !prev)
  }

  return (
    <div
      className="meme-item"
      onClick={() => onSelect(template)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(template)}
      aria-label={`Use template: ${template.name}`}
    >
      {/* Title above */}
      <p className={`meme-item-title ${index === 0 ? 'meme-item-title--first' : ''}`}>
        {template.name}
      </p>

      {/* Image with hover overlay */}
      <div className="meme-item-img-wrapper">
        <img
          src={template.url}
          alt={template.name}
          className="meme-item-img"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="meme-item-overlay">
          <button
            className="meme-item-overlay-btn meme-item-overlay-btn--primary"
            onClick={e => { e.stopPropagation(); onSelect(template) }}
          >
            😂 Use Template
          </button>
          <button
            className={`meme-item-overlay-btn meme-item-overlay-btn--ghost ${liked ? 'meme-item-overlay-btn--liked' : ''}`}
            onClick={handleLike}
            aria-label={liked ? 'Unlike' : 'Like'}
          >
            {liked ? '❤️ Liked' : '🤍 Like'}
          </button>
        </div>
      </div>

      {/* Bottom action */}
      <button
        className="meme-item-btn"
        onClick={e => { e.stopPropagation(); onSelect(template) }}
        tabIndex={-1}
      >
        Add Caption →
      </button>
    </div>
  )
}