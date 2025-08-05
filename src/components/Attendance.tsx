// components/attendance-components.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Clock,
  MapPin,
  User,
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar as CalendarDays,
  FileText,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  AttendanceRecord,
  AttendanceSummary,
  MeetingTypeStats,
  getStatusVariant,
  formatAttendanceStatus,
} from "@/lib/dataAttendance";

// Admin Summary Cards Component
interface AttendanceSummaryCardsProps {
  summary: AttendanceSummary;
}

export function AttendanceSummaryCards({
  summary,
}: AttendanceSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalMeetings}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Attended</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {summary.attendedMeetings}
          </div>
          <p className="text-xs text-muted-foreground">
            +{summary.lateArrivals} late arrivals
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          <Activity className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {summary.attendanceRate}%
          </div>
          <p className="text-xs text-muted-foreground">
            {summary.attendanceRate >= 90
              ? "Excellent"
              : summary.attendanceRate >= 80
              ? "Good"
              : "Needs Improvement"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Missed</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {summary.missedMeetings}
          </div>
          <p className="text-xs text-muted-foreground">
            {summary.excusedAbsences} excused
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Individual Attendance Record Item Component
interface AttendanceRecordItemProps {
  record: AttendanceRecord;
  onViewDetails: (record: AttendanceRecord) => void;
}

export function AttendanceRecordItem({
  record,
  onViewDetails,
}: AttendanceRecordItemProps) {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="font-medium">{record.meetingTitle}</h3>
            <Badge variant={getStatusVariant(record.status)}>
              {formatAttendanceStatus(record.status)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{record.employeeName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{record.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{format(new Date(record.date), "dd MMM yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{record.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{record.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Organized by {record.organizer}</span>
            </div>
            {record.checkInTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Check-in: {record.checkInTime}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(record)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}

// Meeting Type Statistics Component
interface MeetingTypeStatsProps {
  stats: MeetingTypeStats[];
}

export function MeetingTypeStats({ stats }: MeetingTypeStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Type Performance</CardTitle>
        <CardDescription>Attendance rates by meeting type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.type} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{stat.type}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.attended}/{stat.total}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${stat.rate}%` }}
                  />
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-lg font-bold">{stat.rate.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Recent Activity Component
interface RecentActivityProps {
  recentRecords: AttendanceRecord[];
}

export function RecentActivity({ recentRecords }: RecentActivityProps) {
  // Get last 5 records, sorted by date
  const sortedRecords = [...recentRecords]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest attendance records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedRecords.map((record) => (
            <div key={record.id} className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div
                  className={`w-3 h-3 rounded-full ${
                    record.status === "present"
                      ? "bg-green-500"
                      : record.status === "late"
                      ? "bg-yellow-500"
                      : record.status === "excused"
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">
                    {record.employeeName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(record.date), "MMM dd")}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground truncate">
                    {record.meetingTitle}
                  </p>
                  <Badge
                    variant={getStatusVariant(record.status)}
                    className="text-xs"
                  >
                    {formatAttendanceStatus(record.status)}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Employee Status Badge Component
interface EmployeeStatusBadgeProps {
  status: string;
  size?: "sm" | "default" | "lg";
}

export function EmployeeStatusBadge({
  status,
  size = "default",
}: EmployeeStatusBadgeProps) {
  return (
    <Badge
      variant={getStatusVariant(status)}
      className={size === "sm" ? "text-xs" : ""}
    >
      {formatAttendanceStatus(status)}
    </Badge>
  );
}

// Department Overview Card Component
interface DepartmentOverviewProps {
  department: string;
  totalEmployees: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendanceRate: number;
}

export function DepartmentOverviewCard({
  department,
  totalEmployees,
  presentCount,
  absentCount,
  lateCount,
  attendanceRate,
}: DepartmentOverviewProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{department}</CardTitle>
        <CardDescription>{totalEmployees} employees</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Attendance Rate</span>
            <span className="text-lg font-bold text-blue-600">
              {attendanceRate}%
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="space-y-1">
              <div className="text-lg font-bold text-green-600">
                {presentCount}
              </div>
              <div className="text-xs text-muted-foreground">Present</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-yellow-600">
                {lateCount}
              </div>
              <div className="text-xs text-muted-foreground">Late</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-red-600">
                {absentCount}
              </div>
              <div className="text-xs text-muted-foreground">Absent</div>
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Quick Stats Component
interface QuickStatsProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function QuickStatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: QuickStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div
            className={`flex items-center text-xs mt-1 ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {Math.abs(trend.value)}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Loading Skeleton Components
export function AttendanceRecordSkeleton() {
  return (
    <div className="border rounded-lg p-4">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
          <div className="h-5 bg-muted rounded w-16 animate-pulse" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="h-3 bg-muted rounded animate-pulse" />
            ))}
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
        <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
          <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
