const API_BASE = import.meta.env.DEV ? '' : 'https://nanolink.up.railway.app';

export class ShortUrlAPI {
    static async createShortUrl(originalUrl, customAlias = null) {
        const idempotencyKey = `frontend-${Date.now()}-${Math.random()}`;

        const response = await fetch(`${API_BASE}/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Idempotency-Key': idempotencyKey,
            },
            body: JSON.stringify({
                original_url: originalUrl,
                custom_alias: customAlias || null,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create short URL');
        }

        return await response.json();
    }

    static getShortUrl(shortCode) {
        return `${API_BASE}/${shortCode}`;
    }

    static async checkHealth() {
        try {
            const response = await fetch(`${API_BASE}/health/live`);
            const data = await response.json();
            return data.status === 'ok';
        } catch {
            return false;
        }
    }
}
