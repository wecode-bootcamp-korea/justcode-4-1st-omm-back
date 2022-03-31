/*
  Warnings:

  - You are about to drop the column `theme_category_id` on the `lesson_categories` table. All the data in the column will be lost.
  - You are about to drop the `theme_categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thema_category_id` to the `lesson_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lesson_categories` DROP FOREIGN KEY `lesson_categories_theme_category_id_fkey`;

-- AlterTable
ALTER TABLE `lesson_categories` DROP COLUMN `theme_category_id`,
    ADD COLUMN `thema_category_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `theme_categories`;

-- CreateTable
CREATE TABLE `thema_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `thema_category_id` ON `lesson_categories`(`thema_category_id`);

-- AddForeignKey
ALTER TABLE `lesson_categories` ADD CONSTRAINT `lesson_categories_thema_category_id_fkey` FOREIGN KEY (`thema_category_id`) REFERENCES `thema_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
