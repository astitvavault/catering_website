import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';

export default function GalleryPage() {
  return (
    <>
      <Helmet>
        <title>Gallery — SWAAD Catering Services</title>
        <meta name="description" content="Browse SWAAD Catering's gallery — wedding setups, buffet presentations, live cooking stations, traditional Indian dishes, and elegant event arrangements." />
        <link rel="canonical" href="https://swaadcatering.com/gallery" />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#F5EDD8' }}>
        <div className="text-center px-4">
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#6B1A2A', marginBottom: '1rem' }}>Our Gallery</h1>
          <p style={{ fontFamily: 'Raleway, sans-serif', color: '#4A3728' }}>This page is coming soon.</p>
          <Link to="/" className="mt-4 inline-block text-sm underline" style={{ color: '#C9A84C' }}>Back to Home</Link>
        </div>
      </main>
    </>
  );
}
