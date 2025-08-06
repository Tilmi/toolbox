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
  Download,
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

  const exportToPDF = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const jsPDF = (await import("jspdf")).default;

      // Create new PDF document
      const pdf = new jsPDF();

      // Set font
      pdf.setFont("helvetica");

      let yPosition = 20;
      const leftMargin = 20;
      const rightMargin = 190;
      const pageWidth = rightMargin - leftMargin;

      // Header Section (without logo)
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.setFont("helvetica", "bold");
      pdf.text("PT. PUPUK KUJANG CIKAMPEK", 105, 22, { align: "center" });

      // Company address/info
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text("Jl. Raya Cikampek - Jakarta, Cikampek, Karawang", 105, 28, {
        align: "center",
      });
      pdf.text("Telp: (0267) 8459000 | Email: info@pupukkujang.com", 105, 32, {
        align: "center",
      });

      yPosition = 50;

      // Document Title
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 100, 200);
      pdf.text("NOTULENSI RAPAT", 105, yPosition, { align: "center" });
      yPosition += 5;

      // Line separator
      pdf.setLineWidth(1);
      pdf.setDrawColor(0, 100, 200);
      pdf.line(leftMargin, yPosition, rightMargin, yPosition);
      yPosition += 15;

      // 1. IDENTITAS RAPAT
      pdf.setFontSize(12);
      pdf.setTextColor(0, 100, 200);
      pdf.setFont("helvetica", "bold");
      pdf.text("I. IDENTITAS RAPAT", leftMargin, yPosition);
      yPosition += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      // Meeting details in table format
      const addDetailRow = (
        label: string,
        value: string,
        wrap: boolean = false
      ) => {
        pdf.setFont("helvetica", "bold");
        pdf.text(`${label}:`, leftMargin + 5, yPosition);
        pdf.setFont("helvetica", "normal");

        if (wrap) {
          const lines = pdf.splitTextToSize(value, pageWidth - 60);
          pdf.text(lines, leftMargin + 60, yPosition);
          yPosition += lines.length * 4 + 2;
        } else {
          pdf.text(value, leftMargin + 60, yPosition);
          yPosition += 6;
        }
      };

      addDetailRow("Nama Rapat", meeting.title, true);
      addDetailRow("Hari/Tanggal", formatDate(meeting.date));
      addDetailRow(
        "Waktu",
        `${formatTime(meeting.startTime)} - ${formatTime(meeting.endTime)} WIB`
      );
      addDetailRow("Tempat", meeting.location, true);
      addDetailRow(
        "Jenis Rapat",
        meeting.type === "online" ? "Online Meeting" : "Rapat Tatap Muka"
      );
      addDetailRow("Pimpinan Rapat", meeting.organizer);
      addDetailRow("Departemen", meeting.department);
      addDetailRow(
        "Status",
        meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)
      );
      yPosition += 10;

      // 2. DAFTAR HADIR
      pdf.setFontSize(12);
      pdf.setTextColor(0, 100, 200);
      pdf.setFont("helvetica", "bold");
      pdf.text("II. DAFTAR HADIR", leftMargin, yPosition);
      yPosition += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const participants = meeting.attendees.split(",").map((p) => p.trim());
      pdf.text("Peserta yang hadir:", leftMargin + 5, yPosition);
      yPosition += 6;

      participants.forEach((participant, index) => {
        pdf.text(`${index + 1}. ${participant}`, leftMargin + 10, yPosition);
        yPosition += 5;
      });

      // Add organizer to attendance
      pdf.text(
        `${participants.length + 1}. ${meeting.organizer} (Pimpinan Rapat)`,
        leftMargin + 10,
        yPosition
      );
      yPosition += 10;

      // Total attendees
      pdf.setFont("helvetica", "bold");
      pdf.text(
        `Total Peserta: ${participants.length + 1} orang`,
        leftMargin + 5,
        yPosition
      );
      yPosition += 15;

      // 3. AGENDA RAPAT
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(0, 100, 200);
      pdf.text("III. AGENDA RAPAT", leftMargin, yPosition);
      yPosition += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const agendaLines = pdf.splitTextToSize(meeting.agenda, pageWidth - 10);
      pdf.text(agendaLines, leftMargin + 5, yPosition);
      yPosition += agendaLines.length * 4 + 15;

      // Check if we need a new page
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      // 4. PEMBAHASAN & KEPUTUSAN
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(0, 100, 200);
      pdf.text("IV. RINGKASAN PEMBAHASAN & KEPUTUSAN", leftMargin, yPosition);
      yPosition += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      if (meeting.notulensi && meeting.notulensi.trim()) {
        const minutesLines = pdf.splitTextToSize(
          meeting.notulensi,
          pageWidth - 10
        );

        // Handle page breaks for long content
        minutesLines.forEach((line: string) => {
          if (yPosition > 270) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.text(line, leftMargin + 5, yPosition);
          yPosition += 4;
        });
      } else {
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          "Belum ada catatan pembahasan dan keputusan yang direkam.",
          leftMargin + 5,
          yPosition
        );
        yPosition += 6;
      }
      yPosition += 15;

      // 5. TINDAK LANJUT (ACTION ITEMS)
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(0, 100, 200);
      pdf.text("V. TINDAK LANJUT (ACTION ITEMS)", leftMargin, yPosition);
      yPosition += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      // Parse and extract action items from notulensi
      if (meeting.notulensi && meeting.notulensi.trim()) {
        const notulensiText = meeting.notulensi.toLowerCase();

        // Check if there are action items mentioned in the notes
        if (
          notulensiText.includes("action") ||
          notulensiText.includes("tindak") ||
          notulensiText.includes("deadline") ||
          notulensiText.includes("follow up")
        ) {
          pdf.text(
            "Berdasarkan hasil pembahasan rapat, berikut adalah tindak lanjut yang harus dilaksanakan:",
            leftMargin + 5,
            yPosition
          );
          yPosition += 8;

          // Try to extract specific action items
          const sentences = meeting.notulensi
            .split(/[.!?]+/)
            .filter((s) => s.trim());
          let actionItemNumber = 1;
          let hasActionItems = false;

          sentences.forEach((sentence) => {
            const lowerSentence = sentence.toLowerCase();
            if (
              lowerSentence.includes("action") ||
              lowerSentence.includes("tindak") ||
              lowerSentence.includes("deadline") ||
              lowerSentence.includes("follow up") ||
              lowerSentence.includes("mencari") ||
              lowerSentence.includes("menyesuaikan") ||
              lowerSentence.includes("mengevaluasi") ||
              lowerSentence.includes("melakukan")
            ) {
              if (yPosition > 270) {
                pdf.addPage();
                yPosition = 20;
              }

              const actionText = sentence.trim();
              if (actionText.length > 10) {
                // Only include meaningful action items
                const lines = pdf.splitTextToSize(
                  `${actionItemNumber}. ${actionText}.`,
                  pageWidth - 15
                );
                pdf.text(lines, leftMargin + 10, yPosition);
                yPosition += lines.length * 4 + 3;
                actionItemNumber++;
                hasActionItems = true;
              }
            }
          });

          // If no specific action items found, provide a general summary
          if (!hasActionItems) {
            pdf.text(
              "1. Melaksanakan keputusan dan hasil pembahasan yang telah disepakati dalam rapat.",
              leftMargin + 10,
              yPosition
            );
            yPosition += 6;
            pdf.text(
              "2. Melakukan monitoring dan evaluasi terhadap progress implementasi.",
              leftMargin + 10,
              yPosition
            );
            yPosition += 6;
            pdf.text(
              "3. Melaporkan perkembangan pada rapat berikutnya sesuai jadwal yang ditentukan.",
              leftMargin + 10,
              yPosition
            );
          }

          yPosition += 8;

          // Add deadline information if available
          pdf.setFont("helvetica", "bold");
          pdf.text("Catatan:", leftMargin + 5, yPosition);
          pdf.setFont("helvetica", "normal");
          yPosition += 5;
          pdf.text(
            "- Setiap tindak lanjut harus dilaksanakan sesuai dengan timeline yang telah disepakati.",
            leftMargin + 10,
            yPosition
          );
          yPosition += 5;
          pdf.text(
            "- Progress pelaksanaan akan dipantau dan dilaporkan pada rapat evaluasi berikutnya.",
            leftMargin + 10,
            yPosition
          );
        } else {
          // No specific action items found
          pdf.text(
            "Berdasarkan hasil pembahasan rapat:",
            leftMargin + 5,
            yPosition
          );
          yPosition += 8;
          pdf.text(
            "1. Melaksanakan semua keputusan yang telah disepakati dalam rapat ini.",
            leftMargin + 10,
            yPosition
          );
          yPosition += 6;
          pdf.text(
            "2. Setiap peserta bertanggung jawab terhadap tugas dan kewajiban masing-masing.",
            leftMargin + 10,
            yPosition
          );
          yPosition += 6;
          pdf.text(
            "3. Melakukan evaluasi berkala terhadap implementasi hasil rapat.",
            leftMargin + 10,
            yPosition
          );
        }
      } else {
        // No meeting notes available
        pdf.text(
          "Tindak lanjut akan ditetapkan setelah pembahasan rapat selesai:",
          leftMargin + 5,
          yPosition
        );
        yPosition += 8;
        pdf.text(
          "1. Menunggu hasil finalisasi pembahasan dan keputusan rapat.",
          leftMargin + 10,
          yPosition
        );
        yPosition += 6;
        pdf.text(
          "2. Tindak lanjut spesifik akan dikomunikasikan melalui notulensi final.",
          leftMargin + 10,
          yPosition
        );
        yPosition += 6;
        pdf.text(
          "3. Setiap peserta diminta standby untuk menerima instruksi lebih lanjut.",
          leftMargin + 10,
          yPosition
        );
      }
      yPosition += 15;

      // 6. PENUTUP
      if (yPosition > 240) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(0, 100, 200);
      pdf.text("VI. PENUTUP", leftMargin, yPosition);
      yPosition += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const closingText = `Rapat ditutup pada pukul ${formatTime(
        meeting.endTime
      )} WIB oleh ${
        meeting.organizer
      } sebagai pimpinan rapat. Demikian notulensi rapat ini dibuat dengan sebenar-benarnya.`;
      const closingLines = pdf.splitTextToSize(closingText, pageWidth - 10);
      pdf.text(closingLines, leftMargin + 5, yPosition);
      yPosition += closingLines.length * 4 + 20;

      // 7. TANDA TANGAN
      if (yPosition > 220) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(0, 100, 200);
      pdf.text("VII. PENGESAHAN", leftMargin, yPosition);
      yPosition += 15;

      // Signature section
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      // Date and place
      const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      pdf.text(`Cikampek, ${currentDate}`, rightMargin - 60, yPosition);
      yPosition += 15;

      // Signature boxes
      const signatureBoxes = [
        { title: "Pimpinan Rapat", name: meeting.organizer },
        { title: "Notulis", name: "........................" },
      ];

      signatureBoxes.forEach((sig, index) => {
        const xPos = leftMargin + index * 85;
        pdf.text(sig.title, xPos, yPosition);

        // Signature line
        pdf.line(xPos, yPosition + 25, xPos + 70, yPosition + 25);
        pdf.text(sig.name, xPos, yPosition + 30);
      });

      // Footer with metadata (no logo)
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);

        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);

        // Bottom left - Generation info
        pdf.text(
          `Dibuat secara otomatis pada ${new Date().toLocaleString("id-ID")}`,
          leftMargin,
          285
        );

        // Bottom center - Page number
        pdf.text(`Halaman ${i} dari ${pageCount}`, 105, 285, {
          align: "center",
        });

        // Bottom right - Document ID
        pdf.text(
          `Doc ID: MTG-${meeting.id}-${meeting.date}`,
          rightMargin - 40,
          285
        );
      }

      // Save the PDF with formal naming
      const fileName = `Notulensi_Rapat_${meeting.title.replace(
        /[^a-z0-9]/gi,
        "_"
      )}_${meeting.date}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Terjadi kesalahan saat membuat PDF. Silakan coba lagi.");
    }
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
            onClick={exportToPDF}
            variant="outline"
            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Notulensi
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
