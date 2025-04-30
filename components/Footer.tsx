export default function Footer() {
    return (
      <footer
        style={{
          borderTop: '1px solid #e0e0e0',
          padding: '2rem',
          backgroundColor: '#f9f9f9',
          fontSize: '0.875rem',
          color: '#555',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</a>
          <a href="/security" style={{ textDecoration: 'none', color: 'inherit' }}>Security</a>
          <a href="/risk-disclosure" style={{ textDecoration: 'none', color: 'inherit' }}>Risk Disclosure</a>
          <a href="/careers" style={{ textDecoration: 'none', color: 'inherit' }}>Careers</a>
          <a href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
          <a href="mailto:support@boundless.ai" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</a>
          <a href="/investor-console" style={{ textDecoration: 'none', color: 'inherit' }}>Investor Console Demo</a>
          <a href="/apply" style={{ textDecoration: 'none', color: 'inherit' }}>Request Access </a>

        </div>
        <p style={{ opacity: 0.8 }}>© {new Date().getFullYear()} Redentor Capital Brasil LTDA. Todos os direitos reservados.</p>
        <p style={{ opacity: 0.8 }}> Uma subsidiária da Boundles Group LLC. All rights reserved.</p>
      </footer>
    );
  }
  