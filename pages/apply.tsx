// pages/apply.tsx
import { useState } from 'react';
import React from "react";
import Header from '../components/header';
import Footer from '@/components/footer';

export default function ApplyPage() {
  const [status, setStatus] = useState<'idle' | 'submitted' | 'error'>('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const body = {
      fullName: form.get('fullName'),
      preferredName: form.get('preferredName'),
      email: form.get('email'),
      message: form.get('message'),
    };

    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) setStatus('submitted');
    else setStatus('error');
  }

  return (
    <>
      <Header />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Request Access</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="fullName" placeholder="Full Name" required className="border p-2 w-full" />
          <input name="preferredName" placeholder="Preferred Name" required className="border p-2 w-full" />
          <input name="email" type="email" placeholder="Email" required className="border p-2 w-full" />
          <textarea name="message" placeholder="Why are you applying?" className="border p-2 w-full" />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">Submit Request</button>
        </form>
        {status === 'submitted' && <p className="mt-4 text-green-600">Thank you. You will receive an email with your username and password if your request is approved.</p>}
        {status === 'error' && <p className="mt-4 text-red-600">Something went wrong. Try again later.</p>}
      </div>
    </>
  );
}
