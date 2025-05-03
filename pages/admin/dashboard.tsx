import React from "react";
import { GetServerSidePropsContext } from "next";
import { PrismaClient } from "@prisma/client";
import { requireRole } from "@/lib/auth";

const prisma = new PrismaClient();

interface DashboardProps {
  performances: any[];
  clients: any[];
  employees: any[];
  commissions: any[];
  partners: any[];
}

export default function AdminDashboard({
  performances,
  clients,
  employees,
  commissions,
  partners,
}: DashboardProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Performances</h2>
        <pre>{JSON.stringify(performances, null, 2)}</pre>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Clients</h2>
        <pre>{JSON.stringify(clients, null, 2)}</pre>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Employees</h2>
        <pre>{JSON.stringify(employees, null, 2)}</pre>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Commissions</h2>
        <pre>{JSON.stringify(commissions, null, 2)}</pre>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Partners</h2>
        <pre>{JSON.stringify(partners, null, 2)}</pre>
      </section>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const auth = await requireRole(context, ["admin", "partner"]);
    if ("redirect" in auth) return auth;

    const performances = await prisma.monthlyPerformance.findMany({
      orderBy: { month: "desc" },
    });

    const clients = await prisma.user.findMany({
      where: { role: "client" },
      include: { capitalAccounts: true, closer: true },
    });

    const employees = await prisma.user.findMany({
      where: { role: "employee" },
      include: { employeeCommissions: true },
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
          totalCommission: e.employeeCommissions.reduce(
            (acc, curr) => acc + curr.commissionEarned,
            0
          ),
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
  } catch (error) {
    console.error("SSR ERROR (admin/dashboard):", error);
    return {
      props: {
        performances: [],
        clients: [],
        employees: [],
        commissions: [],
        partners: [],
      },
    };
  }
}
