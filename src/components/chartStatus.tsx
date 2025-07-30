"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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

import taskStatusData from "@/lib/taskStatus"; // Importing task status data

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  draft: {
    label: "Draft",
    color: "#3b82f6",
  },
  pending: {
    label: "Pending",
    color: "#ec4899",
  },
  inProgress: {
    label: "In Progress",
    color: "#f59e0b",
  },
  completed: {
    label: "Completed",
    color: "#10b981",
  },
  launched: {
    label: "Launched",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

export function ChartTaskStatusPie() {
  const totalTasks = React.useMemo(() => {
    return taskStatusData.reduce((acc, curr) => acc + curr.tasks, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task by Status</CardTitle>
        <CardDescription>
          Task distribution from Draft to Launched
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={taskStatusData}
              dataKey="tasks"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTasks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* Legend Section */}
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex justify-center gap-6 text-sm font-medium text-muted-foreground">
          {taskStatusData.map((statusData) => (
            <div key={statusData.status} className="flex items-center gap-2">
              <div
                className="w-3 h-3"
                style={{
                  backgroundColor: statusData.fill,
                  borderRadius: "30%",
                }}
              ></div>
              <span>{statusData.status}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChartTaskStatusPie;
