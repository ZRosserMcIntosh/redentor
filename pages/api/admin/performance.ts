import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { month, realizedPL, capitalContributions, capitalRedemptions } = req.body;

// Parse incoming form fields
const realizedPLNum = parseFloat(realizedPL);
const capitalContributionsNum = parseFloat(capitalContributions);
const capitalRedemptionsNum = parseFloat(capitalRedemptions);

const totalFundAUM = 1000000; // Placeholder
const realizedPLPercent = (realizedPLNum / totalFundAUM) * 100;

const managementFee = totalFundAUM * 0.00333;
const performanceFee = realizedPLNum > 0 ? realizedPLNum * 0.44 : 0;
const totalFees = managementFee + performanceFee;

const netAUM = totalFundAUM + realizedPLNum + capitalContributionsNum - capitalRedemptionsNum - totalFees;
const clientGainsNet = realizedPLNum - performanceFee;
const clientGainsNetPercent = (clientGainsNet / totalFundAUM) * 100;

try {
  const newPerformance = await prisma.monthlyPerformance.create({
    data: {
      month,
      totalFundAUM,
      realizedPL: realizedPLNum,
      realizedPLPercent,
      capitalContributions: capitalContributionsNum,
      capitalRedemptions: capitalRedemptionsNum,
      eomAUM: netAUM,
      performanceFees: performanceFee,
      managementFees: managementFee,
      totalFees,
      netAUM,
      clientGainsNet,
      clientGainsNetPercent,
    },
  });
} catch (error) {
  console.error("Error inserting MonthlyPerformance:", error);
  }
}

