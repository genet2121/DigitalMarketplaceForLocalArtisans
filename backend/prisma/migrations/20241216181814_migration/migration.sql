/*
  Warnings:

  - You are about to drop the column `record` on the `attachment` table. All the data in the column will be lost.
  - You are about to drop the column `table` on the `attachment` table. All the data in the column will be lost.
  - You are about to alter the column `extension` on the `attachment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to drop the column `business_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `passwrd` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_type` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoryattribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profile_picture_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_parent_id_fkey`;

-- DropForeignKey
ALTER TABLE `categoryattribute` DROP FOREIGN KEY `category_id`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `cat_attr_id`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `seller_id`;

-- DropIndex
DROP INDEX `email` ON `user`;

-- DropIndex
DROP INDEX `user_email_key` ON `user`;

-- AlterTable
ALTER TABLE `attachment` DROP COLUMN `record`,
    DROP COLUMN `table`,
    ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `page_name` VARCHAR(191) NULL,
    MODIFY `extension` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `business_name`,
    DROP COLUMN `image`,
    DROP COLUMN `passwrd`,
    DROP COLUMN `user_type`,
    DROP COLUMN `username`,
    DROP COLUMN `verificationToken`,
    DROP COLUMN `verified`,
    ADD COLUMN `age` VARCHAR(255) NULL,
    ADD COLUMN `first_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `gender` ENUM('female', 'male', 'other') NOT NULL,
    ADD COLUMN `last_name` VARCHAR(255) NULL,
    ADD COLUMN `password` VARCHAR(255) NULL,
    ADD COLUMN `phone` VARCHAR(255) NULL,
    ADD COLUMN `profile_picture_id` INTEGER NULL,
    ADD COLUMN `user_role` ENUM('user', 'admin') NOT NULL;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `categoryattribute`;

-- DropTable
DROP TABLE `product`;

-- CreateIndex
CREATE UNIQUE INDEX `user_profile_picture_id_key` ON `user`(`profile_picture_id`);
