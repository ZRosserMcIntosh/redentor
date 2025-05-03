// pages/employee/dashboard.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma'
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { requireRole } from "@/lib/auth";
import { getSession } from "next-auth/react";

// Extend the Session type to include the role property
declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string;
      role?: string;
      fullName?: string;
    };
  }
}

interface Commission {
  id: string;
  month: string;
  clientName: string;
  performanceFee: number;
  commissionEarned: number;
}

interface Client {
  id: string;
  fullName: string;
  balance: number;
}

interface Performance {
  id: string;
  month: string;
  realizedPL: number;
  clientGainsNet: number;
}

interface FormData {
  preferredPaymentMethod: string;
  paymentInformation: string;
}

export default function EmployeeDashboard({ commissions, clients, performances, userPayment, employeeName, totalAUM }: { commissions: Commission[], clients: Client[], performances: Performance[], userPayment: FormData, employeeName: string, totalAUM: number }) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      preferredPaymentMethod: userPayment.preferredPaymentMethod || '',
      paymentInformation: userPayment.paymentInformation || ''
    }
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetch('/api/employee/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      alert('Payment information updated!');
    } catch (error) {
      console.error(error);
      alert('Error updating payment information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans" style={{ fontFamily: `'Helvetica Neue', sans-serif` }}>
      <Header />
      <main className="flex-grow p-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Welcome {employeeName}</h1>
        <h2 className="text-xl mb-10 text-gray-700">Total AUM: ${totalAUM.toFixed(2)}</h2>

        {/* Fund Performance */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4">Fund Performance</h2>
          <div className="overflow-x-auto w-full flex justify-center">
            <table className="min-w-[900px] border text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Capital Contribution</th>
                  <th className="p-3">Redemptions</th>
                  <th className="p-3">AUM</th>
                  <th className="p-3">All Time P/L</th>
                  <th className="p-3">Closing Rate</th>
                  <th className="p-3">Avg Initial Investment</th>
                </tr>
              </thead>
              <tbody>
                {performances.map((p) => (
                  <tr key={p.id} className="border-t text-center">
                    <td className="p-3">{p.month}</td>
                    <td className="p-3">${p.realizedPL.toFixed(2)}</td>
                    <td className="p-3">${p.clientGainsNet.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* My Clients */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-8">My Clients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {clients.map((c) => (
              <div key={c.id} className="bg-white shadow-md rounded-lg p-6 text-left border border-gray-200">
                <h3 className="text-lg font-bold mb-2">{c.fullName}</h3>
                <p><span className="font-medium">Capital Contribution:</span> $0.00</p>
                <p><span className="font-medium">Redemptions:</span> $0.00</p>
                <p><span className="font-medium">AUM:</span> ${c.balance.toFixed(2)}</p>
                <p><span className="font-medium">All Time P/L:</span> $0.00</p>
                <p><span className="font-medium">Closing Rate:</span> --%</p>
                <p><span className="font-medium">Avg Initial Investment:</span> $0.00</p>
              </div>
            ))}
          </div>
        </section>

        {/* My Commissions */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4">My Commissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Performance Fee</th>
                  <th className="p-3">Commission Earned</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((c) => (
                  <tr key={c.id} className="border-t text-center">
                    <td className="p-3">{c.month}</td>
                    <td className="p-3">{c.clientName}</td>
                    <td className="p-3">${c.performanceFee.toFixed(2)}</td>
                    <td className="p-3">${c.commissionEarned.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment Information */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4">My Payment Settings</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Preferred Payment Method:</label>
              <input {...register('preferredPaymentMethod')} className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Payment Information:</label>
              <input {...register('paymentInformation')} className="border p-2 w-full rounded" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
              {loading ? 'Saving...' : 'Save Payment Info'}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const auth = await requireRole(context, ["employee"]);
  if ("redirect" in auth) return auth;

  const prisma = new PrismaClient();
  const employeeId = auth.props.session.user?.id;

  if (!employeeId) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  const commissions = await prisma.commission.findMany({
    where: { employeeId },
    include: { client: true },
  });

  const clients = await prisma.user.findMany({
    where: { closerId: employeeId },
    include: { capitalAccounts: true },
  });

  const performances = await prisma.monthlyPerformance.findMany({
    orderBy: { month: 'desc' },
  });

  const userPayment = await prisma.user.findUnique({
    where: { id: employeeId },
    select: { preferredPaymentMethod: true, paymentInformation: true },
  });

  const employee = await prisma.user.findUnique({
    where: { id: employeeId },
    select: { fullName: true, preferredName: true },
  });

  const capitalAccounts = await prisma.capitalAccount.findMany();
  const totalAUM = capitalAccounts.reduce((acc, curr) => acc + (curr.balance || 0), 0);

  return {
    props: {
      commissions: commissions.map(c => ({
        id: c.id,
        month: c.month,
        clientName: c.client.fullName,
        performanceFee: c.performanceFee,
        commissionEarned: c.commissionEarned,
      })),
      clients: clients.map(c => ({
        id: c.id,
        fullName: c.fullName,
        balance: c.capitalAccounts[0]?.balance || 0,
      })),
      performances: performances.map(p => ({
        id: p.id,
        month: p.month,
        realizedPL: p.realizedPL,
        clientGainsNet: p.clientGainsNet,
      })),
      userPayment: userPayment || {},
      employeeName: employee?.preferredName || employee?.fullName || "Employee",
      totalAUM,
    },
  };
}
