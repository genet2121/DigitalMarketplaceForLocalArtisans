/*
  Warnings:

  - You are about to drop the column `image` on the `testimonial` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `youtube_link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `event_start_time` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `testimonial` DROP COLUMN `image`;

-- AlterTable
ALTER TABLE `youtube_link` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
