import {
  Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ReportForm } from "./report_create";

export function RequestTabs() {
  return (
    <Tabs defaultValue="report" >
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
