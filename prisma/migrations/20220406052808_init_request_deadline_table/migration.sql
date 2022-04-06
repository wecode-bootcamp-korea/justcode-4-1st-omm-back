-- CreateTable
CREATE TABLE `request_deadline` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lesson_category_id` INTEGER NOT NULL,
    `reason` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `lesson_category_id`(`lesson_category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `request_deadline` ADD CONSTRAINT `request_deadline_lesson_category_id_fkey` FOREIGN KEY (`lesson_category_id`) REFERENCES `lesson_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
