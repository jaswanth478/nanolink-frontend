import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import ShortenerForm from './components/ShortenerForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [shortUrl, setShortUrl] = useState(null);
  const [curlCopied, setCurlCopied] = useState(false);

  const curlCommand = `curl -X POST https://nanolink.up.railway.app/shorten \\
  -H "Content-Type: application/json" \\
  -d '{"original_url": "https://example.com"}'`;

  const handleCopyCurl = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCurlCopied(true);
      setTimeout(() => setCurlCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>NanoLink</h1>

        {!shortUrl ? (
          <ShortenerForm onResult={setShortUrl} />
        ) : (
          <ResultDisplay
            shortUrl={shortUrl}
            onReset={() => setShortUrl(null)}
          />
        )}

        <div className="curl-section">
          <div className="code-block">
            <div className="code-content">
              {curlCommand}
            </div>
            <button
              className="code-copy-btn"
              onClick={handleCopyCurl}
              title="Copy to clipboard"
            >
              {curlCopied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
