'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: 'white'
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img
          src="/boundless-logo.png"
          alt="Boundless Group Redentor Fund"
          style={{ height: '120px', objectFit: 'contain' }}
        />
        <span style={{ fontSize: '1.25rem', fontWeight: 600 }}></span>
      </div>

      {/* Right: Navigation */}
      <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem' }}>
      <Link href="/ourphilosophy" style={{ textDecoration: 'none', color: '#333' }}>
          Our Philosophy
        </Link>
        <Link href="/inquire" style={{ textDecoration: 'none', color: '#333' }}>
          Inquire
        </Link>
        <Link href="/signin" style={{ textDecoration: 'none', color: '#333' }}>
          Sign In
        </Link>
      </nav>
    </header>
  );
}
