import { useState, useEffect, useRef } from 'react'

// ─── Data ──────────────────────────────────────────────────────────────────

const MOODS = [
  { id: 'funny',    label: '😂 Funny',    color: '#FEF3C7', text: '#92400E' },
  { id: 'dark',     label: '💀 Dark',     color: '#F3F4F6', text: '#1F2937' },
  { id: 'savage',   label: '🔥 Savage',   color: '#FEE2E2', text: '#991B1B' },
  { id: 'stupid',   label: '🤡 Stupid',   color: '#EDE9FE', text: '#5B21B6' },
  { id: 'relatable',label: '❤️ Relatable',color: '#FCE7F3', text: '#9D174D' },
  { id: 'smart',    label: '🧠 Smart',    color: '#D1FAE5', text: '#065F46' },
]

const PREVIEW_TEMPLATES = [
  { emoji: '🤌', name: 'Drake Hotline Bling',    bg: '#EDE9FE' },
  { emoji: '👀', name: 'Distracted Boyfriend',   bg: '#FCE7F3' },
  { emoji: '🐸', name: 'Kermit Sipping Tea',     bg: '#DCFCE7' },
  { emoji: '🧠', name: 'Expanding Brain',         bg: '#FEF3C7' },
  { emoji: '😤', name: 'Woman Yelling at Cat',   bg: '#E0F2FE' },
  { emoji: '💀', name: 'This is Fine',            bg: '#FEE2E2' },
]

// Cycling captions per mood
const MOOD_CAPTIONS = {
  funny: [
    { top: 'me at 2am promising', bottom: 'i\'ll sleep after this one video' },
    { top: 'my brain during exams', bottom: 'thinking about pizza' },
    { top: 'me: i\'ll be quick', bottom: 'also me: 4 hours later' },
  ],
  dark: [
    { top: 'my will to live', bottom: 'mondays be like' },
    { top: 'existential dread:', bottom: 'hits different at 3am' },
    { top: 'society', bottom: 'and me, the feral gremlin' },
  ],
  savage: [
    { top: 'your opinion', bottom: 'nobody asked' },
    { top: 'me seeing drama', bottom: 'and choosing violence' },
    { top: 'them: be nice', bottom: 'me: no.' },
  ],
  stupid: [
    { top: 'my braincell', bottom: 'on vacation again' },
    { top: 'instructions:', bottom: 'proceed to ignore them' },
    { top: 'common sense', bottom: 'has left the chat' },
  ],
  relatable: [
    { top: 'my wallet:', bottom: 'critically endangered' },
    { top: 'friday 5pm', bottom: 'vs monday 9am' },
    { top: 'me pretending', bottom: 'to have it together' },
  ],
  smart: [
    { top: 'according to my calculations', bottom: 'we\'re all cooked' },
    { top: 'the optimal strategy:', bottom: 'chaotic neutral' },
    { top: 'technically not wrong', bottom: 'but definitely stupid' },
  ],
}

const FLOATING = [
  { e: '😂', x: 5,  y: 15, s: 1.9, d: 0,   t: 7  },
  { e: '🔥', x: 91, y: 20, s: 1.6, d: 1.2, t: 8  },
  { e: '💀', x: 8,  y: 70, s: 1.5, d: 2.4, t: 6  },
  { e: '✨', x: 88, y: 65, s: 1.7, d: 0.6, t: 9  },
  { e: '🤣', x: 50, y: 5,  s: 1.4, d: 3.5, t: 10 },
  { e: '👀', x: 75, y: 88, s: 1.6, d: 0.9, t: 6  },
  { e: '💯', x: 20, y: 88, s: 1.3, d: 2,   t: 8  },
  { e: '🎭', x: 94, y: 45, s: 1.5, d: 1.5, t: 7  },
]

const STEPS = [
  { icon: '🖼️', step: 'Pick',  desc: 'Choose from 100+ meme templates'  },
  { icon: '🤖', step: 'Cook',  desc: 'AI writes 5 captions in seconds'   },
  { icon: '🚀', step: 'Share', desc: 'Download and unleash on the world'  },
]

// ─── Subcomponents ──────────────────────────────────────────────────────────

function AiPreview({ mood }) {
  const captions = MOOD_CAPTIONS[mood] || MOOD_CAPTIONS.funny
  const [idx, setIdx] = useState(0)
  const [cooking, setCooking] = useState(false)
  const [dots, setDots] = useState('')

  // Cycle captions with a fake "cooking" flash
  useEffect(() => {
    const id = setInterval(() => {
      setCooking(true)
      setDots('')
      let count = 0
      const dotId = setInterval(() => {
        count++
        setDots('.'.repeat(count))
        if (count >= 3) {
          clearInterval(dotId)
          setCooking(false)
          setIdx(p => (p + 1) % captions.length)
        }
      }, 180)
    }, 2800)
    return () => clearInterval(id)
  }, [mood, captions.length])

  const cap = captions[idx]
  const moodObj = MOODS.find(m => m.id === mood) || MOODS[0]

  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid #E5E7EB',
      borderRadius: 20,
      padding: '1.25rem',
      boxShadow: '0 8px 32px rgba(124,58,237,0.12)',
      display: 'flex',
      flexDirection: 'column',
      gap: '.75rem',
      minWidth: 240,
      maxWidth: 280,
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <span style={{
          background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
          color: '#fff',
          fontSize: '.6rem',
          fontWeight: 800,
          padding: '.2rem .55rem',
          borderRadius: 999,
          letterSpacing: '.06em',
          textTransform: 'uppercase',
        }}>
          🤖 AI Preview
        </span>
        <span style={{
          background: moodObj.color,
          color: moodObj.text,
          fontSize: '.6rem',
          fontWeight: 700,
          padding: '.2rem .5rem',
          borderRadius: 999,
        }}>
          {moodObj.label}
        </span>
      </div>

      {/* Meme mock */}
      <div style={{
        background: '#F3F4F6',
        borderRadius: 12,
        padding: '.85rem',
        minHeight: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.4rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all .3s',
      }}>
        <span style={{ fontSize: '2.2rem' }}>🤌</span>

        {cooking ? (
          <span style={{
            fontSize: '.72rem',
            fontWeight: 700,
            color: '#7C3AED',
            letterSpacing: '.03em',
            animation: 'pulse .6s ease infinite alternate',
          }}>
            AI cooking{dots}
          </span>
        ) : (
          <>
            <span style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: '.7rem',
              fontWeight: 900,
              color: '#111',
              textAlign: 'center',
              textTransform: 'uppercase',
              textShadow: '1px 1px 0 #fff',
              lineHeight: 1.2,
              animation: 'fadeSlideIn .35s ease',
            }}>
              {cap.top}
            </span>
            <span style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: '.7rem',
              fontWeight: 900,
              color: '#111',
              textAlign: 'center',
              textTransform: 'uppercase',
              textShadow: '1px 1px 0 #fff',
              lineHeight: 1.2,
              animation: 'fadeSlideIn .35s ease .05s',
            }}>
              {cap.bottom}
            </span>
          </>
        )}
      </div>

      {/* 5 idea pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem' }}>
        {['Idea #1', 'Idea #2', 'Idea #3', 'Idea #4', 'Idea #5'].map((l, i) => (
          <span key={i} style={{
            background: i === idx % 5 ? 'linear-gradient(135deg,#7C3AED,#EC4899)' : '#F3F4F6',
            color: i === idx % 5 ? '#fff' : '#9CA3AF',
            fontSize: '.6rem',
            fontWeight: 700,
            padding: '.18rem .5rem',
            borderRadius: 999,
            transition: 'all .3s',
          }}>
            {l}
          </span>
        ))}
      </div>

      {/* Cooking progress bar */}
      <div style={{
        height: 3,
        background: '#F3F4F6',
        borderRadius: 999,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg,#7C3AED,#EC4899)',
          borderRadius: 999,
          animation: 'progressBar 2.8s linear infinite',
          transformOrigin: 'left',
        }} />
      </div>
    </div>
  )
}

function TemplateCard({ card, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fff' : card.bg,
        border: `1.5px solid ${hovered ? '#A78BFA' : 'transparent'}`,
        borderRadius: 16,
        padding: 0,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all .22s cubic-bezier(.34,1.56,.64,1)',
        transform: hovered ? 'translateY(-6px) scale(1.03)' : 'none',
        boxShadow: hovered
          ? '0 12px 32px rgba(124,58,237,0.2)'
          : '0 2px 8px rgba(0,0,0,0.06)',
        textAlign: 'left',
        fontFamily: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Emoji area */}
      <div style={{
        background: card.bg,
        height: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        transition: 'transform .22s',
        transform: hovered ? 'scale(1.12)' : 'none',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        {card.emoji}
      </div>

      {/* Body */}
      <div style={{ padding: '.55rem .7rem .7rem', background: '#fff' }}>
        <div style={{
          fontSize: '.72rem',
          fontWeight: 700,
          color: '#111827',
          lineHeight: 1.3,
          marginBottom: '.2rem',
        }}>
          {card.name}
        </div>
        <div style={{
          fontSize: '.68rem',
          fontWeight: 700,
          color: hovered ? '#7C3AED' : '#9CA3AF',
          transition: 'color .2s',
        }}>
          {hovered ? 'Add captions →' : 'Use template'}
        </div>
      </div>

      {/* Hover badge */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
          color: '#fff',
          fontSize: '.58rem',
          fontWeight: 800,
          padding: '.18rem .45rem',
          borderRadius: 999,
          letterSpacing: '.04em',
        }}>
          ✨ USE
        </div>
      )}
    </button>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function InsertCoin({ onStart }) {
  const [visible,  setVisible]  = useState(true)
  const [leaving,  setLeaving]  = useState(false)
  const [mounted,  setMounted]  = useState(false)
  const [search,   setSearch]   = useState('')
  const [mood,     setMood]     = useState('funny')
  const [ctaHover, setCtaHover] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const go = (query = '') => {
    setLeaving(true)
    setTimeout(() => { setVisible(false); onStart(query) }, 420)
  }

  const handleSearch = e => { e.preventDefault(); if (search.trim()) go(search.trim()) }

  if (!visible) return null

  // ── Shared style tokens ──
  const C = {
    purple: '#7C3AED',
    pink:   '#EC4899',
    yellow: '#FACC15',
    bg:     '#F8FAFC',
    card:   '#ffffff',
    text:   '#111827',
    muted:  '#6B7280',
    border: '#E5E7EB',
  }

  const gradPrimary = 'linear-gradient(135deg,#7C3AED,#EC4899)'
  const gradWarm    = 'linear-gradient(135deg,#EC4899,#FACC15)'

  const container = {
    minHeight: '100vh',
    background: C.bg,
    color: C.text,
    fontFamily: "'Inter', system-ui, sans-serif",
    position: 'relative',
    overflowX: 'hidden',
    opacity: leaving ? 0 : mounted ? 1 : 0,
    transform: leaving ? 'scale(0.98)' : 'scale(1)',
    transition: 'opacity .42s ease, transform .42s ease',
  }

  return (
    <div style={container}>

      {/* ── Injected keyframes ── */}
      <style>{`
        @keyframes floatUpDown {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes progressBar {
          0%   { width: 0%; }
          80%  { width: 90%; }
          100% { width: 100%; }
        }
        @keyframes pulse {
          from { opacity:.5; }
          to   { opacity:1; }
        }
        @keyframes badgePop {
          0%   { transform: scale(.8); opacity:0; }
          100% { transform: scale(1); opacity:1; }
        }
        @keyframes heroIn {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── Background blobs ── */}
      {[
        { w:560, h:560, bg:'rgba(124,58,237,0.09)',  top:-180, right:-120, delay:0   },
        { w:480, h:480, bg:'rgba(236,72,153,0.07)',  bottom:80, left:-140, delay:2   },
        { w:320, h:320, bg:'rgba(250,204,21,0.08)',  top:'38%', right:'8%', delay:4  },
      ].map((b, i) => (
        <div key={i} style={{
          position: 'fixed',
          width: b.w, height: b.h,
          background: b.bg,
          borderRadius: '50%',
          filter: 'blur(90px)',
          top: b.top, bottom: b.bottom,
          left: b.left, right: b.right,
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      ))}

      {/* ── Floating emojis ── */}
      {FLOATING.map((f, i) => (
        <div key={i} style={{
          position: 'fixed',
          left: `${f.x}%`, top: `${f.y}%`,
          fontSize: `${f.s}rem`,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          opacity: .45,
          animation: `floatUpDown ${f.t}s ease-in-out ${f.d}s infinite`,
          filter: 'blur(.3px)',
        }}>
          {f.e}
        </div>
      ))}

      {/* ────────────────────────────────
          NAV
      ──────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(248,250,252,0.82)',
        backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '.9rem 2rem',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '.45rem',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700, fontSize: '1.1rem',
        }}>
          🐸
          <span style={{ background: gradPrimary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Meme Machine
          </span>
        </div>
        <button
          onClick={() => go('')}
          style={{
            background: gradPrimary,
            color: '#fff', border: 'none',
            borderRadius: 999,
            padding: '.48rem 1.15rem',
            fontSize: '.85rem', fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
            transition: 'transform .15s, box-shadow .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(124,58,237,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 14px rgba(124,58,237,0.3)' }}
        >
          Start creating →
        </button>
      </nav>

      {/* ────────────────────────────────
          HERO
      ──────────────────────────────── */}
      <section style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '4.5rem 2rem 3rem',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto',
        gap: '3rem',
        alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>
        {/* Left copy */}
        <div style={{ animation: 'heroIn .6s ease both' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '.45rem',
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.18)',
            borderRadius: 999,
            padding: '.32rem .9rem',
            fontSize: '.78rem', fontWeight: 700,
            color: C.purple,
            marginBottom: '1.25rem',
            animation: 'badgePop .5s .1s both',
          }}>
            <span style={{ width:7,height:7,borderRadius:'50%',background:'#22C55E',display:'inline-block',animation:'pulse .9s ease infinite' }} />
            AI-Powered · Free Forever · No Login
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-.025em',
            color: C.text,
            marginBottom: '1rem',
          }}>
            Make memes.{' '}
            <br />
            <span style={{ background: gradPrimary, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Have zero dignity.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(.95rem,2vw,1.12rem)',
            color: C.muted,
            lineHeight: 1.7,
            maxWidth: 500,
            marginBottom: '2rem',
            fontWeight: 500,
          }}>
            Pick a template, smash the AI button, get 5 cursed captions.
            No Photoshop. No talent. Just chaos. 😂
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: C.card,
              border: `1.5px solid ${C.border}`,
              borderRadius: 999,
              padding: '.3rem .3rem .3rem 1rem',
              maxWidth: 480,
              marginBottom: '1.25rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
              transition: 'border-color .2s, box-shadow .2s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor=C.purple; e.currentTarget.style.boxShadow=`0 0 0 3px rgba(124,58,237,0.12), 0 4px 16px rgba(0,0,0,0.07)` }}
            onBlur={e  => { e.currentTarget.style.borderColor=C.border;  e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.07)' }}
          >
            <span style={{ marginRight:'.5rem', fontSize:'1rem', flexShrink:0 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Search "Drake", "Doge", "Distracted Boyfriend"...'
              style={{
                flex:1, border:'none', outline:'none',
                fontSize:'.92rem', fontFamily:'inherit', fontWeight:500,
                color: C.text, background:'transparent',
                minWidth: 0,
              }}
              autoFocus
            />
            {search && (
              <button type="submit" style={{
                background: gradPrimary,
                color:'#fff', border:'none',
                borderRadius:999,
                padding:'.5rem 1rem',
                fontSize:'.82rem', fontWeight:700,
                cursor:'pointer', whiteSpace:'nowrap',
                flexShrink:0, fontFamily:'inherit',
              }}>
                Search →
              </button>
            )}
          </form>

          {/* CTA buttons */}
          <div style={{ display:'flex', gap:'.75rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
            <button
              onClick={() => go('')}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                background: gradPrimary,
                color:'#fff', border:'none',
                borderRadius:999,
                padding:'.82rem 1.75rem',
                fontSize:'.98rem', fontWeight:700,
                cursor:'pointer', fontFamily:'inherit',
                display:'flex', alignItems:'center', gap:'.45rem',
                boxShadow: ctaHover
                  ? '0 8px 24px rgba(124,58,237,0.45)'
                  : '0 4px 16px rgba(124,58,237,0.28)',
                transform: ctaHover ? 'translateY(-3px)' : 'none',
                transition:'all .2s cubic-bezier(.34,1.56,.64,1)',
              }}
            >
              ✨ Create Meme
              <span style={{ transition:'transform .2s', transform: ctaHover ? 'translateX(3px)' : 'none' }}>→</span>
            </button>
            <button
              onClick={() => go('')}
              style={{
                background: C.card,
                color: C.text,
                border: `1.5px solid ${C.border}`,
                borderRadius:999,
                padding:'.82rem 1.5rem',
                fontSize:'.95rem', fontWeight:700,
                cursor:'pointer', fontFamily:'inherit',
                boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
                transition:'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=C.purple; e.currentTarget.style.color=C.purple; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border;  e.currentTarget.style.color=C.text;   e.currentTarget.style.transform='none' }}
            >
              🖼️ Browse Templates
            </button>
          </div>

          <p style={{ fontSize:'.83rem', color:C.muted, fontWeight:500 }}>
            🔥 Thousands of memes created — completely free, no account needed
          </p>
        </div>

        {/* Right — AI preview */}
        <div style={{
          display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem',
          animation:'heroIn .6s .15s ease both',
          flexShrink: 0,
        }}>
          <AiPreview mood={mood} />
          <p style={{
            fontSize:'.72rem', color:C.muted, fontWeight:600,
            textAlign:'center', maxWidth:220,
          }}>
            ↑ Live AI preview — pick a mood below to see it change
          </p>
        </div>
      </section>

      {/* ────────────────────────────────
          MOOD SELECTOR
      ──────────────────────────────── */}
      <section style={{
        maxWidth:1200, margin:'0 auto',
        padding:'0 2rem 3.5rem',
        position:'relative', zIndex:1,
      }}>
        <div style={{
          background: C.card,
          border: `1.5px solid ${C.border}`,
          borderRadius: 20,
          padding:'1.5rem 1.75rem',
          boxShadow:'0 4px 20px rgba(0,0,0,0.06)',
        }}>
          <p style={{
            fontSize:'.72rem', fontWeight:800,
            textTransform:'uppercase', letterSpacing:'.09em',
            color:C.muted, marginBottom:'1rem',
          }}>
            🎭 What kind of chaos?
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.55rem' }}>
            {MOODS.map(m => {
              const active = mood === m.id
              return (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  style={{
                    background: active ? m.color : '#F9FAFB',
                    color: active ? m.text : C.muted,
                    border: active
                      ? `2px solid ${m.text}33`
                      : `1.5px solid ${C.border}`,
                    borderRadius:999,
                    padding:'.4rem .9rem',
                    fontSize:'.82rem', fontWeight:700,
                    cursor:'pointer', fontFamily:'inherit',
                    transition:'all .2s cubic-bezier(.34,1.56,.64,1)',
                    transform: active ? 'scale(1.06)' : 'scale(1)',
                    boxShadow: active ? `0 4px 14px ${m.text}22` : 'none',
                  }}
                >
                  {m.label}
                </button>
              )
            })}
          </div>
          <p style={{
            fontSize:'.75rem', color:C.muted, marginTop:'.85rem', fontWeight:500,
          }}>
            Your mood shapes the AI captions. Pick one and watch the preview above update! ☝️
          </p>
        </div>
      </section>

      {/* ────────────────────────────────
          TRENDING TEMPLATES
      ──────────────────────────────── */}
      <section style={{
        background: '#F5F3FF',
        borderTop:`1px solid ${C.border}`,
        borderBottom:`1px solid ${C.border}`,
        padding:'3rem 2rem',
        position:'relative', zIndex:1,
      }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{
            display:'flex', alignItems:'flex-end',
            justifyContent:'space-between',
            marginBottom:'1.5rem', flexWrap:'wrap', gap:'.75rem',
          }}>
            <div>
              <h2 style={{
                fontFamily:"'Space Grotesk', sans-serif",
                fontSize:'1.45rem', fontWeight:700,
                color:C.text, marginBottom:'.3rem',
              }}>
                🔥 Trending Templates
              </h2>
              <p style={{ fontSize:'.88rem', color:C.muted, fontWeight:500 }}>
                The internet's favorites. Click to start captioning.
              </p>
            </div>
            <button
              onClick={() => go('')}
              style={{
                background:'none', border:'none',
                color:C.purple, fontWeight:700, fontSize:'.88rem',
                cursor:'pointer', fontFamily:'inherit',
                padding:'.3rem .5rem', borderRadius:8,
                transition:'background .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(124,58,237,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background='none'}
            >
              View all 100+ →
            </button>
          </div>

          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(155px,1fr))',
            gap:'1rem',
          }}>
            {PREVIEW_TEMPLATES.map((card, i) => (
              <TemplateCard
                key={i}
                card={card}
                onClick={() => go(card.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────
          PICK → COOK → SHARE
      ──────────────────────────────── */}
      <section style={{
        maxWidth:1200, margin:'0 auto',
        padding:'3.5rem 2rem',
        position:'relative', zIndex:1,
      }}>
        <div style={{
          textAlign:'center', marginBottom:'2.25rem',
        }}>
          <h2 style={{
            fontFamily:"'Space Grotesk', sans-serif",
            fontSize:'1.45rem', fontWeight:700,
            color:C.text, marginBottom:'.4rem',
          }}>
            ✨ How it works
          </h2>
          <p style={{ fontSize:'.88rem', color:C.muted, fontWeight:500 }}>
            Three steps. Thirty seconds. One masterpiece.
          </p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))',
          gap:'1.25rem',
        }}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              style={{
                background: C.card,
                border:`1.5px solid ${C.border}`,
                borderRadius:18,
                padding:'1.5rem',
                textAlign:'center',
                boxShadow:'0 2px 12px rgba(0,0,0,0.05)',
                position:'relative',
                transition:'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(124,58,237,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='none';              e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.05)' }}
            >
              {/* Step number */}
              <span style={{
                position:'absolute', top:12, right:14,
                fontSize:'.62rem', fontWeight:800,
                color:'#D1D5DB', letterSpacing:'.04em',
              }}>
                0{i+1}
              </span>

              <div style={{
                fontSize:'2.2rem',
                marginBottom:'.75rem',
                display:'block',
              }}>
                {s.icon}
              </div>
              <div style={{
                fontFamily:"'Space Grotesk', sans-serif",
                fontSize:'1rem', fontWeight:700,
                color:C.text, marginBottom:'.35rem',
              }}>
                {s.step}
              </div>
              <div style={{
                fontSize:'.83rem', color:C.muted,
                lineHeight:1.6, fontWeight:500,
              }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Arrow connectors (desktop only) */}
        <div style={{
          display:'flex', justifyContent:'center',
          gap:'1rem', marginTop:'1.25rem',
          fontSize:'1.25rem', color:'#D1D5DB',
        }}>
          <span>→</span><span>→</span>
        </div>
      </section>

      {/* ────────────────────────────────
          FINAL CTA
      ──────────────────────────────── */}
      <section style={{
        background:'#F5F3FF',
        borderTop:`1px solid ${C.border}`,
        padding:'4rem 2rem',
        textAlign:'center',
        position:'relative', zIndex:1,
        overflow:'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          width:600, height:280,
          background:'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
          pointerEvents:'none',
        }} />

        <h2 style={{
          fontFamily:"'Space Grotesk', sans-serif",
          fontSize:'clamp(1.5rem,3.5vw,2.2rem)',
          fontWeight:700, color:C.text,
          marginBottom:'.75rem', position:'relative',
        }}>
          Ready to embarrass yourself? 🔥
        </h2>
        <p style={{
          fontSize:'1rem', color:C.muted,
          fontWeight:500, marginBottom:'2rem',
          position:'relative',
        }}>
          Free forever. No account needed. Your dignity: optional.
        </p>
        <button
          onClick={() => go('')}
          style={{
            background: gradPrimary,
            color:'#fff', border:'none',
            borderRadius:999,
            padding:'.95rem 2.5rem',
            fontSize:'1.05rem', fontWeight:700,
            cursor:'pointer', fontFamily:'inherit',
            display:'inline-flex', alignItems:'center', gap:'.5rem',
            boxShadow:'0 4px 20px rgba(124,58,237,0.35)',
            transition:'all .2s',
            position:'relative',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(124,58,237,0.45)' }}
          onMouseLeave={e => { e.currentTarget.style.transform='none';              e.currentTarget.style.boxShadow='0 4px 20px rgba(124,58,237,0.35)' }}
        >
          ✨ Start Creating Now
          <span>→</span>
        </button>

        {/* Social avatars */}
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'center', gap:'.75rem',
          marginTop:'1.5rem',
        }}>
          <div style={{ display:'flex', alignItems:'center' }}>
            {['😂','🔥','💀','🐸','✨'].map((e,i) => (
              <div key={i} style={{
                width:34, height:34,
                borderRadius:'50%',
                background:'#F3F4F6',
                border:'2px solid #fff',
                display:'flex', alignItems:'center',
                justifyContent:'center',
                fontSize:'1rem',
                marginLeft: i === 0 ? 0 : -8,
                boxShadow:'0 1px 4px rgba(0,0,0,0.08)',
                zIndex: 5-i,
                position:'relative',
              }}>
                {e}
              </div>
            ))}
          </div>
          <span style={{ fontSize:'.83rem', color:C.muted, fontWeight:600 }}>
            Join thousands of meme creators
          </span>
        </div>
      </section>

      {/* ────────────────────────────────
          FOOTER
      ──────────────────────────────── */}
      <footer style={{
        borderTop:`1px solid ${C.border}`,
        padding:'1.75rem 2rem',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        flexWrap:'wrap',
        gap:'1rem',
        background:C.bg,
        position:'relative', zIndex:1,
      }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'.2rem' }}>
          <span style={{ fontWeight:700, color:C.text, fontSize:'.92rem' }}>
            🐸 Meme Machine
          </span>
          <span style={{ fontSize:'.75rem', color:C.muted }}>
            Made with ❤️ and AI
          </span>
        </div>

        <div style={{ display:'flex', gap:'1.25rem' }}>
          {[
            { label:'GitHub',    href:'https://github.com'    },
            { label:'LinkedIn',  href:'https://linkedin.com'  },
            { label:'Portfolio', href:'#'                     },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize:'.83rem', fontWeight:600,
                color:C.muted, textDecoration:'none',
                transition:'color .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color=C.purple}
              onMouseLeave={e => e.currentTarget.style.color=C.muted}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{
          display:'flex', flexDirection:'column',
          alignItems:'flex-end', gap:'.15rem',
          fontSize:'.75rem', color:C.muted,
        }}>
          <span>Templates via Imgflip · AI via Cohere</span>
          <span>© 2026 Meme Machine</span>
        </div>
      </footer>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 860px) {
          section { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          h1 { font-size: 2.1rem !important; }
        }
      `}</style>

    </div>
  )
}