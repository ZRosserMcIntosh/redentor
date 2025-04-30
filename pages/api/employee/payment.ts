// pages/api/employee/payment.ts

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'; // Adjust if needed

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const session = await getSession({ req });
  if (!session || !session.user || session.user.role !== 'employee') {
    return res.status(401).end();
  }

  const { preferredPaymentMethod, paymentInformation } = req.body;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      preferredPaymentMethod,
      paymentInformation,
    },
  });

  res.status(200).json({ success: true });
}
