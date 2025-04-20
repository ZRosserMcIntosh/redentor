export default function HomePage() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 160px)', // subtracts header/footer height if needed
          fontFamily: `'Helvetica Neue', sans-serif`, // replace with Palantir-like font below
          fontSize: '2rem',
          fontWeight: 500,
          textAlign: 'center'
        }}
      >
        When value is very clear decisions are very easy.
      </div>
    );
  }