/*
  Warnings:

  - Added the required column `age` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
