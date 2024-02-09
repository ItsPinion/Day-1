import { readReportbyUserID } from "@/lib/report";
import { ReportType } from "@/lib/types";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headers = new Headers();
  headers.set("content-type", "application/json");

  let reports: ReportType[] = [];

  try {
    reports = await readReportbyUserID(params.id);
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Failed to access the database",
        data: [],
      },
      {
        status: 500,
      }
    );
  }

  if (!reports[0]) {
    return Response.json(
      {
        success: false,
        message: "No report Found!",
        data: [],
      },
      {
        status: 400,
      }
    );
  }

  return Response.json(
    {
      success: true,
      message: "Successfully found all reports!",
      data: reports,
    },
    {
      status: 200,
    }
  );
}
