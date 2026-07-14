import { useRef, useState, useEffect, useCallback } from 'react'
import MemeCanvas from './MemeCanvas.jsx'
import AISuggestions from './AISuggestions.jsx'
import { getMemeIdeas } from '../api/openai.js'
import { downloadMeme, saveMemeToGallery, FONTS } from '../utils/drawMeme.js'

export default function MemeEditor({ template, onBack }) {
  const canvasRef     = useRef(null)
  const [topText,     setTopText]     = useState('')
  const [bottomText,  setBottomText]  = useState('')
  const [fontSize,    setFontSize]    = useState(40)
  const [color,       setColor]       = useState('#FFFFFF')
  const [font,        setFont]        = useState(FONTS[0].value)
  const [ideas,       setIdeas]       = useState([])
  const [aiLoading,   setAiLoading]   = useState(false)
  const [aiError,     setAiError]     = useState(null)
  const [aiDone,      setAiDone]      = useState(false)
  const [userPrompt,  setUserPrompt]  = useState('')
  const [activeIndex, setActiveIndex] = useState(null)
  const [activeMood,  setActiveMood]  = useState('')
  const [toast,       setToast]       = useState(null)

  const MOODS = [
    '😂 Funny', '😈 Dark', '🤓 Nerdy',
    '💼 Work',  '🎓 College', '🐶 Animals'
  ]

  // Refs for keyboard shortcuts
  const userPromptRef = useRef(userPrompt)
  const activeMoodRef = useRef(activeMood)
  const aiLoadingRef  = useRef(aiLoading)
  const onBackRef     = useRef(onBack)
  const templateRef   = useRef(template)

  useEffect(() => { userPromptRef.current = userPrompt  }, [userPrompt])
  useEffect(() => { activeMoodRef.current = activeMood  }, [activeMood])
  useEffect(() => { aiLoadingRef.current  = aiLoading   }, [aiLoading])
  useEffect(() => { onBackRef.current     = onBack      }, [onBack])
  useEffect(() => { templateRef.current   = template    }, [template])

  // Show a toast message
  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  const handleGetIdeas = useCallback(async () => {
    if (aiLoadingRef.current) return
    setAiLoading(true)
    setAiError(null)
    setActiveIndex(null)

    const prompt     = userPromptRef.current
    const mood       = activeMoodRef.current
    const fullPrompt = mood ? `${mood} humor. ${prompt}` : prompt

    try {
      const result = await getMemeIdeas(templateRef.current.name, fullPrompt)
      setIdeas(result)
      setAiDone(true)
    } catch (err) {
      setAiError('Could not get AI ideas. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }, [])

  const handleGetIdeasRef = useRef(handleGetIdeas)
  useEffect(() => {
    handleGetIdeasRef.current = handleGetIdeas
  }, [handleGetIdeas])

  const handlePick = (idea, index) => {
    setTopText(idea.top)
    setBottomText(idea.bottom)
    setActiveIndex(index)
  }

  // Download AND save to gallery
  const handleDownload = () => {
    if (!canvasRef.current) return
    downloadMeme(canvasRef.current, `${template.name}.png`)
    const saved = saveMemeToGallery(canvasRef.current, template.name)
    if (saved) {
      showToast('✅ MEME SAVED TO GALLERY!')
    } else {
      showToast('⬇️ MEME DOWNLOADED!')
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      const tag      = document.activeElement.tagName.toLowerCase()
      const isTyping = tag === 'input' || tag === 'textarea'

      if (e.key === 'Escape') {
        e.preventDefault()
        onBackRef.current()
        return
      }

      if (e.key === 'Enter' && !isTyping) {
        e.preventDefault()
        handleGetIdeasRef.current()
        return
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="editor">

      {/* Toast notification */}
      {toast && (
        <div className="toast toast--show">{toast}</div>
      )}

      {/* Top bar */}
      <div className="editor-topbar">
        <button className="back-btn" onClick={onBack}>← BACK</button>
        <h2 className="editor-title">{template.name}</h2>
        <div className="editor-shortcuts">
          <span className="shortcut-tag">ESC</span>
          <span className="shortcut-desc">gallery</span>
          <span className="shortcut-tag">ENTER</span>
          <span className="shortcut-desc">AI ideas</span>
        </div>
      </div>

      <div className="editor-layout">

        {/* Left — canvas */}
        <MemeCanvas
          template={template}
          topText={topText}
          bottomText={bottomText}
          fontSize={fontSize}
          color={color}
          font={font}
          canvasRef={canvasRef}
        />

        {/* Right — controls */}
        <div className="controls-panel">

          {/* AI Section */}
          <div className="ai-section">
            <div className="ai-section-header">
              <span className="ai-section-title">🤖 AI Meme Ideas</span>
              <span className="ai-badge">POWERED BY AI</span>
            </div>

            <div className="mood-selector">
              <span className="mood-label">Choose a vibe</span>
              <div className="mood-pills">
                {MOODS.map(mood => (
                  <button
                    key={mood}
                    className={`mood-pill ${activeMood === mood ? 'mood-pill--active' : ''}`}
                    onClick={() => setActiveMood(activeMood === mood ? '' : mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              className="ai-prompt-input"
              placeholder="e.g. programming jokes, dark humor..."
              value={userPrompt}
              onChange={e => setUserPrompt(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleGetIdeas()
                }
              }}
            />

            <button
              className="ai-btn"
              onClick={() => handleGetIdeas()}
              disabled={aiLoading}
            >
              {aiLoading
                ? '⏳ GENERATING...'
                : aiDone
                  ? '🔄 REGENERATE IDEAS'
                  : '✨ GET AI MEME IDEAS'
              }
            </button>

            {aiError && (
              <div className="ai-error-box">
                <span>⚠️ {aiError}</span>
                <button
                  className="retry-btn"
                  onClick={() => handleGetIdeas()}
                >
                  RETRY
                </button>
              </div>
            )}

            <AISuggestions
              ideas={ideas}
              loading={aiLoading}
              onPick={handlePick}
              activeIndex={activeIndex}
            />
          </div>

          {/* Caption Section */}
          <div className="section-card">
            <p className="section-card-title">✏️ Caption</p>
            <div className="text-input-group">
              <label className="input-label">
                Top Text
                <input
                  type="text"
                  className="meme-input"
                  value={topText}
                  placeholder="Type top text here..."
                  onChange={e => setTopText(e.target.value)}
                />
              </label>
              <label className="input-label">
                Bottom Text
                <input
                  type="text"
                  className="meme-input"
                  value={bottomText}
                  placeholder="Type bottom text here..."
                  onChange={e => setBottomText(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* Style Section */}
          <div className="section-card">
            <p className="section-card-title">🎨 Style</p>

            {/* Font Picker */}
            <div className="font-picker">
              <p className="font-picker-label">FONT STYLE</p>
              <div className="font-options">
                {FONTS.map(f => (
                  <button
                    key={f.label}
                    className={`font-option ${font === f.value ? 'font-option--active' : ''}`}
                    style={{ fontFamily: f.value }}
                    onClick={() => setFont(f.value)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size and Color */}
            <div className="style-row" style={{ marginTop: '1rem' }}>
              <div className="slider-wrapper">
                <div className="slider-label">
                  <span>Text Size</span>
                  <span className="slider-value">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={80}
                  value={fontSize}
                  onChange={e => setFontSize(Number(e.target.value))}
                />
              </div>
              <div className="color-wrapper">
                <span className="color-label">Color</span>
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Download */}
          <button
            className="download-btn"
            onClick={handleDownload}
          >
            ⬇️ DOWNLOAD + SAVE MEME
          </button>

        </div>
      </div>
    </div>
  )
}