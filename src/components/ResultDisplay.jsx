import React, { useState } from 'react';
import { Copy, Check, ArrowLeft } from 'lucide-react';

export default function ResultDisplay({ shortUrl, onReset }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    const handleShare = async () => {
        const url = window.location.href

        if (navigator.share) {
            await navigator.share({ title: document.title, url })
        } else {
            await navigator.clipboard.writeText(url)
            alert("Link copied")
        }
    }


    return (
        <div className="result-container">
            {/* <div className="short-url">
                {shortUrl.replace("/", "")}
            </div> */}
            <div className="action-buttons">
                <button type="button" className="copy-btn" onClick={handleCopy}>
                    {copied ? (
                        <>
                            <Check size={18} />
                            <span>Copied to clipboard</span>
                        </>
                    ) : (
                        <>
                            <Copy size={18} />
                            <span>Copy url</span>
                        </>
                    )}
                </button>
                {/* <button
                    class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    onClick={handleShare}
                >
                    <img src={Share} alt="" />
                </button> */}

                <button
                    type="button"
                    className="copy-btn"
                    onClick={onReset}
                    style={{ background: 'transparent', border: 'none', color: '#8acda8ff', width: 'auto', padding: '0 1rem' }}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
