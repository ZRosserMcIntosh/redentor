export default function HomePage() {
    return (
      <div
        style={{
          backgroundImage: `url('/images/hero-background.jpg')`,
          borderImageWidth: '100px',
          backgroundSize: 'edgetoedge cover',
          display: 'edgetoedge',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - [HEADER+FOOTER]px)', // subtracts header/footer height if needed
          fontFamily: `'Helvetica Neue', sans-serif`, // replace with Palantir-like font below
          fontSize: '2.5rem',
          fontWeight: 600,
          textAlign: 'center',
          color: 'white',
        }}
      >
        Quando o valor é muito claro, as decisões são muito fáceis.
      </div>
    );
  }