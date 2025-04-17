import { useState } from 'react'
import './App.css'

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const [hash, setHash] = useState('j2308jq')
  const [renderedHtml, setRenderedHtml] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchRenderedHtml = async () => {
    if (!hash.trim()) {
      setError('Please enter a design hash')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/render?hash=${hash}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const html = await response.text()
      setRenderedHtml(html)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <h1>renderly</h1>

      <div className="input-container">
        <input
          type="text"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="Enter design hash (e.g., j2308jq)"
        />
        <button onClick={fetchRenderedHtml} disabled={loading}>
          {loading ? 'Loading...' : 'Render'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {renderedHtml && (
        <div className="result-container">
          <iframe
            srcDoc={renderedHtml}
            title="Rendered HTML"
            className="preview-frame"
            sandbox="allow-same-origin"
          />
        </div>
      )}
    </div>
  )
}

export default App