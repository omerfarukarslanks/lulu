/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_companyId_key" ON "User"("companyId");
