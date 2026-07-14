export default function AISuggestions({ ideas, loading, onPick, activeIndex }) {
  if (loading) {
    return (
      <div className="ai-loading-box">
        <div className="ai-spinner"></div>
        <p className="ai-loading-text">🤖 AI is cooking up ideas...</p>
      </div>
    )
  }

  if (!ideas.length) return null

  return (
    <div className="ai-suggestions">
      <h3 className="ai-suggestions-title">
        💡 Click a suggestion to use it!
      </h3>
      <div className="suggestions-list">
        {ideas.map((idea, i) => (
          <button
            key={i}
            className={`suggestion-card ${activeIndex === i ? 'suggestion-card--active' : ''}`}
            onClick={() => onPick(idea, i)}
          >
            <span className="suggestion-number">#{i + 1}</span>
            <div className="suggestion-texts">
              <span className="suggestion-top">
                <span className="suggestion-label">TOP</span>
                {idea.top}
              </span>
              <span className="suggestion-bottom">
                <span className="suggestion-label">BTM</span>
                {idea.bottom}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}