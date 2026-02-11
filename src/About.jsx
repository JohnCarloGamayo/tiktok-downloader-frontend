import AdUnit from "./AdUnit";

function About({ onBack }) {
  return (
    <div className="card legal-page">
      <button className="btn-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Back to Home
      </button>

      <h1>About & Disclaimer</h1>
      <p className="updated">Last updated: February 10, 2026</p>

      {/* Ad Unit */}
      <AdUnit slot="1234567890" style={{ marginBottom: "2rem" }} />

      <section>
        <h2>About This Tool</h2>
        <p>
          TikTok Downloader is a free, easy-to-use web tool that allows users to download 
          TikTok videos and convert them to various formats. Our service provides three 
          download options:
        </p>
        <ul>
          <li><strong>HD No Watermark:</strong> High-quality video without TikTok branding</li>
          <li><strong>With Watermark:</strong> Standard quality video with original TikTok watermark</li>
          <li><strong>MP3 Audio:</strong> Extract audio only in MP3 format</li>
        </ul>
        <p>
          <strong>No signup required.</strong> This is a completely free tool with no registration, 
          subscription, or payment needed. Simply paste a TikTok URL and download.
        </p>
      </section>

      <section>
        <h2>How It Works</h2>
        <p>
          Our service uses yt-dlp technology to fetch video data from TikTok's servers. 
          When you submit a URL, our backend processes the request and delivers the video 
          or audio file directly to your device. No files are stored on our servers after 
          download completion.
        </p>
      </section>

      <section>
        <h2>Disclaimer</h2>
        <p>
          <strong>For Personal Use Only:</strong> This tool is intended for personal, 
          non-commercial use. Users must respect content creators' intellectual property 
          rights and TikTok's Terms of Service.
        </p>
        <p>
          <strong>Copyright Responsibility:</strong> We do not host, store, or own any 
          content processed through this tool. Users are solely responsible for ensuring 
          their downloads comply with copyright laws in their jurisdiction.
        </p>
        <p>
          <strong>No Liability:</strong> This service is provided "as is" without warranties 
          of any kind. We are not responsible for any misuse of downloaded content or 
          violations of TikTok's terms by users.
        </p>
        <p>
          <strong>Service Availability:</strong> We do not guarantee uninterrupted service. 
          Functionality may be affected by TikTok's API changes, server maintenance, or 
          other technical factors beyond our control.
        </p>
      </section>

      <section>
        <h2>Fair Use Notice</h2>
        <p>
          Downloading content may be subject to fair use provisions under copyright law 
          depending on your jurisdiction. Users should obtain permission from content 
          creators before redistributing, modifying, or using downloaded videos for 
          commercial purposes.
        </p>
      </section>

      <section>
        <h2>Acceptable Use</h2>
        <p>By using this tool, you agree to:</p>
        <ul>
          <li>Use downloaded content for personal, educational, or fair use purposes only</li>
          <li>Respect content creators' rights and give proper attribution when sharing</li>
          <li>Not use this service to infringe copyright or violate TikTok's Terms of Service</li>
          <li>Not redistribute or resell downloaded content without permission</li>
        </ul>
      </section>

      <section>
        <h2>Contact & Support</h2>
        <p>
          This is an open-source project. For technical issues, feature requests, or 
          contributions, please visit our GitHub repository. We appreciate feedback and 
          community involvement to improve this tool.
        </p>
      </section>
    </div>
  );
}

export default About;
