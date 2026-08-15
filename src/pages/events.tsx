import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';

export default function EventsPage() {
  return (
    <>
      <Helmet>
        <title>Events We Cater — SWAAD Catering Services</title>
        <meta name="description" content="SWAAD Catering Services for weddings, corporate events, birthdays, anniversaries, festivals, private parties, and outdoor events." />
        <link rel="canonical" href="https://swaadcatering.com/events" />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#F5EDD8' }}>
        <div className="text-center px-4">
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#6B1A2A', marginBottom: '1rem' }}>Events We Cater</h1>
          <p style={{ fontFamily: 'Raleway, sans-serif', color: '#4A3728' }}>This page is coming soon.</p>
          <Link to="/" className="mt-4 inline-block text-sm underline" style={{ color: '#C9A84C' }}>Back to Home</Link>
        </div>
      </main>
    </>
  );
}
