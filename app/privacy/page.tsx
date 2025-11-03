export const metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return (
    <main id="main-content" className="prose mx-auto p-6">
      <h1>Privacy Policy</h1>
      <p>This is a minimal placeholder. Replace with reviewed policy before launch.</p>
      <h2>Data We Process</h2>
      <ul>
        <li>Account data</li>
        <li>Usage data</li>
      </ul>
      <h2>Your Rights</h2>
      <p>Contact support for data access, export, and deletion.</p>
      <p>Last updated: {new Date().toISOString().slice(0,10)}</p>
    </main>
  );
}