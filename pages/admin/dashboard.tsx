// pages/admin/dashboard.tsx

import { PrismaClient } from "@prisma/client";
import { requireRole } from "@/lib/auth";
import React from "react";
import Header from '@/app/components/header';
import Footer from '../../app/components/footer';
export default function AdminDashboard({ performances, clients, employees, commissions, partners }: any) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Header /> {/* Header component for navigation */}
    
        {/* Main content area */}
      <main className="flex-grow p-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-12 tracking-tight">Master Admin Terminal</h1>
        {/* Fund Performance */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Fund Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Realized P/L</th>
                  <th className="p-3">Contributions</th>
                  <th className="p-3">Redemptions</th>
                  <th className="p-3">Client Net Gains</th>
                </tr>
              </thead>
              <tbody>
                {performances.map((p: any) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">{p.month}</td>
                    <td className="p-3">${p.realizedPL.toFixed(2)}</td>
                    <td className="p-3">${p.capitalContributions.toFixed(2)}</td>
                    <td className="p-3">${p.capitalRedemptions.toFixed(2)}</td>
                    <td className="p-3">${p.clientGainsNet.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Partners */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Partner Equity</h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Equity %</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p: any) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">{p.fullName}</td>
                    <td className="p-3">{p.email}</td>
                    <td className="p-3">{p.equityPercent?.toFixed(2) || "0.00"}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Clients */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Client Database</h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Preferred Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Capital Balance</th>
                  <th className="p-3">Closer</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c: any) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3">{c.fullName}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">${c.capitalBalance.toFixed(2)}</td>
                    <td className="p-3">{c.closerName || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Employees */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Employee Database</h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Employee Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Total Commissions Earned</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e: any) => (
                  <tr key={e.id} className="border-t">
                    <td className="p-3">{e.fullName}</td>
                    <td className="p-3">{e.email}</td>
                    <td className="p-3">${e.totalCommission.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Commissions */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Sales Team Commissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Commission Earned</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((c: any) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3">{c.month}</td>
                    <td className="p-3">{c.employeeName}</td>
                    <td className="p-3">{c.clientName}</td>
                    <td className="p-3">${c.commissionEarned.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const auth = await requireRole(context, ["admin", "partner"]);
  if ("redirect" in auth) return auth;

  const prisma = new PrismaClient();

  const performances = await prisma.monthlyPerformance.findMany({
    orderBy: { month: "desc" },
  });

  const clients = await prisma.user.findMany({
    where: { role: "client" },
    include: { capitalAccounts: true, closer: true },
  });

  const employees = await prisma.user.findMany({
    where: { role: "employee" },
    include: {
      employeeCommissions: true,
    },
  });

  const commissions = await prisma.commission.findMany({
    include: { employee: true, client: true },
  });

  const partners = await prisma.user.findMany({
    where: { role: "partner" },
  });

  return {
    props: {
      performances,
      clients: clients.map((c) => ({
        id: c.id,
        fullName: c.fullName,
        email: c.email,
        capitalBalance: c.capitalAccounts[0]?.balance || 0,
        closerName: c.closer?.fullName || null,
      })),
      employees: employees.map((e) => ({
        id: e.id,
        fullName: e.fullName,
        email: e.email,
        totalCommission: e.employeeCommissions.reduce((acc, curr) => acc + curr.commissionEarned, 0),
      })),
      commissions: commissions.map((c) => ({
        id: c.id,
        month: c.month,
        employeeName: c.employee.fullName,
        clientName: c.client.fullName,
        commissionEarned: c.commissionEarned,
      })),
      partners,
    },
  };
}
