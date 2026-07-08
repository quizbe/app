CREATE TABLE `resource` (
	`id` text PRIMARY KEY NOT NULL,
	`author` text NOT NULL,
	`title` text NOT NULL,
	`created` integer NOT NULL,
	`updated` integer NOT NULL,
	`storage` text NOT NULL,
	`terms` text,
	`questions` text,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
