"use client";

import { useAuth } from "@clerk/nextjs";
import { DataTable } from "./DataTable";
import { useState } from "react";
import { ReportType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Profile() {
  const user = useAuth();
  const [result, setResult] = useState<ReportType[]>([]);

  if (!user.userId) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
        <h2 className="mt-2 text-4xl font-extrabold ">
          Please Login to access this page
        </h2>
        <p className="mt-2 text-lg ">
          To show you your past reports, I need to confirm your identity. And
          the only way to do that is by logging in.
        </p>
        <div className="mt-6">
          <Button className="text-sm mx-auto lg:ml-auto">
            <Link href="/sign-in">Press here to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  async function getReports() {
    try {
      const response = await fetch(
        process.env.URL + "/api/report/" + user.userId,
        {
          method: "Get",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      console.log(text);
      const result: ReportType[] = JSON.parse(text);

      setResult(result);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  getReports();

  return <DataTable reports={result} />;
}
