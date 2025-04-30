// pages/employee/dashboard.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PrismaClient } from '@prisma/client';
import Header from '../../components/Header'; // Adjusted the path to match the likely folder structure
import { getSession } from 'next-auth/react'; // Adjust if you're using another auth method
import { Session } from 'next-auth';

// Extend the Session type to include the role property
declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string;
      role?: string;
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

export default function EmployeeDashboard({ commissions, clients, performances, userPayment }: { commissions: Commission[], clients: Client[], performances: Performance[], userPayment: FormData }) {
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>

      {/* Fund Performance */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Fund Performance</h2>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Month</th>
              <th className="p-2">Fund Realized P/L</th>
              <th className="p-2">Client Net Gains</th>
            </tr>
          </thead>
          <tbody>
            {performances.map((p) => (
              <tr key={p.id} className="text-center border-t">
                <td className="p-2">{p.month}</td>
                <td className="p-2">${p.realizedPL.toFixed(2)}</td>
                <td className="p-2">${p.clientGainsNet.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* My Clients */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">My Clients</h2>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Client Name</th>
              <th className="p-2">Capital Balance</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="text-center border-t">
                <td className="p-2">{c.fullName}</td>
                <td className="p-2">${c.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* My Commissions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">My Commissions</h2>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Month</th>
              <th className="p-2">Client Name</th>
              <th className="p-2">Performance Fee</th>
              <th className="p-2">Commission Earned</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((c) => (
              <tr key={c.id} className="text-center border-t">
                <td className="p-2">{c.month}</td>
                <td className="p-2">{c.clientName}</td>
                <td className="p-2">${c.performanceFee.toFixed(2)}</td>
                <td className="p-2">${c.commissionEarned.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Payment Information */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">My Payment Settings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Preferred Payment Method:</label>
            <input {...register('preferredPaymentMethod')} className="border p-2 w-full" />
          </div>
          <div>
            <label>Payment Information:</label>
            <input {...register('paymentInformation')} className="border p-2 w-full" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Saving...' : 'Save Payment Info'}
          </button>
        </form>
      </section>
    </div>
  );
}

import { requireRole } from "@/lib/auth";

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
    },
  };
}
