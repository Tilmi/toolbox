"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MapPin,
  Users,
  Video,
  CalendarDays,
  AlarmClock,
  Edit,
  FileText,
  User,
  Building,
} from "lucide-react";
import {
  formatDate,
  formatTime,
  getStatusColor,
  getPriorityColor,
} from "@/lib/utilsMeeting";
import { Meeting } from "@/lib/types";

interface MeetingDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meeting: Meeting | null;
  onEdit: (meeting: Meeting) => void;
}

const MeetingDetailDialog = ({
  open,
  onOpenChange,
  meeting,
  onEdit,
}: MeetingDetailDialogProps) => {
  if (!meeting) return null;

  const handleEdit = () => {
    onEdit(meeting);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2">
                {meeting.title}
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getStatusColor(meeting.status)}>
                  {meeting.status.charAt(0).toUpperCase() +
                    meeting.status.slice(1)}
                </Badge>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    meeting.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : meeting.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${getPriorityColor(
                      meeting.priority
                    )}`}
                  ></div>
                  <span>
                    {meeting.priority.charAt(0).toUpperCase() +
                      meeting.priority.slice(1)}{" "}
                    Priority
                  </span>
                </div>
                {meeting.isRecurring && (
                  <Badge variant="outline" className="text-xs">
                    Recurring
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meeting Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date & Time */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-600" />
                Date & Time
              </h3>
              <div className="space-y-2 ml-7">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Date:</span>
                  <span>{formatDate(meeting.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlarmClock className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Time:</span>
                  <span>
                    {formatTime(meeting.startTime)} -{" "}
                    {formatTime(meeting.endTime)}
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {meeting.type === "online" ? (
                  <Video className="w-5 h-5 text-yellow-500" />
                ) : (
                  <MapPin className="w-5 h-5 text-red-600" />
                )}
                Location
              </h3>
              <div className="ml-7">
                <p className="font-medium">{meeting.location}</p>
                <p className="text-sm text-muted-foreground">
                  {meeting.type === "online"
                    ? "Online Meeting"
                    : "Physical Meeting"}
                </p>
                {meeting.meetingLink && (
                  <a
                    href={meeting.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Join Meeting Link
                  </a>
                )}
              </div>
            </div>

            {/* Organizer */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Organizer
              </h3>
              <div className="ml-7">
                <p className="font-medium">{meeting.organizer}</p>
              </div>
            </div>

            {/* Department */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building className="w-5 h-5 text-gray-600" />
                Department
              </h3>
              <div className="ml-7">
                <Badge variant="outline">{meeting.department}</Badge>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Participants ({meeting.attendees.split(",").length})
            </h3>
            <div className="ml-7">
              <div className="flex flex-wrap gap-2">
                {meeting.attendees.split(",").map((attendee, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {attendee.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Agenda */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Meeting Agenda
            </h3>
            <div className="ml-7">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">{meeting.agenda}</p>
              </div>
            </div>
          </div>

          {/* Meeting Minutes / Notulensi */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" />
              Meeting Minutes
            </h3>
            <div className="ml-7">
              {meeting.notulensi ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {meeting.notulensi}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <p className="text-sm text-muted-foreground text-center">
                    {meeting.status === "scheduled" ||
                    meeting.status === "ongoing"
                      ? "Meeting minutes will be available after the meeting is completed."
                      : "No meeting minutes recorded for this meeting."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          {meeting.attachments && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Attachments
              </h3>
              <div className="ml-7">
                <div className="flex flex-wrap gap-2">
                  {meeting.attachments.split(",").map((attachment, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {attachment.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDetailDialog;
