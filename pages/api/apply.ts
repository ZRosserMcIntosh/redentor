// pages/api/apply.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { fullName, email, message } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if this email has already applied
    const existing = await prisma.userApplication.findUnique({ where: { email } });

    if (existing) {
      return res.status(409).json({ error: 'Application already submitted' });
    }

    await prisma.userApplication.create({
      data: {
        fullName,
        email,
        message,
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[API: Apply Error]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
