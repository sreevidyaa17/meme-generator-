import { useState, useEffect, useRef } from 'react'
import TemplateGallery from './components/TemplateGallery.jsx'
import MemeEditor from './components/MemeEditor.jsx'
import MemeGallery from './components/MemeGallery.jsx'
import InsertCoin from './components/InsertCoin.jsx'
import { getSavedMemes } from './utils/drawMeme.js'
import './index.css'


function Bubbles() {
  const EMOJIS = ['🐕', '💀', '😂', '🔥', '💯', '🤣', 'wow', 'such', 'very', '😤']

  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id:       i,
    emoji:    EMOJIS[i % EMOJIS.length],
    left:     Math.random() * 100,
    delay:    Math.random() * 12,
    duration: Math.random() * 10 + 12,
    size:     Math.random() * 8 + 12,
  }))

  return (
    <div className="bubbles-container" aria-hidden="true">
      {bubbles.map(b => (
        <div
          key={b.id}
          className="bubble"
          style={{
            left:              `${b.left}%`,
            animationDelay:    `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            fontSize:          `${b.size}px`,
          }}
        >
          {b.emoji}
        </div>
      ))}
    </div>
  )
}

function Waves() {
  return (
    <div className="waves-container" aria-hidden="true">
      <svg
        className="waves-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="wave-parallax">
          <use href="#wave" className="wave wave-1" x="48" y="0" />
          <use href="#wave" className="wave wave-2" x="48" y="3" />
          <use href="#wave" className="wave wave-3" x="48" y="5" />
          <use href="#wave" className="wave wave-4" x="48" y="7" />
        </g>
      </svg>
    </div>
  )
}

export default function App() {
  const [selected,    setSelected]    = useState(null)
  const [view,        setView]        = useState('gallery')
  const [gameStart,   setGameStart]   = useState(false)
  const [templates,   setTemplates]   = useState([])
  const [savedCount,  setSavedCount]  = useState(0)

  // Refs for keyboard shortcuts
  const viewRef      = useRef(view)
  const templatesRef = useRef(templates)

  useEffect(() => { viewRef.current      = view      }, [view])
  useEffect(() => { templatesRef.current = templates }, [templates])

  // Load saved meme count on mount and when view changes
  useEffect(() => {
    setSavedCount(getSavedMemes().length)
  }, [view])

  const handleSelect = (template) => {
    setSelected(template)
    setView('editor')
  }

  const handleBack = () => {
    setSelected(null)
    setView('gallery')
    // Refresh saved count when coming back
    setSavedCount(getSavedMemes().length)
  }

  const handleSelectRef  = useRef(handleSelect)
  useEffect(() => {
    handleSelectRef.current = handleSelect
  })

  // R key — random template in gallery
  useEffect(() => {
    const handleKey = (e) => {
      const tag      = document.activeElement.tagName.toLowerCase()
      const isTyping = tag === 'input' || tag === 'textarea'
      if (isTyping) return

      if ((e.key === 'r' || e.key === 'R') && viewRef.current === 'gallery') {
        const list = templatesRef.current
        if (!list.length) return
        const random = list[Math.floor(Math.random() * list.length)]
        handleSelectRef.current(random)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!gameStart) {
    return <InsertCoin onStart={() => setGameStart(true)} />
  }

  return (
    <div className="app">
      <Bubbles />
      <Waves />

      <header className="app-header">
        <h1>🐸 Meme Machine</h1>
        <p>Pick a template, get AI ideas, create something hilarious!</p>

        <div className="header-stats">
          <div className="header-stat">
            <strong>100+</strong>
            <span>Templates</span>
          </div>
          <div className="header-stat">
            <strong>Free</strong>
            <span>Forever</span>
          </div>
          {/* My Memes button */}
          <button
            className="my-memes-btn"
            onClick={() => setView(view === 'saved' ? 'gallery' : 'saved')}
          >
            💾 MY MEMES
            {savedCount > 0 && (
              <span className="my-memes-count">{savedCount}</span>
            )}
          </button>
        </div>
      </header>

      <main>
        {view === 'gallery' && (
          <TemplateGallery
            onSelect={handleSelect}
            onTemplatesLoaded={setTemplates}
          />
        )}
        {view === 'editor' && (
          <MemeEditor
            template={selected}
            onBack={handleBack}
          />
        )}
        {view === 'saved' && (
          <MemeGallery
            onBack={() => setView('gallery')}
          />
        )}
      </main>
    </div>
  )
}