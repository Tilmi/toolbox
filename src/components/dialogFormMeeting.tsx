"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  departments,
  priorities,
  statuses,
  meetingTypes,
} from "@/lib/dataMeeting";
import { Meeting } from "@/lib/types";

interface MeetingFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meeting?: Meeting | null;
  onSave: (meeting: Omit<Meeting, "id"> & { id?: number }) => void;
  prefilledDate?: string | null;
}

const MeetingFormDialog = ({
  open,
  onOpenChange,
  meeting,
  onSave,
  prefilledDate = null,
}: MeetingFormDialogProps) => {
  const [formData, setFormData] = useState<
    Omit<Meeting, "id"> & { id?: number }
  >({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    organizer: "",
    department: "IT",
    attendees: "",
    type: "offline",
    agenda: "",
    priority: "medium",
    isRecurring: false,
    status: "scheduled",
    notulensi: "",
  });

  useEffect(() => {
    if (meeting) {
      setFormData({
        ...meeting,
        notulensi: meeting.notulensi || "",
      });
    } else {
      setFormData({
        title: "",
        date: prefilledDate || "",
        startTime: "",
        endTime: "",
        location: "",
        organizer: "",
        department: "IT",
        attendees: "",
        type: "offline",
        agenda: "",
        priority: "medium",
        isRecurring: false,
        status: "scheduled",
        notulensi: "",
      });
    }
  }, [meeting, open, prefilledDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isEditMode = !!meeting;
  const canEditNotulensi =
    formData.status === "completed" || formData.status === "ongoing";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {meeting ? "Edit Meeting" : "Create New Meeting"}
          </DialogTitle>
          <DialogDescription>
            {meeting
              ? "Edit existing meeting information and minutes"
              : "Fill out the form to create a new meeting"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Meeting Details</TabsTrigger>
              <TabsTrigger value="minutes">Meeting Minutes</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="lg:col-span-2 md:col-span-2 sm:col-span-1">
                  <Label className="mb-2" htmlFor="title">
                    Meeting Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter the meeting title"
                    required
                  />
                </div>

                <div>
                  <Label className="mb-2" htmlFor="date">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="mb-2" htmlFor="startTime">
                      Start
                    </Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        handleInputChange("startTime", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="endTime">
                      End
                    </Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        handleInputChange("endTime", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-2" htmlFor="type">
                    Type Meeting
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {meetingTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === "offline" ? "Offline" : "Online"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2" htmlFor="location">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder={
                      formData.type === "online"
                        ? "Link Meeting Online"
                        : "Meeting Room"
                    }
                    required
                  />
                </div>

                <div>
                  <Label className="mb-2" htmlFor="organizer">
                    Organizer
                  </Label>
                  <Input
                    id="organizer"
                    value={formData.organizer}
                    onChange={(e) =>
                      handleInputChange("organizer", e.target.value)
                    }
                    placeholder="Name organizer"
                    required
                  />
                </div>

                <div>
                  <Label className="mb-2" htmlFor="department">
                    Department
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      handleInputChange("department", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2" htmlFor="priority">
                    Priority
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      handleInputChange("priority", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2" htmlFor="status">
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-2" htmlFor="attendees">
                    Participant
                  </Label>
                  <Input
                    id="attendees"
                    value={formData.attendees}
                    onChange={(e) =>
                      handleInputChange("attendees", e.target.value)
                    }
                    placeholder="Participant names (separated by commas)"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-2" htmlFor="agenda">
                    Agenda Meeting
                  </Label>
                  <Textarea
                    id="agenda"
                    value={formData.agenda}
                    onChange={(e) =>
                      handleInputChange("agenda", e.target.value)
                    }
                    placeholder="Meeting agenda description"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="minutes" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notulensi" className="text-lg font-semibold">
                    Meeting Minutes / Notulensi
                  </Label>
                  {!canEditNotulensi && (
                    <div className="text-sm text-muted-foreground bg-yellow-100 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
                      Available for ongoing/completed meetings
                    </div>
                  )}
                </div>

                <Textarea
                  id="notulensi"
                  value={formData.notulensi || ""}
                  onChange={(e) =>
                    handleInputChange("notulensi", e.target.value)
                  }
                  placeholder={
                    canEditNotulensi
                      ? "Enter meeting minutes, decisions made, action items, etc..."
                      : "Meeting minutes will be available when the meeting status is set to 'ongoing' or 'completed'"
                  }
                  rows={10}
                  className="resize-none"
                  disabled={!canEditNotulensi}
                />

                <div className="text-xs text-muted-foreground">
                  <p className="mb-2">
                    Tips for writing effective meeting minutes:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Record key decisions and outcomes</li>
                    <li>List action items with responsible persons</li>
                    <li>Note important discussions and concerns raised</li>
                    <li>Include deadlines and follow-up dates</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {meeting ? "Update Meeting" : "Create Meeting"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingFormDialog;
