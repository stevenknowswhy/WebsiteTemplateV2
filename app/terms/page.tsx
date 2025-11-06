export const metadata = { title: "Terms of Service" };
export default function TermsPage() {
  return (
    <main id="main-content" className="prose mx-auto p-6">
      <h1>Terms of Service</h1>
      <p>Placeholder terms. Replace with reviewed terms before launch.</p>
      <h2>Acceptable Use</h2>
      <p>No abuse, fraud, or unlawful activity.</p>
      <p>Last updated: {new Date().toISOString().slice(0,10)}</p>
    </main>
  );
}