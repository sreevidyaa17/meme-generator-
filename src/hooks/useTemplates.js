import { useState, useEffect, useMemo } from 'react'
import { fetchMemeTemplates } from '../api/imgflip.js'

export function useTemplates() {
  const [templates, setTemplates] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [query,     setQuery]     = useState('')

  useEffect(() => {
    fetchMemeTemplates()
      .then(setTemplates)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return templates
    return templates.filter(t =>
      t.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [templates, query])

  return {
    templates: filtered,
    allTemplates: templates,
    loading,
    error,
    query,
    setQuery
  }
}