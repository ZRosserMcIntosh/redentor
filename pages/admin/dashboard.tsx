import { PrismaClient } from "@prisma/client";
import { requireRole } from "@/lib/auth";

// Use a shared Prisma instance (better for serverless)
const prisma = new PrismaClient();

export async function getServerSideProps(context: any) {
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
