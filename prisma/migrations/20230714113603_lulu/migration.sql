/*
  Warnings:

  - Added the required column `roleIds` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `permissions` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `roleIds` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `roleIds` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "roleIds" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "permissions",
ADD COLUMN     "permissions" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "roleIds" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleIds",
ADD COLUMN     "roleIds" JSONB NOT NULL;
