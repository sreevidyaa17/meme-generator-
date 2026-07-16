import { useState, useEffect, useRef } from 'react'
import TemplateGallery from './components/TemplateGallery.jsx'
import MemeEditor from './components/MemeEditor.jsx'
import MemeGallery from './components/MemeGallery.jsx'
import InsertCoin from './components/InsertCoin.jsx'
import { getSavedMemes } from './utils/drawMeme.js'
import { useTheme } from './hooks/useTheme.js'
import './index.css'

export default function App() {
  const [selected,    setSelected]    = useState(null)
  const [view,        setView]        = useState('gallery')
  const [gameStart,   setGameStart]   = useState(false)
  const [templates,   setTemplates]   = useState([])
  const [savedCount,  setSavedCount]  = useState(0)
  const [initSearch,  setInitSearch]  = useState('')

  const { theme, toggleTheme } = useTheme()

  const viewRef      = useRef(view)
  const templatesRef = useRef(templates)

  useEffect(() => { viewRef.current      = view      }, [view])
  useEffect(() => { templatesRef.current = templates }, [templates])

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
    setSavedCount(getSavedMemes().length)
  }

  const handleSelectRef = useRef(handleSelect)
  useEffect(() => { handleSelectRef.current = handleSelect })

  // R key — random template
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

  // Handle start from landing page — pass initial search query
  const handleStart = (query = '') => {
    setInitSearch(query)
    setGameStart(true)
  }

  if (!gameStart) {
    return <InsertCoin onStart={handleStart} />
  }

  return (
    <div className="app">

      {/* Subtle background blobs */}
      <div className="app-blob app-blob--1" aria-hidden="true" />
      <div className="app-blob app-blob--2" aria-hidden="true" />

      {/* Header */}
      <header className="app-header">
        <div className="app-header-inner">

          {/* Logo */}
          <button
            className="app-logo"
            onClick={() => setView('gallery')}
          >
            🐸 <span>Meme Machine</span>
          </button>

          {/* Nav actions */}
          <div className="app-header-actions">
            <button
              className="app-nav-btn"
              onClick={() => setView(view === 'saved' ? 'gallery' : 'saved')}
            >
              💾 My Memes
              {savedCount > 0 && (
                <span className="app-nav-badge">{savedCount}</span>
              )}
            </button>

            <button
              className="app-nav-btn"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <button
              className="app-cta-btn"
              onClick={() => {
                setSelected(null)
                setView('gallery')
              }}
            >
              ✨ Create Meme
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        {view === 'gallery' && (
          <TemplateGallery
            onSelect={handleSelect}
            onTemplatesLoaded={setTemplates}
            initialSearch={initSearch}
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

      {/* Footer */}
      <footer className="app-footer">
        <span>🐸 Meme Verse </span>
        <span>Templates via Imgflip · AI via Cohere</span>
      </footer>

    </div>
  )
}