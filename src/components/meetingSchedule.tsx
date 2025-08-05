"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Plus,
  Search,
  List,
  CalendarDays,
  CalendarPlus,
  AlarmClock,
  CalendarCheck,
} from "lucide-react";

// Components
import MeetingCard from "./meetingCard";
import CalendarView from "./calendarView";
import MeetingFormDialog from "./dialogFormMeeting";
import MeetingDetailDialog from "./MeetingDetailDialog";

// Data and types
import { initialMeetingsData, departments, statuses } from "@/lib/dataMeeting";
import { Meeting, ViewMode } from "@/lib/types";

const MeetingSchedule = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetingsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [previewingMeeting, setPreviewingMeeting] = useState<Meeting | null>(
    null
  );
  const [prefilledDate, setPrefilledDate] = useState<string | null>(null);

  // Filter meetings
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (meeting.notulensi &&
        meeting.notulensi.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment =
      filterDepartment === "all" || meeting.department === filterDepartment;
    const matchesStatus =
      filterStatus === "all" || meeting.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Get unique departments from meetings
  const meetingDepartments = [...new Set(meetings.map((m) => m.department))];

  // Get today's meetings
  const today = new Date().toISOString().split("T")[0];
  const todayMeetings = filteredMeetings.filter(
    (meeting) => meeting.date === today
  );
  const upcomingMeetings = filteredMeetings.filter(
    (meeting) => meeting.date > today
  );

  const handleSaveMeeting = (
    meetingData: Omit<Meeting, "id"> & { id?: number }
  ) => {
    if (editingMeeting && meetingData.id) {
      // Update existing meeting
      setMeetings((prev) =>
        prev.map((meeting) =>
          meeting.id === editingMeeting.id
            ? { ...meetingData, id: editingMeeting.id }
            : meeting
        )
      );
    } else {
      // Add new meeting
      const newMeeting: Meeting = {
        ...meetingData,
        id: Math.max(...meetings.map((m) => m.id), 0) + 1,
        notulensi: meetingData.notulensi || "",
      };
      setMeetings((prev) => [...prev, newMeeting]);
    }
    setEditingMeeting(null);
    setPrefilledDate(null);
  };

  const handleEditMeeting = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setPrefilledDate(null);
    setShowMeetingDialog(true);
  };

  const handlePreviewMeeting = (meeting: Meeting) => {
    setPreviewingMeeting(meeting);
    setShowDetailDialog(true);
  };

  const handleDeleteMeeting = (meetingId: number) => {
    setMeetings((prev) => prev.filter((meeting) => meeting.id !== meetingId));
  };

  const handleNewMeeting = (selectedDate: string | null = null) => {
    setEditingMeeting(null);
    setPrefilledDate(selectedDate);
    setShowMeetingDialog(true);
  };

  const handleEditFromPreview = (meeting: Meeting) => {
    setPreviewingMeeting(null);
    setShowDetailDialog(false);
    handleEditMeeting(meeting);
  };

  // Get meetings with minutes
  const meetingsWithMinutes = meetings.filter(
    (meeting) => meeting.notulensi && meeting.notulensi.trim() !== ""
  );

  return (
    <div className="p-2 space-y-6 bg-white dark:bg-black min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-black dark:text-white">
            Meeting Schedule
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor company meeting schedules and minutes
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex dark:bg-black border bg-white rounded-lg p-1">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : ""
              }
            >
              <List className="w-4 h-4 mr-1 dark:text-white" />
              <span className="hidden sm:inline dark:text-white">List</span>
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className={
                viewMode === "calendar" ? "bg-blue-600 hover:bg-blue-700" : ""
              }
            >
              <CalendarDays className="w-4 h-4 mr-1 dark:text-white" />
              <span className="hidden sm:inline dark:text-white">Calendar</span>
            </Button>
          </div>
          <Button
            onClick={() => handleNewMeeting()}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto mt-1"
          >
            <CalendarPlus className="w-4 h-4 mr-2 text-white" />
            <span className="text-white">New Meeting</span>
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search meetings, organizers, minutes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dept</SelectItem>
              {meetingDepartments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md text-muted-foreground">Today</p>
                <p className="text-2xl font-bold dark:text-white text-black">
                  {todayMeetings.length}
                </p>
              </div>
              <Calendar
                size={45}
                className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
              />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="pt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold dark:text-white text-black">
                  {upcomingMeetings.length}
                </p>
              </div>
              <AlarmClock
                size={45}
                className="rounded-lg bg-red-500/30 border-1 border-red-500/50 p-2 text-red-500 shadow-lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md text-muted-foreground">With Minutes</p>
                <p className="text-2xl font-bold dark:text-white text-black">
                  {meetingsWithMinutes.length}
                </p>
              </div>
              <Video
                size={45}
                className="rounded-lg bg-green-500/30 border-1 border-green-500/50 p-2 text-green-500 shadow-lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md text-muted-foreground">Total Meeting</p>
                <p className="text-2xl font-bold dark:text-white text-black">
                  {meetings.length}
                </p>
              </div>
              <CalendarCheck
                size={45}
                className="rounded-lg bg-purple-500/30 border-1 border-purple-500/50 p-2 text-purple-500 shadow-lg"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Calendar or List View */}
      {viewMode === "calendar" ? (
        <CalendarView
          meetings={filteredMeetings}
          onMeetingEdit={handleEditMeeting}
          onMeetingDelete={handleDeleteMeeting}
          onMeetingPreview={handlePreviewMeeting}
          onNewMeeting={handleNewMeeting}
        />
      ) : (
        <div className="space-y-6">
          {/* Today's Meetings */}
          {todayMeetings.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold dark:text-white text-black mb-4">
                Today's Meetings
              </h2>
              <div className="grid gap-4">
                {todayMeetings.map((meeting) => (
                  <MeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    onEdit={handleEditMeeting}
                    onDelete={handleDeleteMeeting}
                    onPreview={handlePreviewMeeting}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Meetings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold dark:text-white text-black">
                {todayMeetings.length > 0 ? "All Meetings" : "Meetings"} (
                {filteredMeetings.length})
              </h2>
            </div>

            {filteredMeetings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium dark:text-white text-black mb-2">
                    No meetings
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    There are no meetings that match the selected filters.
                  </p>
                  <Button
                    onClick={() => handleNewMeeting()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <CalendarPlus className="w-4 h-4 mr-2 text-white" />
                    <span className="text-white">Create New Meeting</span>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredMeetings
                  .sort((a, b) => {
                    // Sort by date first, then by time
                    if (a.date !== b.date) {
                      return (
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                      );
                    }
                    return a.startTime.localeCompare(b.startTime);
                  })
                  .map((meeting) => (
                    <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      onEdit={handleEditMeeting}
                      onDelete={handleDeleteMeeting}
                      onPreview={handlePreviewMeeting}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Meeting Form Dialog */}
      <MeetingFormDialog
        open={showMeetingDialog}
        onOpenChange={setShowMeetingDialog}
        meeting={editingMeeting}
        onSave={handleSaveMeeting}
        prefilledDate={prefilledDate}
      />

      {/* Meeting Detail Dialog */}
      <MeetingDetailDialog
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
        meeting={previewingMeeting}
        onEdit={handleEditFromPreview}
      />
    </div>
  );
};

export default MeetingSchedule;
