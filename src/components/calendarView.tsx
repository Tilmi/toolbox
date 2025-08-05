"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CalendarDays,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import AgendaCard from "./agendaCard";
import { Meeting } from "@/lib/types";

interface CalendarViewProps {
  meetings: Meeting[];
  onMeetingEdit: (meeting: Meeting) => void;
  onMeetingDelete: (meetingId: number) => void;
  onMeetingPreview: (meeting: Meeting) => void;
  onNewMeeting: (selectedDate?: string) => void;
}

const CalendarView = ({
  meetings,
  onMeetingEdit,
  onMeetingDelete,
  onMeetingPreview,
  onNewMeeting,
}: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const firstDayOfWeek = firstDayOfMonth.getDay();

  const daysInMonth = lastDayOfMonth.getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => null);

  const getMeetingsForDate = (day: number): Meeting[] => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return meetings.filter((meeting) => meeting.date === dateStr);
  };

  const getSelectedDateMeetings = (): Meeting[] => {
    if (!selectedDate) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
    return meetings.filter((meeting) => meeting.date === dateStr);
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(selectedDate === day ? null : day);
  };

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const selectedDateMeetings = getSelectedDateMeetings();
  const selectedDateStr = selectedDate
    ? `${selectedDate} ${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth(-1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth(1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="h-16 sm:h-24 p-1"></div>
              ))}

              {daysArray.map((day) => {
                const dayMeetings = getMeetingsForDate(day);
                const isToday =
                  new Date().toDateString() ===
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  ).toDateString();
                const isSelected = selectedDate === day;
                const hasMeetingsWithMinutes = dayMeetings.some(
                  (m) => m.notulensi && m.notulensi.trim() !== ""
                );

                return (
                  <div
                    key={day}
                    className={`h-16 sm:h-24 p-1 border rounded cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-blue-100 border-blue-400 shadow-md"
                        : isToday
                        ? "bg-blue-50 border-blue-200"
                        : dayMeetings.length > 0
                        ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
                        : "border-muted-foreground hover:bg-muted-foreground"
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div
                      className={`text-sm font-medium mb-1 ${
                        isSelected
                          ? "text-blue-700"
                          : isToday
                          ? "text-blue-600"
                          : "text-gray-900"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayMeetings.slice(0, 2).map((meeting) => (
                        <div
                          key={meeting.id}
                          className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 ${
                            meeting.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : meeting.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                          title={`${meeting.startTime.substring(0, 5)} - ${
                            meeting.title
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onMeetingPreview(meeting);
                          }}
                        >
                          <span className="hidden sm:inline">
                            {meeting.startTime.substring(0, 5)}{" "}
                          </span>
                          {meeting.title}
                          {meeting.notulensi &&
                            meeting.notulensi.trim() !== "" && (
                              <span className="ml-1 text-green-600">●</span>
                            )}
                        </div>
                      ))}
                      {dayMeetings.length > 2 && (
                        <div className="text-xs text-muted-foreground text-center">
                          +{dayMeetings.length - 2} lainnya
                        </div>
                      )}
                      {dayMeetings.length > 0 && (
                        <div className="flex justify-center">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              dayMeetings.some((m) => m.priority === "high")
                                ? "bg-red-400"
                                : dayMeetings.some(
                                    (m) => m.priority === "medium"
                                  )
                                ? "bg-yellow-400"
                                : "bg-green-400"
                            }`}
                          ></div>
                          {hasMeetingsWithMinutes && (
                            <div className="w-2 h-2 rounded-full bg-green-600 ml-1"></div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agenda Panel */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate ? `Agenda ${selectedDateStr}` : "Pilih Tanggal"}
            </CardTitle>
            {selectedDate && selectedDateMeetings.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {selectedDateMeetings.length} scheduled meeting
                </p>
                <div className="text-xs text-green-600">
                  {
                    selectedDateMeetings.filter(
                      (m) => m.notulensi && m.notulensi.trim() !== ""
                    ).length
                  }{" "}
                  with minutes
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {!selectedDate ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Click on the date on the calendar to view the meeting agenda.
                </p>
              </div>
            ) : selectedDateMeetings.length === 0 ? (
              <div className="text-center py-8">
                <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No meeting</h3>
                <p className="text-gray-500 text-sm mb-4">
                  No meetings are scheduled for this date.
                </p>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    // Create new meeting with selected date pre-filled
                    const dateStr = `${currentDate.getFullYear()}-${String(
                      currentDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(selectedDate).padStart(
                      2,
                      "0"
                    )}`;
                    onNewMeeting(dateStr);
                  }}
                >
                  <CalendarPlus className="w-4 h-4 text-white" />
                  <span className="text-white">Create Meeting</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateMeetings
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((meeting) => (
                    <AgendaCard
                      key={meeting.id}
                      meeting={meeting}
                      onEdit={onMeetingEdit}
                      onDelete={onMeetingDelete}
                      onPreview={onMeetingPreview}
                      isCompact={selectedDateMeetings.length > 3}
                    />
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarView;
