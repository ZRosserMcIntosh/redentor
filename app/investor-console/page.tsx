'use client';

import { useEffect, useState } from 'react';

export default function InvestorConsole() {
  const capitalInvestedUSD = 100000.00;
  const performanceMultiple = 2.35; // Mocked performance multiple
  const totalValueUSD = capitalInvestedUSD * performanceMultiple;
  const totalReturnUSD = totalValueUSD - capitalInvestedUSD;
  const annualReturn = 0.366; // Mocked annualized return
  const fundAUM = 1458720.00; // Mocked fund AUM
  const investorShare = (totalValueUSD / fundAUM) * 100;

  const [brlValue, setBrlValue] = useState<number | null>(null);

  useEffect(() => {
    // Mock conversion rate: 1 USD = 5.85 BRL
    const conversionRate = 5.85;
    setBrlValue(totalValueUSD * conversionRate);
  }, []);

  return (
    <div style={{ padding: '3rem 2rem', background: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
        Welcome John <span style={{ fontSize: '1rem', fontWeight: 400, color: '#888' }}>(Demo)</span>
      </h1>

      <p style={{ marginBottom: '2rem', color: '#555' }}>
        This is a demo preview of your the investor terminal for the Redentor Fund. Real-time data, performance tracking, and fund-level insights will be available here.
      </p>

      {/* HERO ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <Stat label="Capital Invested" value={`$${capitalInvestedUSD.toLocaleString()}`} />
        <Stat label="Current Value" value={`$${totalValueUSD.toLocaleString()}`} />
        <Stat label="Total Return" value={`+$${totalReturnUSD.toLocaleString()}`} />
        <Stat label="Annualized Return" value={`${(annualReturn * 100).toFixed(2)}%`} />
        <Stat label="Value in BRL" value={`R$${brlValue?.toLocaleString()}`} />
      </div>

      {/* PERFORMANCE CHART */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Performance vs SPX (Last 2 Years)</h2>
        <div style={{
          marginTop: '1rem',
          padding: '2rem',
          background: 'white',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 0 12px rgba(0,0,0,0.05)',
          fontStyle: 'italic',
          color: '#666'
        }}>
          {/* Placeholder chart image — replace with real chart module */}
          <p>[Chart comparing SPX vs Redentor Fund here]</p>
        </div>
      </section>

      {/* FUND DATA */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Fund Metrics</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          <Stat label="Fund AUM" value={`$${fundAUM.toLocaleString()}`} />
          <Stat label="Investor Share of AUM" value={`${investorShare.toFixed(2)}%`} />
          <Stat label="Inception Date" value="Jan 2022" />
          <Stat label="Liquidity Tier" value="Quarterly, 30-day notice" />
          <Stat label="Benchmark Index" value="S&P 500 (SPX)" />
        </div>
      </section>

      {/* ACTIONS */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Redemption Request</h2>
        <p style={{ marginBottom: '1rem', color: '#555' }}>
          You may request a redemption of your capital according to the fund's liquidity terms.
        </p>
        <button style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#111',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          Request Redemption
        </button>
      </section>

      {/* DOCUMENTS */}
      <section>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Performance Documents</h2>
        <ul style={{ paddingLeft: '1rem' }}>
          <li><a href="/docs/q1-2025-report.pdf" target="_blank">Q1 2025 Performance Report</a></li>
          <li><a href="/docs/k1-2024.pdf" target="_blank">2024 Form 1099</a></li>
        </ul>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'white', borderRadius: '8px', padding: '1rem 1.5rem', boxShadow: '0 0 8px rgba(0,0,0,0.04)' }}>
      <p style={{ fontSize: '0.9rem', color: '#777' }}>{label}</p>
      <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{value}</p>
    </div>
  );
}
