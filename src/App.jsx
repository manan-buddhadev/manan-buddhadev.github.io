import { useState, useEffect, useRef, useCallback } from 'react'
import { COMMANDS, FILE_COMMANDS, BOOT_LINES, profile } from './data/resume.js'
import { themes } from './theme.js'
import {
  HighlightsSection,
  AboutSection,
  ExperienceSection,
  SkillsSection,
  EducationSection,
  PublicationsSection,
  ContactSection,
  HelpSection,
  ViewPdfOutput,
  DownloadOutput,
} from './components/Sections.jsx'

const SECTION_MAP = {
  whoami:       <AboutSection />,
  highlights:   <HighlightsSection />,
  experience:   <ExperienceSection />,
  publications: <PublicationsSection />,
  skills:       <SkillsSection />,
  education:    <EducationSection />,
  contact:      <ContactSection />,
  help:         <HelpSection />,
  viewpdf:      <ViewPdfOutput />,
  download:     <DownloadOutput />,
}

const ALL_COMMANDS = [
  ...COMMANDS.map((c) => c.cmd),
  ...FILE_COMMANDS.map((c) => c.cmd),
  'help',
  'clear',
]

function getOutput(cmd) {
  const normalized = cmd.trim().toLowerCase()
  if (normalized === 'clear' || normalized === '') return null
  if (SECTION_MAP[normalized]) return SECTION_MAP[normalized]
  return (
    <span style={{ color: 'var(--c-red)' }}>
      command not found: {cmd}. Type &apos;help&apos; for available commands.
    </span>
  )
}

function getSuggestions(val) {
  if (!val.trim()) return []
  const lower = val.toLowerCase()
  return ALL_COMMANDS.filter((c) => c.startsWith(lower) && c !== lower)
}

function triggerSideEffect(cmd) {
  const lower = cmd.trim().toLowerCase()
  if (lower === 'viewpdf') {
    window.open('/resume.pdf', '_blank')
  } else if (lower === 'download') {
    const a = document.createElement('a')
    a.href = '/resume.pdf'
    a.download = 'Manan_Buddhadev_Resume.pdf'
    a.click()
  }
}

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'dark')
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [booting, setBooting] = useState(true)
  const [bootLines, setBootLines] = useState([])
  const [showBootLines, setShowBootLines] = useState(true)
  const [activeCmd, setActiveCmd] = useState(null)
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [suggIdx, setSuggIdx] = useState(0)
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  const lastCmdRef = useRef(null)
  const bottomRef = useRef(null)
  const isMobile = useRef(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0))

  const colors = themes[mode]
  const suggestions = getSuggestions(input)
  const ghostSuffix = suggestions.length === 1 ? suggestions[0].slice(input.length) : ''

  function toggleMode() {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    localStorage.setItem('theme', next)
  }

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setBootLines((prev) => [...prev, BOOT_LINES[i]])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setBooting(false), 300)
      }
    }, 180)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (booting) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [bootLines, booting])

  useEffect(() => {
    if (!booting && !isMobile.current) inputRef.current?.focus()
  }, [booting])

  useEffect(() => {
    if (history.length === 0) return
    requestAnimationFrame(() => {
      if (lastCmdRef.current && outputRef.current) {
        const container = outputRef.current
        const el = lastCmdRef.current
        container.scrollTop = el.offsetTop - container.offsetTop - 16
      }
    })
  }, [history.length])

  const runCommand = useCallback((cmd) => {
    const trimmed = cmd.trim()
    if (!trimmed) return
    const lower = trimmed.toLowerCase()
    setSuggIdx(0)
    if (lower === 'clear') {
      setHistory([])
      setShowBootLines(false)
      setActiveCmd(null)
      setCmdHistory((prev) => [trimmed, ...prev])
      setHistoryIdx(-1)
      setInput('')
      return
    }
    triggerSideEffect(trimmed)
    const output = getOutput(trimmed)
    setHistory((prev) => [...prev, { cmd: trimmed, output }])
    setShowBootLines(false)
    setActiveCmd(lower)
    setCmdHistory((prev) => [trimmed, ...prev])
    setHistoryIdx(-1)
    setInput('')
  }, [])

  function handleKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestions.length === 1) {
        setInput(suggestions[0]); setSuggIdx(0)
      } else if (suggestions.length > 1) {
        const next = (suggIdx + 1) % suggestions.length
        setSuggIdx(next); setInput(suggestions[next])
      }
    } else if (e.key === 'Enter') {
      runCommand(input); setSuggIdx(0)
    } else if (e.key === 'Escape') {
      setSuggIdx(0)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(newIdx); setInput(cmdHistory[newIdx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = Math.max(historyIdx - 1, -1)
      setHistoryIdx(newIdx); setInput(newIdx === -1 ? '' : cmdHistory[newIdx])
    }
  }

  function sidebarClick(cmd) {
    triggerSideEffect(cmd)
    const output = getOutput(cmd)
    setHistory([{ cmd, output }])
    setActiveCmd(cmd.toLowerCase())
    setCmdHistory((prev) => [cmd, ...prev])
    setHistoryIdx(-1); setInput(''); setSuggIdx(0)
    if (!isMobile.current) inputRef.current?.focus()
  }

  return (
    <div
      className="flex flex-col h-screen scanlines"
      style={{ ...colors, background: 'var(--c-bg)', color: 'var(--c-text)' }}
      onClick={() => { if (!isMobile.current) inputRef.current?.focus() }}
    >
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 shrink-0 select-none"
        style={{ background: 'var(--c-bar)', borderBottom: '1px solid var(--c-border)' }}
      >
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center text-xs" style={{ color: 'var(--c-dim)' }}>
          {profile.name.toLowerCase().replace(' ', '-')} — terminal
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleMode() }}
          className="text-xs transition-colors"
          style={{ color: 'var(--c-muted)' }}
          title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {mode === 'dark' ? '○' : '●'}
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div
          className="w-44 shrink-0 flex flex-col py-3 px-2"
          style={{ background: 'var(--c-sidebar)', borderRight: '1px solid var(--c-border)' }}
        >
          <div className="text-xs mb-3 px-2" style={{ color: 'var(--c-dim)' }}>COMMANDS</div>
          <nav className="space-y-0.5">
            {COMMANDS.map(({ cmd, label }) => {
              const isActive = activeCmd === cmd
              return (
                <button
                  key={cmd}
                  onClick={(e) => { e.stopPropagation(); sidebarClick(cmd) }}
                  className="w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center gap-1.5"
                  style={{
                    background: isActive ? 'var(--c-hl-bg)' : 'transparent',
                    color: isActive ? 'var(--c-orange)' : 'var(--c-muted)',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--c-text)' }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--c-muted)' }}
                >
                  <span style={{ color: isActive ? 'var(--c-orange)' : 'var(--c-dim)' }}>{'>'}</span>
                  {label}
                </button>
              )
            })}
          </nav>

          <div className="text-xs mt-4 mb-2 px-2" style={{ color: 'var(--c-dim)' }}>FILES</div>
          <nav className="space-y-0.5">
            {FILE_COMMANDS.map(({ cmd, label }) => {
              const isActive = activeCmd === cmd
              return (
                <button
                  key={cmd}
                  onClick={(e) => { e.stopPropagation(); sidebarClick(cmd) }}
                  className="w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center gap-1.5"
                  style={{
                    background: isActive ? 'var(--c-hl-green-bg)' : 'transparent',
                    color: isActive ? 'var(--c-green)' : 'var(--c-muted)',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--c-text)' }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--c-muted)' }}
                >
                  <span style={{ color: isActive ? 'var(--c-green)' : 'var(--c-dim)' }}>{'>'}</span>
                  {label}
                </button>
              )
            })}
          </nav>

          <div className="mt-auto px-2 pt-3">
            <div className="text-xs" style={{ color: 'var(--c-dim)', borderTop: '1px solid var(--c-border)', paddingTop: '12px' }}>
              SHORTCUTS
            </div>
            <div className="mt-2 text-xs space-y-1" style={{ color: 'var(--c-dim)' }}>
              <div>Tab  autocomplete</div>
              <div>↑↓   history</div>
              <div>clear · help</div>
            </div>
          </div>
        </div>

        {/* Terminal panel */}
        <div className="flex-1 flex flex-col min-w-0">
          <div ref={outputRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {showBootLines && history.length === 0 && bootLines.map((line, i) => (
              <div key={i} className="text-xs" style={{ color: 'var(--c-dim)', lineHeight: '1.6' }}>
                {line || '\u00a0'}
              </div>
            ))}

            {!booting && history.map((entry, i) => {
              const isLast = i === history.length - 1
              return (
                <div key={i} className="space-y-2" ref={isLast ? lastCmdRef : null}>
                  <div className="text-sm flex items-center gap-2">
                    <span style={{ color: 'var(--c-green)' }}>manan@terminal:~$</span>
                    <span style={{ color: 'var(--c-orange)' }}>{entry.cmd}</span>
                  </div>
                  {entry.output && (
                    <div className="text-sm pl-2" style={{ lineHeight: '1.8' }}>
                      {entry.output}
                    </div>
                  )}
                </div>
              )
            })}

            <div ref={bottomRef} />
          </div>

          {/* Input line */}
          {!booting && (
            <div
              style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-input)', position: 'relative' }}
              onClick={(e) => { e.stopPropagation(); if (!isMobile.current) inputRef.current?.focus() }}
            >
              {suggestions.length > 1 && (
                <div
                  className="absolute bottom-full left-0 right-0 text-xs"
                  style={{ background: 'var(--c-bar)', borderTop: '1px solid var(--c-border)' }}
                >
                  {suggestions.map((s, i) => (
                    <button
                      key={s}
                      onMouseDown={(e) => { e.preventDefault(); setInput(s); inputRef.current?.focus() }}
                      className="w-full text-left px-5 py-1.5 flex items-center gap-3 transition-colors"
                      style={{
                        background: i === suggIdx ? 'var(--c-sugg-bg)' : 'transparent',
                        color: i === suggIdx ? 'var(--c-orange)' : 'var(--c-muted)',
                      }}
                    >
                      <span style={{ color: 'var(--c-dim)' }}>{'>'}</span>
                      <span style={{ color: i === suggIdx ? 'var(--c-orange)' : 'var(--c-text)' }}>{s.slice(0, input.length)}</span>
                      <span style={{ color: 'var(--c-dim)' }}>{s.slice(input.length)}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 px-5 py-3">
                <span className="text-sm shrink-0" style={{ color: 'var(--c-green)' }}>
                  manan@terminal:~$
                </span>
                <div className="relative flex-1 text-sm" style={{ minWidth: 0 }}>
                  {ghostSuffix && (
                    <span
                      className="absolute inset-0 pointer-events-none text-sm"
                      style={{ color: 'var(--c-dim)', whiteSpace: 'pre', fontFamily: 'inherit' }}
                    >
                      {input}<span>{ghostSuffix}</span>
                    </span>
                  )}
                  <input
                    ref={inputRef}
                    className="cmd-input text-sm w-full"
                    style={{ background: 'transparent', position: 'relative', zIndex: 1 }}
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setHistoryIdx(-1); setSuggIdx(0) }}
                    onKeyDown={handleKey}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center gap-4 px-4 py-1.5 shrink-0 text-xs select-none"
        style={{ background: 'var(--c-bar)', borderTop: '1px solid var(--c-border)', color: 'var(--c-dim)' }}
      >
        <span style={{ color: 'var(--c-green)' }}>● connected</span>
        <span>{profile.location}</span>
        <span className="ml-auto">{profile.title}</span>
        <span>terminal v1.0</span>
      </div>
    </div>
  )
}
