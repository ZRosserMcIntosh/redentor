'use client';

import Link from 'next/link';
import React from 'react';

export default function header() {
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
          style={{ height: '130px', objectFit: 'contain' }}
        />
        <span style={{ fontSize: '1.3rem', fontWeight: 600 }}></span>
      </div>

      {/* below: Navigation */}
      <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem' }}>
      <Link href="/investment-philosophy" style={{ textDecoration: 'none', color: '#333' }}>
          Investment Philosophy
        </Link>
      <Link href="/future-products" style={{ textDecoration: 'none', color: '#333' }}>
          Future Products
        </Link>
        <Link href="/inquire" style={{ textDecoration: 'none', color: '#333' }}>
          Prospective Investors
        </Link>
        <Link href="/client/dashboard" style={{ textDecoration: 'none', color: '#333' }}>
          Client Login
        </Link>
      </nav>
    </header>
  );
}
