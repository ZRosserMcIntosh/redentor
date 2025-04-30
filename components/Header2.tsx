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
        fontFamily: `'Helvetica Neue', sans-serif`,
        backgroundColor: 'white'
        
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.95rem' }}>
        <img
          src="/boundless-logo.png"
          alt="Boundless Group Redentor Fund"
          style={{ height: '120px', objectFit: 'contain' }}
          
        />
        <span style={{ fontSize: '1.25rem', fontWeight: 600 }}></span>
      </div>

      {/* below: Navigation */}
      <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem' }}>
      <Link href="/crm" style={{ textDecoration: 'none', color: '#333' }}>
          CRM
        </Link>
        <Link href="/clients" style={{ textDecoration: 'none', color: '#333' }}>
          Clients
        </Link>
        <Link href="/quantitative-models" style={{ textDecoration: 'none', color: '#333' }}>
          Quantitative Models
        </Link>
        <Link href="/partners-and-employees" style={{ textDecoration: 'none', color: '#333' }}>
          Partners & Employees
        </Link>
        <Link href="/secure-documents-library" style={{ textDecoration: 'none', color: '#333' }}>
          Secure Documents Library
        </Link>
        <Link href="/api" style={{ textDecoration: 'none', color: '#333' }}>
          Account Settings
        </Link>
      </nav>
    </header>
  );
}
