/*
  Warnings:

  - Added the required column `table` to the `attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attachment` ADD COLUMN `table` VARCHAR(191) NOT NULL;
