/*
  Warnings:

  - You are about to drop the column `user_id` on the `participant` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `prayer_request` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `participant` DROP FOREIGN KEY `participant_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `prayer_request` DROP FOREIGN KEY `prayer_request_user_id_fkey`;

-- AlterTable
ALTER TABLE `participant` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `prayer_request` DROP COLUMN `user_id`;
