-- AlterTable
ALTER TABLE `event` ADD COLUMN `status` ENUM('completed', 'pending', 'canceled') NOT NULL DEFAULT 'pending';
