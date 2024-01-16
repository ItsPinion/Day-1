CREATE TABLE `report` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text,
	`time` text NOT NULL,
	`today` text NOT NULL,
	`tomorrow` text NOT NULL,
	`bottleneck` text NOT NULL,
	`userID` text NOT NULL
);
