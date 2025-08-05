// lib/utilsMeeting.ts
import { Priority, Status } from "./types";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
};

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "ongoing":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export const getDurationInMinutes = (
  startTime: string,
  endTime: string
): number => {
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
};

export const formatDuration = (startTime: string, endTime: string): string => {
  const duration = getDurationInMinutes(startTime, endTime);
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`.trim();
  }
  return `${minutes}m`;
};
