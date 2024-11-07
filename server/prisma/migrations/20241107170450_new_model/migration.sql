/*
  Warnings:

  - You are about to drop the column `bookingType` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `physicianId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `cases` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `cases` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `phone` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `title` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to drop the `physicians` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `riskhistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `riskhistoryinfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `booking_detail` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_type` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `case_status` to the `cases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officerId` to the `cases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_physicianId_fkey`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cases` DROP FOREIGN KEY `cases_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `cases` DROP FOREIGN KEY `cases_physicianId_fkey`;

-- DropForeignKey
ALTER TABLE `cases` DROP FOREIGN KEY `cases_userId_fkey`;

-- DropForeignKey
ALTER TABLE `riskhistory` DROP FOREIGN KEY `RiskHistory_caseId_fkey`;

-- DropForeignKey
ALTER TABLE `riskhistoryinfo` DROP FOREIGN KEY `RiskHistoryInfo_userId_fkey`;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `bookingType`,
    DROP COLUMN `physicianId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `booking_detail` TEXT NOT NULL,
    ADD COLUMN `booking_type` ENUM('bloodTest', 'consult') NOT NULL,
    MODIFY `appointment` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `cases` DROP COLUMN `status`,
    DROP COLUMN `userId`,
    ADD COLUMN `case_status` ENUM('accepted', 'notAccepting') NOT NULL,
    ADD COLUMN `officerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `updatedAt`,
    MODIFY `phone` VARCHAR(10) NOT NULL,
    MODIFY `username` VARCHAR(100) NOT NULL,
    MODIFY `role` ENUM('ADMIN', 'USER', 'OFFICER', 'PHYSICIAN') NOT NULL,
    MODIFY `title` VARCHAR(10) NOT NULL;

-- DropTable
DROP TABLE `physicians`;

-- DropTable
DROP TABLE `riskhistory`;

-- DropTable
DROP TABLE `riskhistoryinfo`;

-- CreateTable
CREATE TABLE `contents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content_name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contentId` INTEGER NOT NULL,
    `detail` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ques_name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `questions_ques_name_key`(`ques_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `anwer_text` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `answerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `content_details` ADD CONSTRAINT `content_details_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `contents`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cases` ADD CONSTRAINT `cases_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cases` ADD CONSTRAINT `cases_officerId_fkey` FOREIGN KEY (`officerId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cases` ADD CONSTRAINT `cases_physicianId_fkey` FOREIGN KEY (`physicianId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `answers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
