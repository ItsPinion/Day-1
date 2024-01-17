import { eq, gt, and } from "drizzle-orm";
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
    !newReport.time ||
    !newReport.userID
  ) {
    throw new Error("Fill all the detail");
  }

  await db.insert(reportSchema).values({
    date: newReport.date,
    today: newReport.today,
    tomorrow: newReport.tomorrow,
    bottleneck: newReport.bottleneck,
    time: newReport.time,
    userID: newReport.userID,
  });
  return {
    success: true,
    message: "Your Daily report has been added.",
  };
}

export async function readReportbyDateandID(
  date: string,
  userID: string
): Promise<ReportType[]> {
  const result = await db
    .select()
    .from(reportSchema)
    .where(and(eq(reportSchema.date, date), eq(reportSchema.userID, userID)));

  return result;
}

export async function readReportbyUserID(
  userID: string
): Promise<ReportType[]> {
  const result = await db
    .select()
    .from(reportSchema)
    .where(eq(reportSchema.userID, userID));
  return result;
}

export async function deleteUserbyID(id: number): Promise<Result> {
  await db.delete(reportSchema).where(eq(reportSchema.id, id));
  return { success: true, message: "Report has been deleted successfully" };
}
