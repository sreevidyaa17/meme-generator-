import { useEffect, useState } from 'react'

const FLOATING_EMOJIS = [
  { emoji: '😂', x: 6, y: 18, size: 1.8, delay: 0, duration: 7 },
  { emoji: '🔥', x: 90, y: 22, size: 1.5, delay: 1.2, duration: 8 },
  { emoji: '💀', x: 12, y: 72, size: 1.4, delay: 2.4, duration: 6 },
  { emoji: '✨', x: 85, y: 68, size: 1.6, delay: 0.6, duration: 9 },
  { emoji: '🐸', x: 4, y: 48, size: 1.7, delay: 1.8, duration: 7 },
  { emoji: '💯', x: 93, y: 48, size: 1.4, delay: 3, duration: 8 },
  { emoji: '🤣', x: 48, y: 6, size: 1.3, delay: 3.5, duration: 10 },
  { emoji: '👀', x: 72, y: 88, size: 1.5, delay: 0.9, duration: 6 },
  { emoji: '💬', x: 22, y: 90, size: 1.4, delay: 2, duration: 8 },
]

const STATS = [
  { value: '100+', label: 'Templates', icon: '🖼️' },
  { value: 'AI', label: 'Powered', icon: '🤖' },
  { value: 'Free', label: 'Forever', icon: '💚' },
  { value: '60s', label: 'To Create', icon: '⚡' },
]

const FEATURES = [
  {
    icon: '🤖',
    title: 'AI Caption Generator',
    desc: 'Pick a mood and let AI write 5 hilarious captions instantly.',
    color: '#EDE9FE',
  },
  {
    icon: '⚡',
    title: 'Live Preview',
    desc: 'Watch your meme come to life as you type — zero lag.',
    color: '#FCE7F3',
  },
  {
    icon: '💾',
    title: 'Personal Gallery',
    desc: 'Every meme saved forever. Never lose a banger again.',
    color: '#FEF3C7',
  },
  {
    icon: '🚀',
    title: 'Share Instantly',
    desc: 'Download as PNG or share with one tap.',
    color: '#DCFCE7',
  },
]

const PREVIEW_TEMPLATES = [
  {
    emoji: '🤌',
    name: 'Drake Hotline Bling',
    color: '#EDE9FE',
    tag: '🔥 Hot',
  },
  {
    emoji: '👀',
    name: 'Distracted Boyfriend',
    color: '#FCE7F3',
    tag: '💀 Relatable',
  },
  {
    emoji: '🐸',
    name: 'Kermit Sipping Tea',
    color: '#DCFCE7',
    tag: '🫖 Classic',
  },
  {
    emoji: '🧠',
    name: 'Expanding Brain',
    color: '#FEF3C7',
    tag: '🧠 Big brain',
  },
  {
    emoji: '😤',
    name: 'Woman Yelling at Cat',
    color: '#E0F2FE',
    tag: '😤 Chaos',
  },
  {
    emoji: '💀',
    name: 'This is Fine',
    color: '#FEE2E2',
    tag: '🔥 Mood',
  },
]

export default function InsertCoin({ onStart }) {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Force light mode on the landing page
    document.documentElement.setAttribute('data-theme', 'light')

    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleStart = (query = '') => {
    setLeaving(true)

    setTimeout(() => {
      setVisible(false)

      if (typeof onStart === 'function') {
        onStart(query)
      }
    }, 500)
  }

  const handleSearch = (event) => {
    event.preventDefault()

    const trimmedSearch = search.trim()

    handleStart(trimmedSearch)
  }

  if (!visible) {
    return null
  }

  return (
    <div
      className={`landing ${
        leaving ? 'landing--leaving' : ''
      } ${mounted ? 'landing--mounted' : ''}`}
    >
      {/* ================================
          BACKGROUND BLOBS
      ================================= */}

      <div className="landing-blob landing-blob--purple" />
      <div className="landing-blob landing-blob--pink" />
      <div className="landing-blob landing-blob--yellow" />

      {/* ================================
          FLOATING EMOJIS
      ================================= */}

      {FLOATING_EMOJIS.map((item, index) => (
        <div
          key={`${item.emoji}-${index}`}
          className="landing-float"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}rem`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* ================================
          NAVBAR
      ================================= */}

      <nav className="landing-nav">
        <div className="landing-nav-logo">
          🐸 <span>Meme Machine</span>
        </div>

        <div className="landing-nav-actions">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-nav-link"
          >
            GitHub
          </a>

          <button
            type="button"
            className="landing-nav-btn"
            onClick={() => handleStart('')}
          >
            Sign in
          </button>

          <button
            type="button"
            className="landing-cta-btn"
            onClick={() => handleStart('')}
          >
            Start free →
          </button>
        </div>
      </nav>

      {/* ================================
          HERO SECTION
      ================================= */}

      <section className="landing-hero">
        {/* LEFT SIDE */}

        <div className="landing-hero-copy">
          <div className="landing-badge">
            <span className="landing-badge-dot" />
            AI-Powered · Free Forever · No Login Required
          </div>

          <h1 className="landing-headline">
            Create Hilarious
            <br />
            <span className="landing-headline-highlight">
              Memes
            </span>{' '}
            in Seconds
          </h1>

          <p className="landing-sub">
            Pick a template, let AI write the captions, download and
            share. No design skills needed. Just vibes. 😂
          </p>

          {/* SEARCH */}

          <form
            className="landing-search"
            onSubmit={handleSearch}
          >
            <span className="landing-search-icon">
              🔍
            </span>

            <input
              type="text"
              className="landing-search-input"
              placeholder='Try "Drake", "Doge", "Distracted Boyfriend"...'
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              aria-label="Search meme templates"
            />

            {search.trim() && (
              <button
                type="submit"
                className="landing-search-btn"
              >
                Search →
              </button>
            )}
          </form>

          {/* CTA BUTTONS */}

          <div className="landing-ctas">
            <button
              type="button"
              className="landing-cta-primary landing-cta-arrow"
              onClick={() => handleStart('')}
            >
              ✨ Create Meme
              <span className="landing-cta-arrow-icon">
                →
              </span>
            </button>

            <button
              type="button"
              className="landing-cta-secondary"
              onClick={() => handleStart('')}
            >
              🖼️ Browse Templates
            </button>
          </div>

          <p className="landing-social-proof">
            🔥 Thousands of memes created — completely free
          </p>

          {/* STATS */}

          <div className="landing-stats">
            {STATS.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className="landing-stat"
              >
                <span className="landing-stat-icon">
                  {stat.icon}
                </span>

                <strong>{stat.value}</strong>

                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="landing-hero-visual">
          <div className="lcs">
            <div className="lcs__card lcs__card--1">
              <div className="lcs__emoji">🤌</div>
              <div className="lcs__name">Drake</div>
              <div className="lcs__bar" />
              <div className="lcs__bar lcs__bar--short" />
            </div>

            <div className="lcs__card lcs__card--2">
              <div className="lcs__emoji">😤</div>
              <div className="lcs__name">Woman Yelling</div>
              <div className="lcs__bar" />
              <div className="lcs__bar lcs__bar--short" />
            </div>

            <div className="lcs__card lcs__card--3">
              <div className="lcs__emoji">🧠</div>
              <div className="lcs__name">Expanding Brain</div>
              <div className="lcs__bar" />
              <div className="lcs__bar lcs__bar--short" />
            </div>

            <div className="lcs__card lcs__card--4">
              <div className="lcs__emoji">🐸</div>
              <div className="lcs__name">Kermit Tea</div>
              <div className="lcs__bar" />
              <div className="lcs__bar lcs__bar--short" />
            </div>

            <div className="lcs__badge lcs__badge--top">
              🤖 AI generated
            </div>

            <div className="lcs__badge lcs__badge--bot">
              🔥 Trending
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          TRENDING TEMPLATES
      ================================= */}

      <section className="landing-section">
        <div className="landing-section-header">
          <div>
            <h2 className="landing-section-title">
              🔥 Trending Templates
            </h2>

            <p className="landing-section-sub">
              The internet&apos;s favorites, ready to caption
            </p>
          </div>

          <button
            type="button"
            className="landing-section-link"
            onClick={() => handleStart('')}
          >
            View all →
          </button>
        </div>

        <div className="ltp-grid">
          {PREVIEW_TEMPLATES.map((card, index) => (
            <button
              key={`${card.name}-${index}`}
              type="button"
              className="ltp-card"
              onClick={() => handleStart(card.name)}
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <div
                className="ltp-card__img"
                style={{ backgroundColor: card.color }}
              >
                {card.emoji}
              </div>

              <div className="ltp-card__body">
                <p className="ltp-card__tag">
                  {card.tag}
                </p>

                <p className="ltp-card__name">
                  {card.name}
                </p>

                <p className="ltp-card__cta">
                  Use template →
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ================================
          DIVIDER
      ================================= */}

      <div className="landing-divider">
        <span>✦</span>
      </div>

      {/* ================================
          FEATURES
      ================================= */}

      <section className="landing-section">
        <div className="landing-section-header landing-section-header--center">
          <h2 className="landing-section-title">
            ✨ Everything you need
          </h2>

          <p className="landing-section-sub">
            Built for speed, creativity, and maximum comedy
          </p>
        </div>

        <div className="landing-features">
          {FEATURES.map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              className="landing-feature-card"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div
                className="landing-feature-icon"
                style={{ backgroundColor: feature.color }}
              >
                {feature.icon}
              </div>

              <h3 className="landing-feature-title">
                {feature.title}
              </h3>

              <p className="landing-feature-desc">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================
          DIVIDER
      ================================= */}

      <div className="landing-divider">
        <span>✦</span>
      </div>

      {/* ================================
          FINAL CTA
      ================================= */}

      <section className="landing-final-cta">
        <div className="landing-final-cta-glow" />

        <h2 className="landing-final-cta-title">
          Ready to create your next viral meme? 🔥
        </h2>

        <p className="landing-final-cta-sub">
          Free forever. No account needed. Just click and
          create.
        </p>

        <button
          type="button"
          className="landing-cta-primary landing-cta-primary--large landing-cta-arrow"
          onClick={() => handleStart('')}
        >
          ✨ Start Creating Now
          <span className="landing-cta-arrow-icon">
            →
          </span>
        </button>

        <div className="landing-social-row">
          <div className="landing-avatars">
            {['😂', '🔥', '💀', '🐸', '✨'].map(
              (emoji, index) => (
                <div
                  key={`${emoji}-${index}`}
                  className="landing-avatar"
                  style={{
                    zIndex: 5 - index,
                  }}
                >
                  {emoji}
                </div>
              )
            )}
          </div>

          <span className="landing-social-text">
            Join thousands of meme creators
          </span>
        </div>
      </section>

      {/* ================================
          FOOTER
      ================================= */}

      <footer className="landing-footer">
        <div className="landing-footer-left">
          <span className="landing-footer-logo">
            🐸 Meme Machine
          </span>

          <span className="landing-footer-copy">
            Made with ❤️ and AI
          </span>
        </div>

        <div className="landing-footer-links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-footer-link"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-footer-link"
          >
            LinkedIn
          </a>

          <a
            href="#"
            className="landing-footer-link"
            onClick={(event) => event.preventDefault()}
          >
            Portfolio
          </a>
        </div>

        <div className="landing-footer-right">
          <span>
            Templates via Imgflip · AI via Cohere
          </span>

          <span>© 2026 Meme Machine</span>
        </div>
      </footer>
    </div>
  )
}