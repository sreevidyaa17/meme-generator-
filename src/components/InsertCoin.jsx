import { useState, useEffect } from 'react'

const FLOATING_ELEMENTS = [
  { emoji: '😂', x: 8,  y: 15, size: 2.2, delay: 0,   duration: 6 },
  { emoji: '🔥', x: 88, y: 20, size: 1.8, delay: 1,   duration: 7 },
  { emoji: '💀', x: 15, y: 70, size: 1.6, delay: 2,   duration: 5 },
  { emoji: '✨', x: 82, y: 65, size: 2,   delay: 0.5, duration: 8 },
  { emoji: '🐸', x: 5,  y: 45, size: 1.9, delay: 1.5, duration: 6 },
  { emoji: '💯', x: 92, y: 45, size: 1.7, delay: 2.5, duration: 7 },
  { emoji: '🤣', x: 45, y: 8,  size: 1.5, delay: 3,   duration: 9 },
  { emoji: '👀', x: 70, y: 85, size: 1.8, delay: 0.8, duration: 6 },
  { emoji: '💬', x: 25, y: 88, size: 1.6, delay: 1.8, duration: 8 },
]

const STATS = [
  { value: '100+',  label: 'Templates' },
  { value: 'AI',    label: 'Powered'   },
  { value: 'Free',  label: 'Forever'   },
  { value: '60s',   label: 'To Create' },
]

export default function InsertCoin({ onStart }) {
  const [visible,  setVisible]  = useState(true)
  const [leaving,  setLeaving]  = useState(false)
  const [search,   setSearch]   = useState('')
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => {
    // Trigger fade-in animation after mount
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const handleStart = (query = '') => {
    setLeaving(true)
    setTimeout(() => {
      setVisible(false)
      onStart(query)
    }, 500)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    handleStart(search)
  }

  if (!visible) return null

  return (
    <div className={`landing ${leaving ? 'landing--leaving' : ''} ${mounted ? 'landing--mounted' : ''}`}>

      {/* Background blobs */}
      <div className="landing-blob landing-blob--purple" />
      <div className="landing-blob landing-blob--pink"   />
      <div className="landing-blob landing-blob--yellow" />

      {/* Floating emoji decorations */}
      {FLOATING_ELEMENTS.map((el, i) => (
        <div
          key={i}
          className="landing-float"
          style={{
            left:              `${el.x}%`,
            top:               `${el.y}%`,
            fontSize:          `${el.size}rem`,
            animationDelay:    `${el.delay}s`,
            animationDuration: `${el.duration}s`,
          }}
        >
          {el.emoji}
        </div>
      ))}

      {/* Nav bar */}
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          🐸 <span>Meme Machine</span>
        </div>
        <div className="landing-nav-actions">
          <button className="landing-nav-btn" onClick={() => handleStart('')}>
            Sign in
          </button>
          <button className="landing-cta-btn" onClick={() => handleStart('')}>
            Start for free →
          </button>
        </div>
      </nav>

      {/* Hero section */}
      <main className="landing-main">

        {/* Badge */}
        <div className="landing-badge">
          <span className="landing-badge-dot" />
          AI-Powered Meme Generator ✨
        </div>

        {/* Headline */}
        <h1 className="landing-headline">
          Create Hilarious
          <span className="landing-headline-highlight"> Memes </span>
          in Seconds
        </h1>

        {/* Subheadline */}
        <p className="landing-sub">
          Pick a template, let AI write the captions, download and share.
          <br />
          No design skills needed. Just vibes. 😂
        </p>

        {/* Search bar */}
        <form className="landing-search" onSubmit={handleSearch}>
          <span className="landing-search-icon">🔍</span>
          <input
            type="text"
            className="landing-search-input"
            placeholder='Search templates — "Drake", "Distracted Boyfriend", "Doge"...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          {search && (
            <button type="submit" className="landing-search-btn">
              Search →
            </button>
          )}
        </form>

        {/* CTA buttons */}
        <div className="landing-ctas">
          <button className="landing-cta-primary" onClick={() => handleStart('')}>
            ✨ Create Meme
          </button>
          <button className="landing-cta-secondary" onClick={() => handleStart('')}>
            🖼️ Explore Templates
          </button>
        </div>

        {/* Social proof */}
        <p className="landing-social-proof">
          🔥 Join thousands of meme creators — completely free
        </p>

        {/* Stats */}
        <div className="landing-stats">
          {STATS.map((s, i) => (
            <div key={i} className="landing-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

      </main>

      {/* Preview cards — fake meme template thumbnails */}
      <section className="landing-preview">
        <h2 className="landing-preview-title">
          🔥 Trending Templates
        </h2>
        <div className="landing-preview-grid">
          {[
            { emoji: '🤌', name: 'Drake Hotline Bling',     color: '#EDE9FE' },
            { emoji: '👀', name: 'Distracted Boyfriend',    color: '#FCE7F3' },
            { emoji: '💀', name: 'This is Fine',             color: '#FEF3C7' },
            { emoji: '😤', name: 'Woman Yelling at Cat',    color: '#DCFCE7' },
            { emoji: '🐸', name: 'Kermit Sipping Tea',      color: '#DBEAFE' },
            { emoji: '🧠', name: 'Expanding Brain',          color: '#F3E8FF' },
          ].map((card, i) => (
            <button
              key={i}
              className="landing-preview-card"
              onClick={() => handleStart(card.name)}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="landing-preview-card-img"
                style={{ background: card.color }}
              >
                <span>{card.emoji}</span>
              </div>
              <p className="landing-preview-card-name">{card.name}</p>
              <p className="landing-preview-card-cta">Use template →</p>
            </button>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="landing-features">
        {[
          {
            icon: '🤖',
            title: 'AI Caption Generator',
            desc: 'Pick a mood, describe the vibe, and let AI write 5 hilarious captions for you instantly.',
            color: '#EDE9FE',
          },
          {
            icon: '⚡',
            title: 'Live Preview',
            desc: 'See your meme update in real time as you type. What you see is exactly what you get.',
            color: '#FCE7F3',
          },
          {
            icon: '💾',
            title: 'Save Your Memes',
            desc: 'Every meme you create is saved to your personal gallery. Never lose a banger again.',
            color: '#FEF3C7',
          },
          {
            icon: '🚀',
            title: 'Share Instantly',
            desc: 'Download as PNG or share directly to your friends with one tap.',
            color: '#DCFCE7',
          },
        ].map((f, i) => (
          <div
            key={i}
            className="landing-feature-card"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="landing-feature-icon" style={{ background: f.color }}>
              {f.icon}
            </div>
            <h3 className="landing-feature-title">{f.title}</h3>
            <p className="landing-feature-desc">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Final CTA banner */}
      <section className="landing-final-cta">
        <h2 className="landing-final-cta-title">
          Ready to create your next viral meme? 🔥
        </h2>
        <p className="landing-final-cta-sub">
          Free forever. No account needed. Just click and create.
        </p>
        <button className="landing-cta-primary landing-cta-primary--large" onClick={() => handleStart('')}>
          ✨ Start Creating Now
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <span>🐸 Meme Machine</span>
        <span>Made with 💜 and way too many memes</span>
        <span>Templates via Imgflip · AI via Cohere</span>
      </footer>

    </div>
  )
}