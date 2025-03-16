-- AlterTable
ALTER TABLE `user` ADD COLUMN `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';
