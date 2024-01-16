"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PopUp } from "./alert";
import { Result } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

export const formSchema = z.object({
  date: z.date(),
  time: z.string(),
  today: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  tomorrow: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bottleneck: z.string(),
  userID: z.string(),
});

export function ReportForm() {
  const [result, setResult] = useState({ success: false, message: "" });

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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      });
      const result: Result = await response.json();

      setResult(result)

      console.log(response)
      
    } catch (error) {
      console.error();
    }
  }
  return (
    <Form {...form}>
      {result.message && <PopUp result={result}></PopUp>}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-8 ${result.success ? "hidden" : ""}`}
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
                <Input
                  type="text"
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
                <Input
                  type="text"
                  placeholder="Write what you have in mind."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bottleneck"
          render={({ field }) => (
            <FormItem>
              <FormLabel>So whats the problem?</FormLabel>

              <FormControl>
                <Input
                  type="text"
                  placeholder="Why didnt you f***ing study?"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
