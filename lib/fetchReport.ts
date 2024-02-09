export async function getReports(query = "", userID: string) {
  const response = await fetch("/api/reports", {
    method: "POST",
    body: JSON.stringify({ userID: userID }),
    headers: {
      "content-type": "application/json",
    },
  });
  return await response.json();
}
