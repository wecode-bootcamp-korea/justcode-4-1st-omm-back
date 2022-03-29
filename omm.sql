CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `goso_id` int,
  `user_type` int,
  `name` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `phone_number` varchar(255),
  `user_image` varchar(255),
  `user_remove` int,
  `creted_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `goso` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `name` varchar(255),
  `email` varchar(255),
  `user_image` varchar(255),
  `phone_number` varchar(255),
  `intro` varchar(255),
  `map` varchar(255),
  `user_remove` int,
  `creted_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `goso_catagories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `goso_id` int,
  `child_categories_id` int,
  `creted_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `goso_activity_images` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `goso_id` int,
  `creted_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `parent_categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `creted_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `child_categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `parent_categories_id` int,
  `creted_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `reivew` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `writer_user` varchar(255),
  `grade` int,
  `comment` varchar(255),
  `user_id` int,
  `creted_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `dance_reson_request` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `qustion_1` int,
  `qustion_2` int,
  `qustion_3` int,
  `qustion_4` int,
  `creted_at` datetime,
  `updated_at` datetime
);

ALTER TABLE `user` ADD FOREIGN KEY (`goso_id`) REFERENCES `goso` (`id`);

ALTER TABLE `goso` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `goso_catagories` ADD FOREIGN KEY (`goso_id`) REFERENCES `goso` (`id`);

ALTER TABLE `goso_catagories` ADD FOREIGN KEY (`child_categories_id`) REFERENCES `child_categories` (`id`);

ALTER TABLE `goso_activity_images` ADD FOREIGN KEY (`goso_id`) REFERENCES `goso` (`id`);

ALTER TABLE `child_categories` ADD FOREIGN KEY (`parent_categories_id`) REFERENCES `parent_categories` (`id`);

ALTER TABLE `reivew` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `dance_reson_request` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
