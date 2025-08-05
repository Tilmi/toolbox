// import { Card10 } from "@/components/Card10";
// import { Card11 } from "@/components/Card11";
// import { Card12 } from "@/components/Card12";
// import { Card13 } from "@/components/Card13";
// import ChartTaskStatusPie from "@/components/chartStatus";
// import ChartTaskCompleted from "@/components/chartTask";

// export default function Analytics() {
//   return (
//     <div className="grid">
//       <h1 className="px-1 text-xl font-medium mb-2">Analytics</h1>
//       <main className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
//         {/* <div>
//           <Card10 />
//         </div>
//         <div>
//           <Card11 />
//         </div>
//         <div>
//           <Card12 />
//         </div>
//         <div>
//           <Card13 />
//         </div>
//         <div className="lg:col-span-2 md:col-span-2 sm:col-span-1">
//           <ChartTaskCompleted />
//         </div>
//         <div className="lg:col-span-2 md:col-span-2 sm:col-span-1">
//           <ChartTaskStatusPie />
//         </div> */}
//       </main>
//     </div>
//   );
// }

// app/analytics.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, Download, Filter, RefreshCw } from "lucide-react";
import { AnalyticsCards } from "@/components/AnalyticCard";
import {
  mockTaskAnalytics,
  mockProjectAnalytics,
  mockMeetingAnalytics,
  mockTopPerformers,
  mockActivityData,
  ActivityData,
} from "@/lib/dataAnalytic";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useState } from "react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7days");
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleExport = () => {
    // Implementation for export functionality
    console.log("Exporting analytics data...");
  };

  return (
    <div className="flex-1 space-y-6 p-2">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium">Analytics</h1>
          <p className="text-muted-foreground">
            Track your team's productivity and project progress
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="90days">90 Days</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <AnalyticsCards
        taskData={mockTaskAnalytics}
        projectData={mockProjectAnalytics}
        meetingData={mockMeetingAnalytics}
        topPerformers={mockTopPerformers}
      />

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1">
        {/* Activity Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Trend</CardTitle>
            <CardDescription>Daily activity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("id-ID", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  }
                />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Tasks"
                />
                <Line
                  type="monotone"
                  dataKey="meetings"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Meetings"
                />
                <Line
                  type="monotone"
                  dataKey="projects"
                  stroke="#ffc658"
                  strokeWidth={2}
                  name="Projects"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
            <CardDescription>Current status of all tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    name: "Completed",
                    value: mockTaskAnalytics.completedTasks,
                    fill: "#22c55e",
                  },
                  {
                    name: "Pending",
                    value: mockTaskAnalytics.pendingTasks,
                    fill: "#f59e0b",
                  },
                  {
                    name: "Overdue",
                    value: mockTaskAnalytics.overdueTasks,
                    fill: "#ef4444",
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Summary</CardTitle>
          <CardDescription>Overview of recent team activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarDays className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Tasks This Week</p>
                <p className="text-2xl font-bold">
                  {mockActivityData.reduce((sum, day) => sum + day.tasks, 0)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Across all projects
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <div className="p-2 bg-green-100 rounded-lg">
                <CalendarDays className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Meetings This Week</p>
                <p className="text-2xl font-bold">
                  {mockActivityData.reduce((sum, day) => sum + day.meetings, 0)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Average 3 per day
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CalendarDays className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Active Projects</p>
                <p className="text-2xl font-bold">
                  {mockProjectAnalytics.activeProjects}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mockProjectAnalytics.onTrackProjects} on track
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
