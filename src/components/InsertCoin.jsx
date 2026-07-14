import { useState, useEffect } from 'react'

export default function InsertCoin({ onStart }) {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  const handleStart = () => {
    setLeaving(true)
    setTimeout(() => {
      setVisible(false)
      onStart()
    }, 800)
  }

  useEffect(() => {
    const handleKey = (e) => handleStart()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!visible) return null

  return (
    <div
      className={`coin-screen ${leaving ? 'coin-screen--leaving' : ''}`}
      onClick={handleStart}
    >
      {/* Scanline effect */}
      <div className="coin-scanlines" />

      {/* Corner decorations */}
      <div className="coin-corner coin-corner--tl">+</div>
      <div className="coin-corner coin-corner--tr">+</div>
      <div className="coin-corner coin-corner--bl">+</div>
      <div className="coin-corner coin-corner--br">+</div>

      

      {/* Main content */}
      <div className="coin-content">

        {/* Frog mascot */}
        <div className="coin-mascot">🐸</div>

        {/* Title */}
        <h1 className="coin-title">
          <span className="coin-title-line">MEME</span>
          <span className="coin-title-line coin-title-line--green">MACHINE</span>
        </h1>

        {/* Subtitle */}
        <p className="coin-subtitle">
          — MEME GENERATOR —
        </p>

        {/* Blinking insert coin */}
        <div className="coin-insert">
          <span className="coin-coin">🪙</span>
          <span className="coin-insert-text">INSERT COIN TO PLAY</span>
        </div>

        {/* Instructions */}
        <div className="coin-instructions">
          <div className="coin-instruction-row">
            <span className="coin-key">CLICK</span>
            <span className="coin-instruction-text">anywhere to start</span>
          </div>
          <div className="coin-instruction-row">
            <span className="coin-key">ANY KEY</span>
            <span className="coin-instruction-text">to start</span>
          </div>
        </div>

        {/* Credits */}
        <div className="coin-credits">
          <span>© 2025 MEME MACHINE</span>
          <span>1 CREDIT FREE</span>
        </div>

      </div>

      {/* Bottom border animation */}
      <div className="coin-bottom-bar" />
    </div>
  )
}