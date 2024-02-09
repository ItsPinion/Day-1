import { formatDate } from "@/lib/formateDate";
import {
  createReport,
  deleteUserbyID,
  readReportbyDateandID,
} from "@/lib/report";
import { ReportType } from "@/lib/types";

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

  console.log(body)

  const headers = new Headers();
  headers.set("content-type", "application/json");

  if (
    !body.date ||
    !body.today ||
    !body.tomorrow ||
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

  body.date = formatDate(body.date);

  if (!body.userID) {
    return Response.json(
      { success: false, message: "Didn't send the UserID" },
      {
        status: 400,
      }
    );
  }

  let duplicate: ReportType[];

  try {
    duplicate = await readReportbyDateandID(body.date, body.userID);
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
    bottleneck: body.bottleneck || "None",
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

export async function DELETE(request: Request) {
  let body: { reportID: number };

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

  if (!body.reportID) {
    return Response.json(
      { success: false, message: "Didn't send the UserID" },
      {
        status: 400,
      }
    );
  }

  let result;

  try {
    result = await deleteUserbyID(body.reportID);
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
