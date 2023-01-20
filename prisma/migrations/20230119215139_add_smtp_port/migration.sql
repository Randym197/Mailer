/*
  Warnings:

  - Added the required column `smtpPort` to the `Mailer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mailer" ADD COLUMN     "smtpPort" INTEGER NOT NULL;
