import { useState } from "react";
import { downloadVideo } from "./api";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(null); // { type, text }

  const isValidUrl = (u) => u.includes("tiktok.com");

  const handleDownload = async () => {
    if (!url.trim()) return;
    if (!isValidUrl(url)) {
      setMessage({ type: "error", text: "Please enter a valid TikTok URL." });
      return;
    }

    setLoading(true);
    setProgress(0);
    setMessage(null);

    try {
      const blob = await downloadVideo(url, setProgress);

      // Trigger browser download
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "tiktok_video.mp4";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);

      setMessage({ type: "success", text: "Video downloaded successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) handleDownload();
  };

  return (
    <div className="app">
      <div className="card">
        {/* Logo */}
        <div className="logo" aria-hidden="true">
          ▶
        </div>

        <h1>TikTok Downloader</h1>
        <p className="subtitle">
          Paste a TikTok link to download the video as MP4
        </p>

        {/* Input + Button */}
        <div className="form-group">
          <input
            type="url"
            placeholder="https://www.tiktok.com/@user/video/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            aria-label="TikTok video URL"
          />
          <button
            className="btn-download"
            onClick={handleDownload}
            disabled={loading || !url.trim()}
          >
            {loading ? "Downloading…" : "Download"}
          </button>
        </div>

        {/* Progress */}
        {loading && (
          <div className="progress-section">
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="progress-text">{progress}% complete</p>
          </div>
        )}

        {/* Messages */}
        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
      </div>

      <p className="footer">
        For personal use only. Respect content creators' rights.
      </p>
    </div>
  );
}

export default App;
