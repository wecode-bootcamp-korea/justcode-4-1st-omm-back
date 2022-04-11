/*
  Warnings:

  - You are about to drop the column `master_image` on the `master_posts` table. All the data in the column will be lost.
  - Added the required column `image` to the `master_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `master_posts` DROP COLUMN `master_image`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `masters` ADD COLUMN `master_image` VARCHAR(191) NULL;
