// lib/types.ts
export interface Meeting {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  department: Department;
  attendees: string;
  status: Status;
  type: MeetingType;
  agenda: string;
  priority: Priority;
  isRecurring: boolean;
  meetingLink?: string;
  attachments?: string;
  notulensi?: string; // New field for meeting minutes
}

export type Department =
  | "IT"
  | "Produksi"
  | "Marketing"
  | "Sales"
  | "HSE"
  | "Finance"
  | "HR";
export type Priority = "low" | "medium" | "high";
export type Status = "scheduled" | "ongoing" | "completed" | "cancelled";
export type MeetingType = "offline" | "online";
export type ViewMode = "list" | "calendar";
