"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import taskCompletedData from "@/lib/taskC"; // Importing the task data

const chartConfig = {
  task: {
    label: "Completed Tasks",
    color: "var(--chart-1)", // Customize color as needed
  },
} satisfies ChartConfig;

export function ChartTaskCompleted() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completed</CardTitle>
        <CardDescription>
          Number of tasks completed from January to June 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={taskCompletedData}
            margin={{
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="task"
              type="monotone"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{
                fill: "#2563eb",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing task completion data for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

export default ChartTaskCompleted;
