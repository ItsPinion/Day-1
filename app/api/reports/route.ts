import {
    readReportbyUserID
} from "@/lib/report";
import { ReportType } from "@/lib/types";

export async function POST(request: Request) {
  let body: { userID: string };

  try {
    body = await request.json();
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Invalid json", data: [] },
      {
        status: 400,
      }
    );
  }

  const headers = new Headers();
  headers.set("content-type", "application/json");

  if (!body.userID) {
    return Response.json(
      { success: false, message: "Did you login?", data: [] },
      {
        status: 400,
      }
    );
  }

  let reports: ReportType[] = [];

  try {
    reports = await readReportbyUserID(body.userID);
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
      success: false,
      message: "No report Found!",
      data: reports,
    },
    {
      status: 400,
    }
  );
}
