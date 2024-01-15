import { reportSchema } from "@/db/schema";

export type ReportType = typeof reportSchema.$inferSelect;

export type Result = {
    success: boolean;
    message: string;
  };