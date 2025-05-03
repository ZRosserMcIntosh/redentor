// pages/admin/performance.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Footer from "../../components/footer";
import Header from "../../components/header";

interface FormData {
  month: string;
  realizedPL: number;
  capitalContributions: number;
  capitalRedemptions: number;
}

interface MonthlyPerformance {
  id: string;
  month: string;
  realizedPL: number;
  capitalContributions: number;
  capitalRedemptions: number;
  netAUM: number;
  clientGainsNet: number;
}

export default function AdminPerformancePage({ performances }: { performances: MonthlyPerformance[] }) {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await axios.post('/api/admin/performance', data);
      alert('Monthly performance recorded successfully!');
      reset();
      window.location.reload(); // reload to see new month
    } catch (error) {
      console.error(error);
      alert('Error submitting performance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin - Monthly Performance</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-10">
        <div>
          <label>Month (YYYY-MM):</label>
          <input {...register('month', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Realized P/L ($):</label>
          <input type="number" step="0.01" {...register('realizedPL', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Capital Contributions ($):</label>
          <input type="number" step="0.01" {...register('capitalContributions', { required: true })} className="border p-2 w-full" />
        </div>
        <div>
          <label>Capital Redemptions ($):</label>
          <input type="number" step="0.01" {...register('capitalRedemptions', { required: true })} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Performance History</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Month</th>
            <th className="p-2">Realized P/L</th>
            <th className="p-2">Contributions</th>
            <th className="p-2">Redemptions</th>
            <th className="p-2">Net Client Gains</th>
          </tr>
        </thead>
        <tbody>
          {performances.map((p) => (
            <tr key={p.id} className="text-center border-t">
              <td className="p-2">{p.month}</td>
              <td className="p-2">${p.realizedPL.toFixed(2)}</td>
              <td className="p-2">${p.capitalContributions.toFixed(2)}</td>
              <td className="p-2">${p.capitalRedemptions.toFixed(2)}</td>
              <td className="p-2">${p.clientGainsNet.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  const performances = await prisma.monthlyPerformance.findMany({
    orderBy: { month: 'desc' }
  });

  return {
    props: {
      performances: performances.map((p) => ({
        id: p.id,
        month: p.month,
        realizedPL: p.realizedPL,
        capitalContributions: p.capitalContributions,
        capitalRedemptions: p.capitalRedemptions,
        netAUM: p.netAUM,
        clientGainsNet: p.clientGainsNet,
      })),
    },
  };
}
