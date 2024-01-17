"use client";

import { useAuth } from "@clerk/nextjs";
import { DataTable } from "./DataTable";
import { useState, useEffect } from "react";
import { ReportType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Profile() {
  const user = useAuth();
  const [result, setResult] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function getReports(userID: string) {
      try {
        const response = await fetch("/api/reports", {
          method: "POST",
          body: JSON.stringify({ userID: userID }),
          headers: {
            "content-type": "application/json",
          },
        });

        const result = await response.json();

        setResult(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (user.userId) {
      getReports(user.userId);
    }
  }, [user.userId]);

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

  return <DataTable reports={result} />;
}
