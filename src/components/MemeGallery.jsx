import { useState, useEffect } from 'react'
import { getSavedMemes, deleteSavedMeme, downloadMeme } from '../utils/drawMeme.js'

export default function MemeGallery({ onBack }) {
  const [memes, setMemes] = useState([])
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    setMemes(getSavedMemes())
  }, [])

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      deleteSavedMeme(id)
      setMemes(getSavedMemes())
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
      // Auto cancel confirm after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  const handleDownload = (meme) => {
    const link    = document.createElement('a')
    link.href     = meme.dataUrl
    link.download = `${meme.templateName}.png`
    link.click()
  }

  return (
    <div className="meme-gallery-screen">

      {/* Top bar */}
      <div className="gallery-screen-topbar">
        <button className="back-btn" onClick={onBack}>
          ← BACK
        </button>
        <h2 className="editor-title">💾 MY MEMES</h2>
        <span className="gallery-screen-count">
          {memes.length} / 20 SAVED
        </span>
      </div>

      {/* Empty state */}
      {memes.length === 0 && (
        <div className="gallery-screen-empty">
          <p className="gallery-screen-empty-icon">📭</p>
          <p className="gallery-screen-empty-title">NO MEMES SAVED YET</p>
          <p className="gallery-screen-empty-sub">
            Download a meme and it will appear here!
          </p>
          <button className="back-btn" onClick={onBack}>
            ← GO MAKE SOME MEMES
          </button>
        </div>
      )}

      {/* Memes grid */}
      {memes.length > 0 && (
        <div className="gallery-screen-grid">
          {memes.map((meme) => (
            <div key={meme.id} className="saved-meme-card">

              {/* Meme image */}
              <div className="saved-meme-img-wrapper">
                <img
                  src={meme.dataUrl}
                  alt={meme.templateName}
                  className="saved-meme-img"
                />
              </div>

              {/* Info */}
              <div className="saved-meme-info">
                <p className="saved-meme-name">{meme.templateName}</p>
                <p className="saved-meme-date">{meme.createdAt}</p>
              </div>

              {/* Actions */}
              <div className="saved-meme-actions">
                <button
                  className="saved-meme-btn saved-meme-btn--download"
                  onClick={() => handleDownload(meme)}
                >
                  ⬇️ SAVE
                </button>
                <button
                  className={`saved-meme-btn saved-meme-btn--delete
                    ${deleteConfirm === meme.id ? 'saved-meme-btn--confirm' : ''}`}
                  onClick={() => handleDelete(meme.id)}
                >
                  {deleteConfirm === meme.id ? '⚠️ SURE?' : '🗑️ DELETE'}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}