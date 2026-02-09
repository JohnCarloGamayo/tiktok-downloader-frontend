import { useState, useEffect } from "react";

function AdModal({ onComplete, onCancel }) {
  const [countdown, setCountdown] = useState(5);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Initialize AdSense ad
    try {
      if (window.adsbygoogle && !adLoaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }

    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, adLoaded]);

  return (
    <div className="ad-modal-overlay">
      <div className="ad-modal">
        <div className="ad-modal-header">
          <h3>Please wait...</h3>
          {countdown > 0 ? (
            <p className="ad-countdown">Skip in {countdown}s</p>
          ) : (
            <button className="ad-skip-btn" onClick={onComplete}>
              ✕ Skip Ad
            </button>
          )}
        </div>

        <div className="ad-container">
          {/* Google AdSense Ad Unit */}
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-9763546683193902"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>

        <div className="ad-modal-footer">
          <button className="ad-cancel-btn" onClick={onCancel}>
            Cancel Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdModal;
