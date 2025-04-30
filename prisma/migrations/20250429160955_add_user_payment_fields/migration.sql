-- AlterTable
ALTER TABLE "User" ADD COLUMN     "closerId" TEXT,
ADD COLUMN     "commissionRate" DOUBLE PRECISION,
ADD COLUMN     "editable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentInformation" TEXT,
ADD COLUMN     "preferredPaymentMethod" TEXT;

-- CreateTable
CREATE TABLE "Commission" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "performanceFee" DOUBLE PRECISION NOT NULL,
    "commissionRate" DOUBLE PRECISION NOT NULL,
    "commissionEarned" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Commission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_closerId_fkey" FOREIGN KEY ("closerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
