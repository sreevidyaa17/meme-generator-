import { useEffect, useRef, useState } from 'react'
import { loadImage, drawMeme } from '../utils/drawMeme.js'

export default function MemeCanvas({
  template,
  topText,
  bottomText,
  fontSize,
  color,
  font,
  canvasRef,
}) {
  const [status, setStatus] = useState('loading')
  const imgRef = useRef(null)

  useEffect(() => {
    setStatus('loading')
    loadImage(template.url)
      .then(img => {
        imgRef.current = img
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [template.url])

  useEffect(() => {
    if (status !== 'ready' || !imgRef.current) return
    drawMeme(canvasRef.current, imgRef.current, {
      topText,
      bottomText,
      fontSize,
      color,
      font,
    })
  }, [status, topText, bottomText, fontSize, color, font])

  return (
    <div className="canvas-frame">
      {status === 'loading' && (
        <div className="canvas-loading">
          <div className="ai-spinner" />
          <p>Loading image...</p>
        </div>
      )}
      {status === 'error' && (
        <p className="error">Could not load this image. Try another.</p>
      )}
      <canvas ref={canvasRef} hidden={status !== 'ready'} />
    </div>
  )
}