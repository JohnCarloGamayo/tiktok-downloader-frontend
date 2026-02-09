import { useState } from "react";
import { getVideoInfo, downloadVideo, formatNumber } from "./api";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingInfo, setFetchingInfo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloadingFormat, setDownloadingFormat] = useState(null);

  const isValidUrl = (u) => {
    return u.includes("tiktok.com") || u.includes("vm.tiktok.com") || u.includes("vt.tiktok.com");
  };

  const handleFetchInfo = async () => {
    if (!url.trim()) return;
    if (!isValidUrl(url)) {
      setMessage({ type: "error", text: "Please enter a valid TikTok URL." });
      return;
    }

    setFetchingInfo(true);
    setMessage(null);
    setVideoInfo(null);

    try {
      const info = await getVideoInfo(url);
      setVideoInfo(info);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Failed to fetch video info.",
      });
    } finally {
      setFetchingInfo(false);
    }
  };

  const handleDownload = async (format) => {
    if (!videoInfo) return;

    setLoading(true);
    setDownloadingFormat(format);
    setProgress(0);
    setMessage(null);

    try {
      const { blob, filename } = await downloadVideo(videoInfo.video_url, format, setProgress);

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);

      setMessage({ type: "success", text: "Download completed successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Download failed. Please try again.",
      });
    } finally {
      setLoading(false);
      setDownloadingFormat(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !fetchingInfo && !loading) handleFetchInfo();
  };

  const handleReset = () => {
    setUrl("");
    setVideoInfo(null);
    setMessage(null);
    setProgress(0);
  };

  return (
    <div className="app">
      <div className="card">
        {/* Header */}
        <div className="header">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
          <h1>TikTok Downloader</h1>
          <p className="subtitle">Download TikTok videos in HD, with watermark, or as MP3</p>
        </div>

        {/* URL Input Section */}
        {!videoInfo ? (
          <div className="input-section">
            <div className="input-wrapper">
              <input
                type="url"
                placeholder="Paste TikTok video URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={fetchingInfo}
              />
              <button
                className="btn-fetch"
                onClick={handleFetchInfo}
                disabled={fetchingInfo || !url.trim()}
              >
                {fetchingInfo ? (
                  <span className="spinner"></span>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                )}
              </button>
            </div>
            <p className="hint">Supports tiktok.com, vm.tiktok.com, and vt.tiktok.com links</p>
          </div>
        ) : (
          /* Video Preview Section */
          <div className="preview-section">
            <button className="btn-back" onClick={handleReset}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              New Video
            </button>

            <div className="video-preview">
              <div className="thumbnail-container">
                {videoInfo.thumbnail ? (
                  <img src={videoInfo.thumbnail} alt="Video thumbnail" />
                ) : (
                  <div className="thumbnail-placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
                {videoInfo.duration_string && (
                  <span className="duration">{videoInfo.duration_string}</span>
                )}
              </div>

              <div className="video-info">
                <h3 className="video-title">{videoInfo.title || "TikTok Video"}</h3>
                <p className="video-author">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  {videoInfo.author}
                </p>

                <div className="video-stats">
                  {videoInfo.view_count !== null && (
                    <span className="stat">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      {formatNumber(videoInfo.view_count)}
                    </span>
                  )}
                  {videoInfo.like_count !== null && (
                    <span className="stat">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {formatNumber(videoInfo.like_count)}
                    </span>
                  )}
                  {videoInfo.comment_count !== null && (
                    <span className="stat">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/>
                      </svg>
                      {formatNumber(videoInfo.comment_count)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="download-options">
              <h4>Choose Download Format</h4>
              <div className="options-grid">
                <button
                  className="option-btn hd"
                  onClick={() => handleDownload("hd_no_watermark")}
                  disabled={loading}
                >
                  {downloadingFormat === "hd_no_watermark" ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                      <span className="option-label">HD Video</span>
                      <span className="option-desc">No Watermark</span>
                    </>
                  )}
                </button>

                <button
                  className="option-btn watermark"
                  onClick={() => handleDownload("with_watermark")}
                  disabled={loading}
                >
                  {downloadingFormat === "with_watermark" ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                      </svg>
                      <span className="option-label">Standard</span>
                      <span className="option-desc">With Watermark</span>
                    </>
                  )}
                </button>

                <button
                  className="option-btn audio"
                  onClick={() => handleDownload("mp3")}
                  disabled={loading}
                >
                  {downloadingFormat === "mp3" ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                      <span className="option-label">MP3 Audio</span>
                      <span className="option-desc">Audio Only</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="progress-section">
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <p className="progress-text">
                  {progress < 100 ? `Downloading... ${progress}%` : "Processing..."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Messages */}
        {message && (
          <div className={`message ${message.type}`}>
            {message.type === "success" ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            )}
            {message.text}
          </div>
        )}
      </div>

      <footer className="footer">
        <p>For personal use only. Respect content creators' rights.</p>
      </footer>
    </div>
  );
}

export default App;
