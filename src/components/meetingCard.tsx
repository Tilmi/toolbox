"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MapPin,
  Users,
  Video,
  Edit,
  Trash2,
  CalendarDays,
  AlarmClock,
  Eye,
  FileText,
} from "lucide-react";
import {
  formatDate,
  formatTime,
  getStatusColor,
  getPriorityColor,
} from "@/lib/utilsMeeting";
import { Meeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: Meeting;
  onEdit: (meeting: Meeting) => void;
  onDelete: (meetingId: number) => void;
  onPreview: (meeting: Meeting) => void;
}

const MeetingCard = ({
  meeting,
  onEdit,
  onDelete,
  onPreview,
}: MeetingCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <div
                  className={`w-2 h-2 rounded-full ${getPriorityColor(
                    meeting.priority
                  )}`}
                ></div>
                <CardTitle
                  className="text-lg font-semibold dark:text-white text-black line-clamp-1 cursor-pointer hover:text-blue-600"
                  onClick={() => onPreview(meeting)}
                >
                  {meeting.title}
                </CardTitle>
                {meeting.isRecurring && (
                  <Badge variant="outline" className="text-xs">
                    Recurring
                  </Badge>
                )}
                {meeting.notulensi && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-green-50 text-green-700 border-green-200"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Minutes
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4 text-blue-600" />
                  <span className="hidden sm:inline">
                    {formatDate(meeting.date)}
                  </span>
                  <span className="sm:hidden">
                    {new Date(meeting.date).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <AlarmClock className="w-4 h-4 text-green-600" />
                  <span>
                    {formatTime(meeting.startTime)} -{" "}
                    {formatTime(meeting.endTime)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge className={getStatusColor(meeting.status)}>
                <span className="hidden sm:inline">
                  {meeting.status.charAt(0).toUpperCase() +
                    meeting.status.slice(1)}
                </span>
                <span className="sm:hidden">
                  {meeting.status.charAt(0).toUpperCase()}
                </span>
              </Badge>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPreview(meeting)}
                  title="Preview meeting details"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(meeting)}
                  title="Edit meeting"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                  title="Delete meeting"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {meeting.type === "online" ? (
                  <>
                    <Video className="w-4 h-4 text-yellow-500" />
                    <span className="truncate">{meeting.location}</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="truncate">{meeting.location}</span>
                  </>
                )}
              </div>
              <Badge variant="outline" className="text-xs">
                {meeting.department}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm flex-wrap gap-2">
              <div className="text-muted-foreground truncate">
                <span className="font-medium">Organizer:</span>{" "}
                {meeting.organizer}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
                <Users className="w-4 h-4 text-purple-500" />
                <span>{meeting.attendees.split(",").length} participant</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Agenda:</span>
              <p className="mt-1 line-clamp-2">{meeting.agenda}</p>
            </div>

            {/* Meeting Minutes Preview */}
            {meeting.notulensi && (
              <div className="text-sm">
                <span className="font-medium text-green-700 dark:text-green-400">
                  Minutes:
                </span>
                <p className="mt-1 line-clamp-2 text-muted-foreground bg-green-50 dark:bg-green-900/20 p-2 rounded text-xs">
                  {meeting.notulensi}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Meeting</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the meeting &quot;{meeting.title}
              &quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(meeting.id);
                setShowDeleteDialog(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              <span className="text-white">Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MeetingCard;
