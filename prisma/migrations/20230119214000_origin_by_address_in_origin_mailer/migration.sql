/*
  Warnings:

  - You are about to drop the column `address` on the `OriginMailer` table. All the data in the column will be lost.
  - Added the required column `origin` to the `OriginMailer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OriginMailer" DROP COLUMN "address",
ADD COLUMN     "origin" TEXT NOT NULL;
