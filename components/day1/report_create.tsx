"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Result } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { spiral } from "ldrs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { studyTimes } from "@/lib/timeData";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { PopUp } from "./alert";
spiral.register();

export const formSchema = z.object({
  date: z.date(),
  time: z.string(),
  today: z.string().min(5, {
    message: "Must be at least 5 characters.",
  }),
  tomorrow: z.string().min(5, {
    message: "Must be at least 5 characters.",
  }),
  bottleneck: z.string(),
  userID: z.string(),
});

export function ReportForm() {
  const [result, setResult] = useState({ success: false, message: "" });
  const [bottleneck, setBottleneck] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      today: "",
      tomorrow: "",
      bottleneck: "",
      userID: user.userId || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Validate the form data on the client-side before sending the request
    const reportValidation = formSchema.safeParse(values);

    if (!reportValidation.success) {
      // Handle validation errors here
      console.error(reportValidation.error);
      const result: Result = {
        success: false,
        message: reportValidation.error.issues[1].message,
      };

      setResult(result);
      return;
    }

    setLoading(true);
    // Send the request to the server with the validated data
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        body: JSON.stringify(reportValidation.data),
        headers: {
          "content-type": "application/json",
        },
      });
      const result: Result = await response.json();

      setResult(result);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4 ${loading ? "hidden" : ""}`}
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Which day do you want to report for?</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < addDays(new Date(), -7)
                    }
                    initialFocus
                    className="w-full"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How much time did you invest yesterday :</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Drop the digits." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {studyTimes.map((value, index) => (
                    <SelectItem key={index} value={value.value}>
                      {value.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="today"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What did you study brother/sister?</FormLabel>

              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Write what you already did."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tomorrow"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Whats you gonna study tommorow brother/sister?
              </FormLabel>

              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Write what you have in mind."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <Switch
            id="bottleneck-mode"
            checked={bottleneck}
            onCheckedChange={setBottleneck}
          />
          <Label htmlFor="bottleneck-mode">I have a bottleneck.</Label>
        </div>

        {bottleneck ? (
          <FormField
            control={form.control}
            name="bottleneck"
            render={({ field }) => (
              <FormItem>
                <FormLabel>So whats the problem?</FormLabel>

                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Why didnt you f***ing study?"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <></>
        )}

        {user.userId ? (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        ) : (
          <div>
            <Link href="/sign-in">
              <Button className="w-full">Login first Bozo</Button>
            </Link>
          </div>
        )}
      </form>
      <div
        className={` flex flex-row items-center justify-center  ${
          !loading ? "hidden" : ""
        }`}
      >
        {!result.message ? (
          <div className="space-y-5 space-x-5 justify-center flex flex-row items-center">
            <l-spiral size="40" speed="0.9" color="black"></l-spiral>
            <b className="text-xl">Sending deta to the server.</b>
          </div>
        ) : (
          <div className="space-y-5 space-x-5 justify-center flex flex-col items-center">
            <PopUp result={result} />
            {result.success ? (
              <Button
                className="pr-2"
                onClick={() => {
                  location.reload();
                }}
              >
                Report another?
              </Button>
            ) : (
              <div className="space-y-5 space-x-5 justify-center items-center">
                <Button
                  onClick={() => {
                    setLoading(false);
                    setResult({ success: false, message: "" });
                  }}
                >
                  Go Back
                </Button>
                <Link href="/report">
                  <Button>Report Problem</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </Form>
  );
}
