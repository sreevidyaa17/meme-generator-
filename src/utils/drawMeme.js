export const FONTS = [
  { label: 'Impact',      value: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" },
  { label: 'Comic Sans',  value: "'Comic Sans MS', 'Chalkboard SE', cursive" },
  { label: 'Arial Black', value: "'Arial Black', 'Arial Bold', Gadget, sans-serif" },
  { label: 'Courier',     value: "'Courier New', Courier, monospace" },
  { label: 'Bangers',     value: "'Bangers', cursive" },
]

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => resolve(img)
    img.onerror = () => reject(new Error('Could not load image'))
    img.src = url
  })
}

function getWrappedLines(ctx, text, maxWidth) {
  const words = text.toUpperCase().split(' ')
  const lines = []
  let currentLine = ''

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine
      ? currentLine + ' ' + words[i]
      : words[i]

    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = words[i]
    } else {
      currentLine = testLine
    }
  }

  if (currentLine) lines.push(currentLine)
  return lines
}

export function drawMeme(canvas, img, {
  topText,
  bottomText,
  fontSize,
  color,
  font = FONTS[0].value,
}) {
  const ctx = canvas.getContext('2d')
  canvas.width  = Math.min(img.naturalWidth,  800)
  canvas.height = Math.min(img.naturalHeight, 800)

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  ctx.font        = `bold ${fontSize}px ${font}`
  ctx.textAlign   = 'center'
  ctx.fillStyle   = color
  ctx.lineWidth   = fontSize * 0.08
  ctx.strokeStyle = '#000000'

  const x          = canvas.width / 2
  const maxWidth   = canvas.width - 20
  const lineHeight = fontSize * 1.15

  if (topText.trim()) {
    const lines = getWrappedLines(ctx, topText, maxWidth)
    lines.forEach((line, index) => {
      const y = 20 + fontSize + (index * lineHeight)
      ctx.strokeText(line, x, y)
      ctx.fillText(line,   x, y)
    })
  }

  if (bottomText.trim()) {
    const lines = getWrappedLines(ctx, bottomText, maxWidth)
    lines.reverse().forEach((line, index) => {
      const y = canvas.height - 15 - (index * lineHeight)
      ctx.strokeText(line, x, y)
      ctx.fillText(line,   x, y)
    })
  }
}

export function downloadMeme(canvas, name = 'meme.png') {
  const link    = document.createElement('a')
  link.href     = canvas.toDataURL('image/png')
  link.download = name
  link.click()
}

export function saveMemeToGallery(canvas, templateName) {
  try {
    const dataUrl   = canvas.toDataURL('image/png')
    const timestamp = Date.now()
    const id        = `meme_${timestamp}`

    const meme = {
      id,
      dataUrl,
      templateName,
      createdAt: new Date().toLocaleString(),
    }

    const existing = JSON.parse(localStorage.getItem('savedMemes') || '[]')
    const updated  = [meme, ...existing]

    // Keep only latest 20 memes so localStorage doesn't get too full
    const trimmed = updated.slice(0, 20)
    localStorage.setItem('savedMemes', JSON.stringify(trimmed))

    return true
  } catch (err) {
    console.error('Could not save meme:', err)
    return false
  }
}

export function getSavedMemes() {
  try {
    return JSON.parse(localStorage.getItem('savedMemes') || '[]')
  } catch {
    return []
  }
}

export function deleteSavedMeme(id) {
  try {
    const existing = JSON.parse(localStorage.getItem('savedMemes') || '[]')
    const updated  = existing.filter(m => m.id !== id)
    localStorage.setItem('savedMemes', JSON.stringify(updated))
    return true
  } catch {
    return false
  }
}