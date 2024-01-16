import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportForm } from "./report_create";

export function RequestTabs() {
  return (
    <Tabs defaultValue="report" className="w-[400px]">
      <TabsContent value="report">
        <Card>
          <CardHeader>
            <CardTitle>Daily report</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            
            <ReportForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
