import { formSchema } from "@/components/day1/report_create";
import { reportSchema } from "@/db/schema";
import { z } from "zod";

export type ReportType = typeof reportSchema.$inferSelect;
export type FormSchemaType = z.infer<typeof formSchema>

export type Result = {
    success: boolean;
    message: string;
  };