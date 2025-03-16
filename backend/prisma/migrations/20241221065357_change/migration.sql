/*
  Warnings:

  - Added the required column `updatedAt` to the `contactUs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `faq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contactus` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `donation` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `faq` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
