// lib/attendance-data.ts

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  meetingTitle: string;
  meetingType: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  status: "present" | "absent" | "late" | "excused";
  checkInTime?: string;
  notes?: string;
}

export interface AttendanceSummary {
  totalMeetings: number;
  attendedMeetings: number;
  missedMeetings: number;
  lateArrivals: number;
  excusedAbsences: number;
  attendanceRate: number;
}

export interface MonthlyAttendance {
  month: string;
  meetings: number;
  attended: number;
  rate: number;
}

export interface MeetingTypeStats {
  type: string;
  total: number;
  attended: number;
  rate: number;
}

export interface DepartmentStats {
  department: string;
  employees: number;
  averageAttendance: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
}

// Mock Data
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "ATT-001",
    employeeName: "John Doe",
    employeeId: "EMP-001",
    department: "Engineering",
    meetingTitle: "Sprint Planning Meeting",
    meetingType: "Team Meeting",
    organizer: "Sarah Wilson",
    date: "2024-08-05",
    time: "09:00 - 10:30",
    location: "Conference Room A",
    status: "present",
    checkInTime: "08:58",
    notes: "Arrived on time, active participation",
  },
  {
    id: "ATT-002",
    employeeName: "Jane Smith",
    employeeId: "EMP-002",
    department: "Marketing",
    meetingTitle: "Q3 Marketing Strategy Review",
    meetingType: "Strategic Meeting",
    organizer: "Mike Johnson",
    date: "2024-08-05",
    time: "14:00 - 15:30",
    location: "Boardroom",
    status: "late",
    checkInTime: "14:15",
    notes: "Arrived 15 minutes late due to client call",
  },
  {
    id: "ATT-003",
    employeeName: "Mike Johnson",
    employeeId: "EMP-003",
    department: "Sales",
    meetingTitle: "Weekly Sales Review",
    meetingType: "Department Meeting",
    organizer: "David Chen",
    date: "2024-08-04",
    time: "10:00 - 11:00",
    location: "Sales Conference Room",
    status: "present",
    checkInTime: "09:55",
  },
  {
    id: "ATT-004",
    employeeName: "Sarah Wilson",
    employeeId: "EMP-004",
    department: "HR",
    meetingTitle: "Employee Onboarding Session",
    meetingType: "Training",
    organizer: "Lisa Anderson",
    date: "2024-08-04",
    time: "13:00 - 16:00",
    location: "Training Room B",
    status: "absent",
    notes: "Sick leave - informed in advance",
  },
  {
    id: "ATT-005",
    employeeName: "David Chen",
    employeeId: "EMP-005",
    department: "Finance",
    meetingTitle: "Monthly Budget Review",
    meetingType: "Financial Meeting",
    organizer: "Robert Kim",
    date: "2024-08-03",
    time: "11:00 - 12:30",
    location: "Finance Office",
    status: "present",
    checkInTime: "10:58",
  },
  {
    id: "ATT-006",
    employeeName: "Lisa Anderson",
    employeeId: "EMP-006",
    department: "HR",
    meetingTitle: "Performance Review Meeting",
    meetingType: "One-on-One",
    organizer: "Sarah Wilson",
    date: "2024-08-03",
    time: "15:00 - 16:00",
    location: "HR Office",
    status: "excused",
    notes: "Emergency family matter - pre-approved absence",
  },
  {
    id: "ATT-007",
    employeeName: "Robert Kim",
    employeeId: "EMP-007",
    department: "Finance",
    meetingTitle: "All Hands Meeting",
    meetingType: "Company Meeting",
    organizer: "CEO Office",
    date: "2024-08-02",
    time: "16:00 - 17:00",
    location: "Main Auditorium",
    status: "present",
    checkInTime: "15:55",
  },
  {
    id: "ATT-008",
    employeeName: "Emily Rodriguez",
    employeeId: "EMP-008",
    department: "Engineering",
    meetingTitle: "Code Review Session",
    meetingType: "Technical Meeting",
    organizer: "John Doe",
    date: "2024-08-02",
    time: "10:30 - 12:00",
    location: "Dev Room 1",
    status: "late",
    checkInTime: "10:45",
    notes: "Traffic delay",
  },
  {
    id: "ATT-009",
    employeeName: "Alex Thompson",
    employeeId: "EMP-009",
    department: "Marketing",
    meetingTitle: "Campaign Launch Planning",
    meetingType: "Project Meeting",
    organizer: "Jane Smith",
    date: "2024-08-01",
    time: "09:30 - 11:00",
    location: "Marketing Hub",
    status: "present",
    checkInTime: "09:25",
  },
  {
    id: "ATT-010",
    employeeName: "Maria Garcia",
    employeeId: "EMP-010",
    department: "Sales",
    meetingTitle: "Client Presentation Prep",
    meetingType: "Preparation Meeting",
    organizer: "Mike Johnson",
    date: "2024-08-01",
    time: "14:30 - 15:30",
    location: "Presentation Room",
    status: "absent",
    notes: "Client meeting conflict - not excused",
  },
];

export const mockAttendanceSummary: AttendanceSummary = {
  totalMeetings: 48,
  attendedMeetings: 38,
  missedMeetings: 6,
  lateArrivals: 4,
  excusedAbsences: 2,
  attendanceRate: 87.5,
};

export const mockMonthlyAttendance: MonthlyAttendance[] = [
  { month: "Jan 2024", meetings: 12, attended: 11, rate: 91.7 },
  { month: "Feb 2024", meetings: 14, attended: 12, rate: 85.7 },
  { month: "Mar 2024", meetings: 16, attended: 14, rate: 87.5 },
  { month: "Apr 2024", meetings: 13, attended: 12, rate: 92.3 },
  { month: "May 2024", meetings: 15, attended: 13, rate: 86.7 },
  { month: "Jun 2024", meetings: 11, attended: 10, rate: 90.9 },
  { month: "Jul 2024", meetings: 18, attended: 15, rate: 83.3 },
  { month: "Aug 2024", meetings: 8, attended: 7, rate: 87.5 },
];

export const mockMeetingTypeStats: MeetingTypeStats[] = [
  { type: "Team Meeting", total: 15, attended: 13, rate: 86.7 },
  { type: "Strategic Meeting", total: 8, attended: 7, rate: 87.5 },
  { type: "Department Meeting", total: 12, attended: 11, rate: 91.7 },
  { type: "Training", total: 6, attended: 5, rate: 83.3 },
  { type: "One-on-One", total: 4, attended: 4, rate: 100.0 },
  { type: "Company Meeting", total: 3, attended: 2, rate: 66.7 },
];

export const mockDepartmentStats: DepartmentStats[] = [
  {
    department: "Engineering",
    employees: 45,
    averageAttendance: 88.2,
    presentToday: 38,
    absentToday: 4,
    lateToday: 3,
  },
  {
    department: "Marketing",
    employees: 28,
    averageAttendance: 82.1,
    presentToday: 24,
    absentToday: 3,
    lateToday: 1,
  },
  {
    department: "Sales",
    employees: 35,
    averageAttendance: 85.7,
    presentToday: 31,
    absentToday: 2,
    lateToday: 2,
  },
  {
    department: "HR",
    employees: 12,
    averageAttendance: 91.3,
    presentToday: 11,
    absentToday: 1,
    lateToday: 0,
  },
  {
    department: "Finance",
    employees: 18,
    averageAttendance: 89.8,
    presentToday: 16,
    absentToday: 1,
    lateToday: 1,
  },
  {
    department: "Operations",
    employees: 22,
    averageAttendance: 84.5,
    presentToday: 18,
    absentToday: 2,
    lateToday: 2,
  },
];

// Static data arrays for filters
export const meetingTypes = [
  "Team Meeting",
  "Strategic Meeting",
  "Department Meeting",
  "Training",
  "One-on-One",
  "Company Meeting",
  "Technical Meeting",
  "Project Meeting",
  "Financial Meeting",
  "Preparation Meeting",
];

export const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Product",
  "Design",
  "Legal",
  "IT Support",
];

export const attendanceStatuses = ["Present", "Absent", "Late", "Excused"];

export const employees = [
  "John Doe",
  "Jane Smith",
  "Mike Johnson",
  "Sarah Wilson",
  "David Chen",
  "Lisa Anderson",
  "Robert Kim",
  "Emily Rodriguez",
  "Alex Thompson",
  "Maria Garcia",
  "Kevin Lee",
  "Amanda Brown",
  "James Wilson",
  "Rachel Davis",
  "Mark Taylor",
];

// Helper functions
export const getStatusColor = (status: string): string => {
  const colors = {
    present: "#22c55e",
    absent: "#ef4444",
    late: "#f59e0b",
    excused: "#3b82f6",
  };
  return colors[status as keyof typeof colors] || "#6b7280";
};

export const getStatusVariant = (status: string) => {
  const variants = {
    present: "default" as const,
    absent: "destructive" as const,
    late: "secondary" as const,
    excused: "outline" as const,
  };
  return variants[status as keyof typeof variants] || "secondary";
};

export const calculateAttendanceRate = (
  attended: number,
  total: number
): number => {
  return total > 0 ? Math.round((attended / total) * 100 * 10) / 10 : 0;
};

export const formatAttendanceStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};
