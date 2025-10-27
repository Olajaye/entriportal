-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('TENANTADMIN', 'RESIDENT', 'GUARD');

-- CreateEnum
CREATE TYPE "public"."TenantAdminStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."AccessCodeStatus" AS ENUM ('ACTIVE', 'USED', 'EXPIRED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "temporaryPassword" BOOLEAN NOT NULL DEFAULT true,
    "status" "public"."TenantAdminStatus" NOT NULL DEFAULT 'ACTIVE',
    "unitNumber" TEXT,
    "userType" "public"."UserType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estateId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Estate" (
    "id" TEXT NOT NULL,
    "estateName" TEXT NOT NULL,
    "paymentReference" TEXT,
    "tenantAdminId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isPaymentVerified" BOOLEAN NOT NULL DEFAULT false,
    "paymentVerifiedAt" TIMESTAMP(3),
    "estateAddressId" INTEGER NOT NULL,
    "subscriptionStartDate" TIMESTAMP(3),
    "subscriptionEndDate" TIMESTAMP(3),
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EstateAddress" (
    "id" SERIAL NOT NULL,
    "streetName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "EstateAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AccessCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,
    "estateId" TEXT NOT NULL,
    "status" "public"."AccessCodeStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "AccessCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Estate_estateName_key" ON "public"."Estate"("estateName");

-- CreateIndex
CREATE UNIQUE INDEX "Estate_paymentReference_key" ON "public"."Estate"("paymentReference");

-- CreateIndex
CREATE UNIQUE INDEX "Estate_slug_key" ON "public"."Estate"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AccessCode_code_key" ON "public"."AccessCode"("code");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_estateId_fkey" FOREIGN KEY ("estateId") REFERENCES "public"."Estate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Estate" ADD CONSTRAINT "Estate_estateAddressId_fkey" FOREIGN KEY ("estateAddressId") REFERENCES "public"."EstateAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AccessCode" ADD CONSTRAINT "AccessCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
