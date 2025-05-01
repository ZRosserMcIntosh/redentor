export default function HomePage() {
    return (
      <div
        style={{
          backgroundImage: `url('/images/hero-background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 160px)', // subtracts header/footer height if needed
          fontFamily: `'Helvetica Neue', sans-serif`,
          fontSize: '2.9rem',
          fontWeight: 500,
          textAlign: 'center',
          color: 'white' // ✅ sets the text color to white
        }}
      >
        Quando o valor é muito claro, as decisões são muito fáceis.
      </div>
    );
  }
  