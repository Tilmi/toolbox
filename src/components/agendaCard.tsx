"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Video,
  Edit,
  Trash2,
  AlarmClock,
  Eye,
  FileText,
} from "lucide-react";
import {
  formatTime,
  getStatusColor,
  getPriorityColor,
} from "@/lib/utilsMeeting";
import { Meeting } from "@/lib/types";

interface AgendaCardProps {
  meeting: Meeting;
  onEdit: (meeting: Meeting) => void;
  onDelete: (meetingId: number) => void;
  onPreview?: (meeting: Meeting) => void;
  isCompact?: boolean;
}

const AgendaCard = ({
  meeting,
  onEdit,
  onDelete,
  onPreview,
  isCompact = false,
}: AgendaCardProps) => {
  return (
    <Card className="hover:shadow-sm transition-shadow duration-200">
      <CardContent className="p-3">
        <div className="space-y-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${getPriorityColor(
                    meeting.priority
                  )}`}
                ></div>
                <h4
                  className="font-medium text-sm line-clamp-1 cursor-pointer hover:text-blue-600"
                  onClick={() => onPreview?.(meeting)}
                >
                  {meeting.title}
                </h4>
                {meeting.notulensi && (
                  <FileText className="w-3 h-3 text-green-600 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <AlarmClock className="w-3 h-3" />
                <span>
                  {formatTime(meeting.startTime)} -{" "}
                  {formatTime(meeting.endTime)}
                </span>
              </div>
            </div>
            <Badge className={`${getStatusColor(meeting.status)} text-xs`}>
              {meeting.status.charAt(0).toUpperCase()}
            </Badge>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {meeting.type === "online" ? (
              <Video className="w-3 h-3 text-yellow-500" />
            ) : (
              <MapPin className="w-3 h-3 text-red-600" />
            )}
            <span className="truncate">{meeting.location}</span>
          </div>

          {/* Agenda Preview */}
          {!isCompact && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {meeting.agenda}
            </p>
          )}

          {/* Meeting Minutes Preview */}
          {!isCompact && meeting.notulensi && (
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-xs">
              <span className="font-medium text-green-700 dark:text-green-400">
                Minutes:
              </span>
              <p className="text-muted-foreground line-clamp-2 mt-1">
                {meeting.notulensi}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-xs text-muted-foreground">
              <span>{meeting.organizer}</span>
            </div>
            <div className="flex gap-1">
              {onPreview && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => onPreview(meeting)}
                  title="Preview details"
                >
                  <Eye className="w-3 h-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onEdit(meeting)}
                title="Edit meeting"
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onDelete(meeting.id)}
                title="Delete meeting"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendaCard;
