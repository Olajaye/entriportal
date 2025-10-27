-- CreateEnum
CREATE TYPE "public"."EstatePlan" AS ENUM ('ANNUAL', 'BASIC', 'MEDIUM');

-- AlterTable
ALTER TABLE "public"."Estate" ADD COLUMN     "estatePlan" "public"."EstatePlan" NOT NULL DEFAULT 'BASIC';
