/*
  Warnings:

  - You are about to drop the column `request_form_id` on the `masters_categories` table. All the data in the column will be lost.
  - Added the required column `lesson_category_id` to the `masters_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `masters_categories` DROP FOREIGN KEY `masters_categories_request_form_id_fkey`;

-- AlterTable
ALTER TABLE `masters_categories` DROP COLUMN `request_form_id`,
    ADD COLUMN `lesson_category_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `lesson_category_id` ON `masters_categories`(`lesson_category_id`);

-- AddForeignKey
ALTER TABLE `masters_categories` ADD CONSTRAINT `masters_categories_lesson_category_id_fkey` FOREIGN KEY (`lesson_category_id`) REFERENCES `lesson_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
