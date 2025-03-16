-- AlterTable
ALTER TABLE `counseling` ADD COLUMN `status` ENUM('Solved', 'NotSolved') NOT NULL DEFAULT 'NotSolved';
