// Base URL for the backend API.
// In development Vite proxies /api → localhost:8000.
// In production, set VITE_API_BASE_URL to your deployed backend URL.
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

/**
 * Get video information/preview from a TikTok URL.
 *
 * @param {string} videoUrl – TikTok video URL
 * @returns {Promise<object>} Video info object
 */
export async function getVideoInfo(videoUrl) {
  const response = await fetch(`${API_BASE}/api/info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: videoUrl }),
  });

  if (!response.ok) {
    let detail = "Failed to get video info";
    try {
      const json = await response.json();
      detail = json.detail || detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }

  return response.json();
}

/**
 * Downloads a TikTok video by sending the URL to the backend and
 * returning a Blob that can be saved on the client.
 *
 * @param {string} videoUrl – TikTok video URL
 * @param {string} format – Download format: "hd_no_watermark", "with_watermark", or "mp3"
 * @param {(progress: number) => void} onProgress – 0‑100 progress callback
 * @returns {Promise<{blob: Blob, filename: string}>}
 */
export async function downloadVideo(videoUrl, format, onProgress) {
  const response = await fetch(`${API_BASE}/api/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: videoUrl, format }),
  });

  if (!response.ok) {
    let detail = "Download failed";
    try {
      const json = await response.json();
      detail = json.detail || detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }

  // Determine filename based on format
  const filename = format === "mp3" ? "tiktok_audio.mp3" : "tiktok_video.mp4";

  // Read the response as a stream so we can track progress
  const contentLength = response.headers.get("Content-Length");
  const total = contentLength ? parseInt(contentLength, 10) : 0;

  if (!response.body) {
    // Fallback if ReadableStream is not supported
    const blob = await response.blob();
    onProgress(100);
    return { blob, filename };
  }

  const reader = response.body.getReader();
  const chunks = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;

    if (total) {
      onProgress(Math.min(Math.round((received / total) * 100), 100));
    } else {
      // Indeterminate – pulse between 10‑90
      onProgress(Math.min(90, 10 + Math.round((received / 1e6) * 8)));
    }
  }

  onProgress(100);
  const mimeType = format === "mp3" ? "audio/mpeg" : "video/mp4";
  return { blob: new Blob(chunks, { type: mimeType }), filename };
}

/**
 * Format a number with K/M suffix
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return null;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}
