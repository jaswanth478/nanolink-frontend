import React, { useState } from 'react';
import { Link2, ArrowRight, Loader2 } from 'lucide-react';
import { ShortUrlAPI } from '../services/api';

export default function ShortenerForm({ onResult }) {
    const [longUrl, setLongUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!longUrl) return;

        setLoading(true);
        setError('');

        try {
            const result = await ShortUrlAPI.createShortUrl(longUrl);
            const shortUrl = ShortUrlAPI.getShortUrl(result.short_code);
            onResult(shortUrl);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Paste your long URL here..."
                    required
                    autoFocus
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? (
                    <>
                        <div className="spinner"></div>
                        <span>Shortening...</span>
                    </>
                ) : (
                    <>
                        <Link2 size={20} />
                        <span>Shorten URL</span>
                    </>
                )}
            </button>
            {error && <div className="error-msg">{error}</div>}
        </form>
    );
}
