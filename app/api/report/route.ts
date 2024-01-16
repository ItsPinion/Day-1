import { formSchema } from "@/components/day1/report_create";
import { createReport, readReportbyDate } from "@/lib/report";
import { FormSchemaType, ReportType } from "@/lib/types";

export async function POST(request: Request) {
  let body: Partial<ReportType>;

  try {
    body = await request.json();
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Invalid json" },
      {
        status: 400,
      }
    );
  }

  const headers = new Headers();
  headers.set("content-type", "application/json");

  if (
    !body.date ||
    !body.today ||
    !body.tomorrow ||
    !body.bottleneck ||
    !body.time ||
    !body.userID
  ) {
    return Response.json(
      { success: false, message: "Login/Register first brother." },
      {
        status: 400,
      }
    );
  }

  let duplicate: ReportType[];

  try {
    duplicate = await readReportbyDate(body.date, body.userID);
  } catch (error) {
    console.log(error);
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
  console.log(1);
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

  const report: Partial<ReportType> = {
    date: body.date,
    time: body.time,
    today: body.today,
    bottleneck: body.bottleneck,
    tomorrow: body.tomorrow,
    userID: body.userID,
  };

  let result;

  try {
    result = await createReport(report);
  } catch (error) {
    console.log(error);
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
