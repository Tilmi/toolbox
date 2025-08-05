// components/InboxCard.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Clock,
  MoreHorizontal,
  User,
  Building2,
  CheckCircle,
  XCircle,
  Archive,
  Eye,
  AlertTriangle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InboxMessage,
  getMessageTypeInfo,
  getPriorityInfo,
  formatMessageTime,
  getInitials,
} from "@/lib/dataInbox";

interface InboxCardProps {
  message: InboxMessage;
  onMarkAsRead?: (id: string) => void;
  onArchive?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const InboxCard: React.FC<InboxCardProps> = ({
  message,
  onMarkAsRead,
  onArchive,
  onApprove,
  onReject,
  onDelete,
}) => {
  const typeInfo = getMessageTypeInfo(message.type);
  const priorityInfo = getPriorityInfo(message.priority);

  const handleActionClick = (action: () => void, event: React.MouseEvent) => {
    event.stopPropagation();
    action();
  };

  return (
    <Card
      className={`
      transition-all duration-300 hover:shadow-lg cursor-pointer group
      ${
        message.status === "unread"
          ? "border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent shadow-sm"
          : message.status === "archived"
          ? "opacity-70 bg-gray-50/50"
          : "hover:bg-slate-50/50"
      }
      ${message.priority === "high" ? "ring-1 ring-red-100" : ""}
    `}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between space-x-4">
          {/* Avatar & Main Info */}
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <Avatar className="h-11 w-11 shrink-0">
              <AvatarFallback
                className={`
                text-white text-sm font-bold
                ${
                  message.type === "system"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600"
                    : message.type === "admin"
                    ? "bg-gradient-to-br from-green-500 to-green-600"
                    : message.type === "alert"
                    ? "bg-gradient-to-br from-red-500 to-red-600"
                    : message.type === "approval"
                    ? "bg-gradient-to-br from-amber-500 to-amber-600"
                    : "bg-gradient-to-br from-purple-500 to-purple-600"
                }
              `}
              >
                {getInitials(message.sender)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              {/* Subject with badges */}
              <div className="flex items-start gap-2 mb-2">
                <h3
                  className={`
                  font-semibold text-base leading-tight truncate flex-1
                  ${
                    message.status === "unread"
                      ? "text-gray-900"
                      : "text-gray-700"
                  }
                `}
                >
                  {message.subject}
                </h3>

                {message.actionRequired && (
                  <Badge
                    variant="destructive"
                    className="shrink-0 text-xs px-2 py-0.5 animate-pulse"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Action Required
                  </Badge>
                )}
              </div>

              {/* Sender info */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <User className="h-3.5 w-3.5" />
                <span className="font-medium">{message.sender}</span>
                <span className="text-gray-400">•</span>
                <span>{message.senderRole}</span>
                {message.department && (
                  <>
                    <Building2 className="h-3.5 w-3.5 ml-1 text-gray-400" />
                    <span className="text-gray-500">{message.department}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Priority & Type badges + Menu */}
          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant={priorityInfo.color}
              className={`text-xs px-2 py-1 ${priorityInfo.bgColor} ${priorityInfo.textColor} border-0`}
            >
              <span className="mr-1">{priorityInfo.icon}</span>
              {priorityInfo.label}
            </Badge>

            <Badge
              variant={typeInfo.color}
              className={`text-xs px-2 py-1 ${typeInfo.bgColor} ${typeInfo.textColor} border-0`}
            >
              {typeInfo.label}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {message.status === "unread" && onMarkAsRead && (
                  <DropdownMenuItem onClick={() => onMarkAsRead(message.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Tandai Sudah Dibaca
                  </DropdownMenuItem>
                )}

                {onArchive && (
                  <DropdownMenuItem onClick={() => onArchive(message.id)}>
                    <Archive className="mr-2 h-4 w-4" />
                    Arsipkan Pesan
                  </DropdownMenuItem>
                )}

                {onDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(message.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Hapus Pesan
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Message content */}
        <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
          {message.content}
        </p>

        {/* Footer with timestamp and actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>{formatMessageTime(message.timestamp)}</span>
          </div>

          {/* Action buttons for approval messages */}
          {message.actionRequired &&
            message.type === "approval" &&
            message.status !== "archived" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                  onClick={(e) =>
                    handleActionClick(() => onReject?.(message.id), e)
                  }
                >
                  <XCircle className="h-3 w-3 mr-1" />
                  Tolak
                </Button>
                <Button
                  size="sm"
                  className="h-8 px-3 text-xs bg-green-600 hover:bg-green-700"
                  onClick={(e) =>
                    handleActionClick(() => onApprove?.(message.id), e)
                  }
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Setujui
                </Button>
              </div>
            )}

          {/* Action button for other action required messages */}
          {message.actionRequired &&
            message.type !== "approval" &&
            message.status !== "archived" && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3 text-xs hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                onClick={(e) =>
                  handleActionClick(() => onMarkAsRead?.(message.id), e)
                }
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Tandai Selesai
              </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
};
