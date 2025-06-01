import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <header style={{
        background: 'linear-gradient(135deg, #2c3e50, #3498db)',
        color: 'white',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>
          {process.env.NEXT_PUBLIC_STRATA_BUILDING_NAME || "Sydney Crown Towers"}
        </h1>
        <p style={{ margin: '0', fontSize: '1.2rem', opacity: '0.9' }}>
          Professional Strata Management Services
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h2 style={{ color: '#2c3e50', marginTop: '0' }}>🏢 Welcome Home</h2>
          <p>Access all your building information, notices, and services in one convenient location. 
          Stay connected with your community and building management.</p>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h2 style={{ color: '#2c3e50', marginTop: '0' }}>📱 24/7 Access</h2>
          <p>Our online portal provides round-the-clock access to important documents, 
          meeting schedules, and building updates from anywhere.</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/mainpage.jpg" width="400" alt="Building exterior" style={{
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }} />
      </div>

      <nav style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#2c3e50', marginTop: '0', borderBottom: '2px solid #e74c3c', paddingBottom: '0.5rem' }}>
          ⚡ Smart Building Portal
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          <a href="/api/building-dashboard" style={{
            display: 'block',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '1rem',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            transition: 'transform 0.3s'
          }}>
            🏢 Building Dashboard
          </a>
          <a href="/api/maintenance-portal" style={{
            display: 'block',
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            color: 'white',
            padding: '1rem',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            transition: 'transform 0.3s'
          }}>
            🔧 Maintenance Portal
          </a>
          <a href="/api/records-reports" style={{
            display: 'block',
            background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
            color: 'white',
            padding: '1rem',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            transition: 'transform 0.3s'
          }}>
            🗄️ Records & Reports
          </a>
          <a href="/api/resident-portal" style={{
            display: 'block',
            background: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
            color: 'white',
            padding: '1rem',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            transition: 'transform 0.3s'
          }}>
            👤 Resident Portal
          </a>
        </div>
      </nav>

      <footer style={{
        textAlign: 'center',
        marginTop: '3rem',
        padding: '2rem',
        background: '#34495e',
        color: 'white',
        borderRadius: '8px'
      }}>
        <p style={{ margin: '0' }}>
          © 2024 {process.env.NEXT_PUBLIC_STRATA_BUILDING_NAME || "Sydney Crown Towers"} | 
          Professional Strata Management Services
        </p>
      </footer>
    </div>
  );
}
