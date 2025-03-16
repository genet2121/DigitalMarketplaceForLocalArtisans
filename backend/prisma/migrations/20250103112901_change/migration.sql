/*
  Warnings:

  - You are about to drop the column `galleryId` on the `testimonial` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `testimonial` DROP FOREIGN KEY `testimonial_galleryId_fkey`;

-- AlterTable
ALTER TABLE `testimonial` DROP COLUMN `galleryId`;
