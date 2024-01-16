import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const reportSchema = sqliteTable("report", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  date: text("date"),
  time: text("time").notNull(),
  today: text("today").notNull(),
  tomorrow: text("tomorrow").notNull(),
  bottleneck: text("bottleneck").notNull(),
  userID: text("userID").notNull()
});

