import AdUnit from "./AdUnit";

function PrivacyPolicy({ onBack }) {
  return (
    <div className="card legal-page">
      <button className="btn-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Back to Home
      </button>

      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: February 10, 2026</p>

      {/* Ad Unit */}
      <AdUnit slot="1234567890" style={{ marginBottom: "2rem" }} />

      <section>
        <h2>Information Collection</h2>
        <p>
          This TikTok Downloader tool does not collect, store, or share any personal information. 
          We do not require user registration, login, or any form of authentication.
        </p>
      </section>

      <section>
        <h2>Data Processing</h2>
        <p>
          When you use our service, the TikTok video URL you provide is processed temporarily 
          on our servers to fetch and deliver the requested video or audio file. No URLs, 
          download history, or user data is stored or logged.
        </p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>
          This website uses Google AdSense to display advertisements. Google may use cookies 
          and other tracking technologies to serve ads based on your browsing activity. 
          For more information, please visit{" "}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
            Google's Privacy & Terms
          </a>.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Our website does not use cookies for tracking purposes. However, third-party 
          advertising partners like Google AdSense may use cookies to personalize ads. 
          You can manage cookie preferences through your browser settings.
        </p>
      </section>

      <section>
        <h2>User Responsibility</h2>
        <p>
          Users are solely responsible for ensuring that their use of downloaded content 
          complies with applicable copyright laws and TikTok's Terms of Service. We do not 
          monitor or control how users utilize downloaded files.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We reserve the right to update this Privacy Policy at any time. Changes will be 
          effective immediately upon posting on this page. Continued use of the service 
          constitutes acceptance of any modifications.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us through 
          our GitHub repository.
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
