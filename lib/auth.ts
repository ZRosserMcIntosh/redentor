// lib/auth.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";

export async function requireRole(
  context: GetServerSidePropsContext,
  allowedRoles: string[]
) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !allowedRoles.includes(session.user.role)) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
