import { readReportbyUserID } from "@/lib/report";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  let body;

  try {
    body = await params.id;
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

  if (!body) {
    return Response.json(
      { success: false, message: "Login/Register first brother." },
      {
        status: 400,
      }
    );
  }

  try {
    return Response.json(readReportbyUserID(body));//its should return a array
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
}
