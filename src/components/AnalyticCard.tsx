// components/analytics-cards.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  TrendingUp,
  FolderOpen,
  Target,
} from "lucide-react";
import {
  dataAnalytics,
  ProjectAnalytics,
  MeetingAnalytics,
  TeamMember,
} from "@/lib/dataAnalytic";

interface AnalyticsCardsProps {
  taskData: dataAnalytics;
  projectData: ProjectAnalytics;
  meetingData: MeetingAnalytics;
  topPerformers: TeamMember[];
}

export function AnalyticsCards({
  taskData,
  projectData,
  meetingData,
  topPerformers,
}: AnalyticsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Task Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{taskData.totalTasks}</div>
          <p className="text-xs text-muted-foreground">
            {taskData.completedTasks} completed, {taskData.pendingTasks} pending
          </p>
          <div className="mt-2">
            <Progress value={taskData.completionRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {taskData.completionRate}% completion rate
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Project Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projectData.activeProjects}</div>
          <p className="text-xs text-muted-foreground">
            {projectData.onTrackProjects} on track,{" "}
            {projectData.delayedProjects} delayed
          </p>
          <div className="mt-2">
            <Progress
              value={projectData.projectCompletionRate}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {projectData.projectCompletionRate}% success rate
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Meeting Analytics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            This Week Meetings
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {meetingData.thisWeekMeetings}
          </div>
          <p className="text-xs text-muted-foreground">
            {meetingData.avgMeetingDuration} min avg duration
          </p>
          <div className="mt-2">
            <Progress value={meetingData.attendanceRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {meetingData.attendanceRate}% attendance rate
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Indicator */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Avg Completion Time
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {taskData.avgCompletionTime} days
          </div>
          <p className="text-xs text-muted-foreground">
            {taskData.overdueTasks} tasks overdue
          </p>
          <div className="mt-2 flex items-center space-x-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <p className="text-xs text-green-500">15% faster than last month</p>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Top Performers</CardTitle>
          <CardDescription>
            Most productive team members this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((member, index) => (
              <div
                key={member.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className="w-6 h-6 p-0 flex items-center justify-center text-xs"
                    >
                      {index + 1}
                    </Badge>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.tasksCompleted} tasks completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {member.productivity}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      productivity
                    </p>
                  </div>
                  <Progress value={member.productivity} className="w-16 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items Status */}
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Action Items Status</CardTitle>
          <CardDescription>
            Follow-up from meetings and projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Total Created</span>
              </div>
              <span className="text-lg font-semibold">
                {meetingData.actionItemsCreated}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Completed</span>
              </div>
              <span className="text-lg font-semibold text-green-600">
                {meetingData.actionItemsCompleted}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Pending</span>
              </div>
              <span className="text-lg font-semibold text-orange-600">
                {meetingData.actionItemsCreated -
                  meetingData.actionItemsCompleted}
              </span>
            </div>
            <div className="mt-3">
              <Progress
                value={
                  (meetingData.actionItemsCompleted /
                    meetingData.actionItemsCreated) *
                  100
                }
                className="h-3"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(
                  (meetingData.actionItemsCompleted /
                    meetingData.actionItemsCreated) *
                    100
                )}
                % completion rate
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
