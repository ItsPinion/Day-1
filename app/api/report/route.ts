import { formSchema } from "@/components/day1/report_create";
import { createReport, readReportbyDate } from "@/lib/report";
import { ReportType } from "@/lib/types";

export async function POST(request: Request){
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return Response.json(
      { success: false, message: "Invalid json" },
      {
        status: 400,
      }
    );
  }

  const reportValidation = formSchema.safeParse(body);

  const headers = new Headers();
  headers.set("content-type", "application/json");

  if (!reportValidation.success) {
    return Response.json(reportValidation.error.issues[0], {
      status: 400,
    });
  }

  let duplicate: ReportType[];

  try {
    duplicate = await readReportbyDate(reportValidation.data.date.toISOString());
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to access the database",
      },
      {
        status: 500,
      }
    );
  }

  if (duplicate[0]) {
    return Response.json(
      {
        success: false,
        message: "You have already submited report for this day buddy.",
      },
      {
        status: 400,
      }
    );
  }

  const report:Partial<ReportType>  = {
    date: reportValidation.data.date.toISOString(),
    time:reportValidation.data.time,
    today:reportValidation.data.today,
    bottleneck:reportValidation.data.bottleneck
  }

  let result;

  try {
    result = await createReport(report);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to access the database",
      },
      {
        status: 500,
      }
    );
  }

  return Response.json(result);
}
