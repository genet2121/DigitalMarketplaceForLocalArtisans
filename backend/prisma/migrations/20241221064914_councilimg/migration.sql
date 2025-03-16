/*
  Warnings:

  - You are about to alter the column `gender` on the `counseling` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(4))`.
  - You are about to alter the column `marital_status` on the `counseling` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(5))`.
  - You are about to alter the column `occupation_status` on the `counseling` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(6))`.

*/
-- AlterTable
ALTER TABLE `counseling` MODIFY `gender` ENUM('female', 'male', 'other') NOT NULL,
    MODIFY `marital_status` ENUM('single', 'married', 'divorced', 'widowed') NOT NULL,
    MODIFY `occupation_status` ENUM('employed', 'unemployed', 'selfemployed', 'student', 'retired') NOT NULL;
