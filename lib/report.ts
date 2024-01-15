import { eq, gt } from "drizzle-orm";
import { reportSchema } from "@/db/schema";
import { db } from "@/db/db";
import { ReportType, Result } from "./types";

export async function createReport(
  newReport: Partial<ReportType>
): Promise<Result> {
  if (
    !newReport.date ||
    !newReport.today ||
    !newReport.tomorrow ||
    !newReport.bottleneck ||
    !newReport.time
  ) {
    throw new Error("Fill all the detail");
  }
  await db.insert(reportSchema).values({
    date: newReport.date,
    time: newReport.time,
    today: newReport.today,
    tomorrow: newReport.tomorrow,
    bottleneck: newReport.bottleneck,
  });
  return {
    success: true,
    message: "Your Daily report has been added.",
  };
}

export async function readReportbyDate(date: string): Promise<ReportType[]> {
  const result = await db
    .select()
    .from(reportSchema)
    .where(eq(reportSchema.date, date));

  return result;
}

/*
export async function deleteUserbyEmail(email: string): Promise<Result> {
  await db.delete(reportSchema).where(eq(reportSchema.email, email));
  return { success: true, message: "user has been deleted successfully" };
}
*/

export async function listNotes(
  page: number,
  lastID: number,
  limit: number
): Promise<ReportType[]> {
  let result: ReportType[] = [];

  if (lastID == 0) {
    result = await db
      .select()
      .from(reportSchema)
      .limit(limit)
      .offset((page - 1) * limit);
  } else {
    result = await db
      .select()
      .from(reportSchema)
      .limit(limit)
      .where(gt(reportSchema.id, lastID));
  }

  return result;
}
