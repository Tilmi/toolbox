// app/attendance.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CalendarIcon,
  Download,
  Filter,
  Search,
  RefreshCw,
  TrendingUp,
  Calendar as CalendarDays,
  Users,
  Clock,
  MapPin,
  User,
  FileText,
  X,
  Eye,
  Edit,
  Shield,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import {
  AttendanceSummaryCards,
  AttendanceRecordItem,
  MeetingTypeStats,
  RecentActivity,
} from "@/components/Attendance";
import {
  mockAttendanceRecords,
  mockAttendanceSummary,
  mockMonthlyAttendance,
  mockMeetingTypeStats,
  meetingTypes,
  departments,
  attendanceStatuses,
  AttendanceRecord,
  MonthlyAttendance,
} from "@/lib/dataAttendance";

export default function AttendanceHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeetingType, setSelectedMeetingType] = useState("All Types");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedEmployee, setSelectedEmployee] = useState("All Employees");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Mock data untuk employees
  const employees = [
    "All Employees",
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Wilson",
    "David Chen",
  ];

  // Filter records based on selected filters
  const filteredRecords = mockAttendanceRecords.filter((record) => {
    const matchesSearch =
      record.meetingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedMeetingType === "All Types" ||
      record.meetingType === selectedMeetingType;
    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      record.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === "All Status" ||
      record.status === selectedStatus.toLowerCase();
    const matchesEmployee =
      selectedEmployee === "All Employees" ||
      record.employeeName === selectedEmployee;

    let matchesDateRange = true;
    if (dateFrom || dateTo) {
      const recordDate = new Date(record.date);
      if (dateFrom && recordDate < dateFrom) matchesDateRange = false;
      if (dateTo && recordDate > dateTo) matchesDateRange = false;
    }

    return (
      matchesSearch &&
      matchesType &&
      matchesDepartment &&
      matchesStatus &&
      matchesEmployee &&
      matchesDateRange
    );
  });

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleExport = () => {
    console.log("Exporting attendance history data...");
    // Generate CSV or Excel export
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedMeetingType("All Types");
    setSelectedDepartment("All Departments");
    setSelectedStatus("All Status");
    setSelectedEmployee("All Employees");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const handleViewDetails = (record: AttendanceRecord) => {
    setSelectedRecord(record);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      present: "#22c55e",
      absent: "#ef4444",
      late: "#f59e0b",
      excused: "#3b82f6",
    };
    return colors[status as keyof typeof colors] || "#6b7280";
  };

  const getStatusVariant = (status: string) => {
    const variants = {
      present: "default",
      absent: "destructive",
      late: "secondary",
      excused: "outline",
    };
    return variants[status as keyof typeof variants] || "secondary";
  };

  // Prepare admin analytics data
  const departmentAttendanceData = [
    { department: "Engineering", present: 85, absent: 10, late: 5 },
    { department: "Marketing", present: 78, absent: 15, late: 7 },
    { department: "Sales", present: 82, absent: 12, late: 6 },
    { department: "HR", present: 90, absent: 8, late: 2 },
    { department: "Finance", present: 88, absent: 9, late: 3 },
  ];

  const overallStats = {
    totalMeetings: mockAttendanceRecords.length,
    totalEmployees: 156,
    averageAttendance: 84.2,
    presentToday: 142,
    absentToday: 14,
    lateToday: 8,
  };

  const pieChartData = [
    { name: "Present", value: overallStats.presentToday, fill: "#22c55e" },
    { name: "Late", value: overallStats.lateToday, fill: "#f59e0b" },
    { name: "Absent", value: overallStats.absentToday, fill: "#ef4444" },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            Attendance History
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor employee attendance across all meetings
          </p>
        </div>
        <div className="flex items-center space-x-2">
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
            Export Report
          </Button>
        </div>
      </div>

      {/* Admin Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Meetings
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallStats.totalMeetings}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallStats.totalEmployees}
            </div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Attendance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallStats.averageAttendance}%
            </div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {overallStats.presentToday}
            </div>
            <p className="text-xs text-muted-foreground">
              {overallStats.absentToday} absent, {overallStats.lateToday} late
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Department Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Attendance Overview</CardTitle>
            <CardDescription>
              Attendance distribution across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#22c55e" name="Present" />
                <Bar dataKey="late" fill="#f59e0b" name="Late" />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Today's Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance Status</CardTitle>
            <CardDescription>Current attendance distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {pieChartData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span className="text-sm">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Attendance Records
          </CardTitle>
          <CardDescription>
            Search and filter employee attendance records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-6">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search meetings, employees, organizers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Employee Filter */}
            <div>
              <Select
                value={selectedEmployee}
                onValueChange={setSelectedEmployee}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee} value={employee}>
                      {employee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Meeting Type Filter */}
            <div>
              <Select
                value={selectedMeetingType}
                onValueChange={setSelectedMeetingType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Meeting Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  {meetingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Departments">
                    All Departments
                  </SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            <div>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          {/* Second Row - Status and Date Range */}
          <div className="grid gap-4 md:grid-cols-3 mt-4">
            {/* Status Filter */}
            <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  {attendanceStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom
                      ? format(dateFrom, "PPP", { locale: id })
                      : "From Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP", { locale: id }) : "To Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Employee Attendance Records</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {filteredRecords.length} records
              </Badge>
              <Badge variant="outline">Admin View</Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Complete attendance history for all employees and meetings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No records found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{record.meetingTitle}</h3>
                        <Badge variant={getStatusVariant(record.status)}>
                          {record.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{record.employeeName || "John Doe"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{record.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>
                            {format(new Date(record.date), "dd MMM yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{record.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(record)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog
        open={!!selectedRecord}
        onOpenChange={() => setSelectedRecord(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Attendance Record Details</DialogTitle>
            <DialogDescription>
              Complete information about this attendance record
            </DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <div className="space-y-6">
              {/* Employee & Meeting Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Employee Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedRecord.employeeName || "John Doe"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedRecord.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Status:</span>
                      <Badge variant={getStatusVariant(selectedRecord.status)}>
                        {selectedRecord.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Meeting Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedRecord.meetingTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Organized by {selectedRecord.organizer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedRecord.meetingType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(new Date(selectedRecord.date), "PPP", {
                          locale: id,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedRecord.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedRecord.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              {selectedRecord.notes && (
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    {selectedRecord.notes}
                  </p>
                </div>
              )}

              {/* Admin Actions */}
              <div className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Record ID: {selectedRecord.id} • Last updated:{" "}
                  {format(new Date(), "PPp")}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRecord(null)}
                  >
                    Close
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Record
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
