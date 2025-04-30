'use client';

import Link from 'next/link';

export default function AdminHeader() {
  return (
    <header className="w-full border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        {/* Logo centered on mobile, aligned left on desktop */}
        <div className="flex items-center justify-center md:justify-start">
          <img
            src="/boundless-logo.png"
            alt="Boundless Group Redentor Fund"
            className="h-24 object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/admin/dashboard" className="hover:text-black transition">
            Dashboard
          </Link>
          <Link href="/admin/performance" className="hover:text-black transition">
            Performance
          </Link>
          <Link href="/admin/settings" className="hover:text-black transition">
            Request Redemption
          </Link>
        </nav>
      </div>
    </header>
  );
}
