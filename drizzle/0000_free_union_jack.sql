CREATE TABLE `report` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`today` text NOT NULL,
	`tomorrow` text NOT NULL,
	`bottleneck` text NOT NULL,
	`userID` text NOT NULL
);
