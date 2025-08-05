// lib/inbox-data.ts
export type MessageType =
  | "system"
  | "admin"
  | "alert"
  | "reminder"
  | "approval";
export type MessagePriority = "high" | "medium" | "low";
export type MessageStatus = "unread" | "read" | "archived";

export interface InboxMessage {
  id: string;
  type: MessageType;
  priority: MessagePriority;
  status: MessageStatus;
  sender: string;
  senderRole: string;
  subject: string;
  content: string;
  timestamp: Date;
  actionRequired?: boolean;
  department?: string;
  avatar?: string;
}

export const mockInboxData: InboxMessage[] = [
  {
    id: "1",
    type: "alert",
    priority: "high",
    status: "unread",
    sender: "System Monitor",
    senderRole: "System",
    subject: "Server Database Maintenance - Scheduled Downtime",
    content:
      "Maintenance database server akan dilakukan pada tanggal 5 Agustus 2025 pukul 02:00 - 06:00 WIB. Mohon untuk tidak mengakses sistem selama periode tersebut.",
    timestamp: new Date("2025-08-02T08:30:00"),
    actionRequired: false,
    department: "IT",
  },
  {
    id: "2",
    type: "approval",
    priority: "high",
    status: "unread",
    sender: "Ahmad Fadli",
    senderRole: "Project Manager",
    subject: "Approval Request - Budget Tambahan Project ERP",
    content:
      "Memerlukan approval untuk budget tambahan sebesar Rp 50.000.000 untuk pengembangan modul inventory management. Detail terlampir dalam dokumen.",
    timestamp: new Date("2025-08-02T07:15:00"),
    actionRequired: true,
    department: "Finance",
  },
  {
    id: "3",
    type: "system",
    priority: "medium",
    status: "unread",
    sender: "IT Admin",
    senderRole: "Administrator",
    subject: "Update Keamanan - Mandatory Password Change",
    content:
      "Sesuai dengan kebijakan keamanan perusahaan, seluruh user diwajibkan mengganti password dalam 7 hari ke depan. Silakan akses menu Settings > Security.",
    timestamp: new Date("2025-08-02T06:45:00"),
    actionRequired: true,
    department: "IT",
  },
  {
    id: "4",
    type: "reminder",
    priority: "medium",
    status: "read",
    sender: "Project System",
    senderRole: "System",
    subject: "Reminder - Deadline Project SAP Implementation",
    content:
      "Project SAP Implementation Phase 2 akan berakhir dalam 3 hari (5 Agustus 2025). Mohon pastikan semua deliverables sudah completed.",
    timestamp: new Date("2025-08-01T16:20:00"),
    actionRequired: false,
    department: "IT",
  },
  {
    id: "5",
    type: "admin",
    priority: "low",
    status: "read",
    sender: "HR Department",
    senderRole: "Administrator",
    subject: "Training - Digital Transformation Workshop",
    content:
      "Pendaftaran training Digital Transformation Workshop telah dibuka. Training akan dilaksanakan pada 10-12 Agustus 2025. Silakan daftar melalui portal HR.",
    timestamp: new Date("2025-08-01T14:10:00"),
    actionRequired: false,
    department: "HR",
  },
  {
    id: "6",
    type: "alert",
    priority: "medium",
    status: "read",
    sender: "Security Monitor",
    senderRole: "System",
    subject: "Security Alert - Unusual Login Activity",
    content:
      "Terdeteksi aktivitas login yang tidak biasa pada user ID PKJ001 dari lokasi berbeda. Mohon verifikasi dan lakukan reset password jika diperlukan.",
    timestamp: new Date("2025-08-01T11:30:00"),
    actionRequired: true,
    department: "IT",
  },
  {
    id: "7",
    type: "system",
    priority: "low",
    status: "read",
    sender: "System Update",
    senderRole: "System",
    subject: "New Feature - Enhanced Reporting Dashboard",
    content:
      "Fitur baru Enhanced Reporting Dashboard telah tersedia. Fitur ini memungkinkan pembuatan laporan yang lebih interaktif dan real-time. Coba sekarang!",
    timestamp: new Date("2025-07-31T09:15:00"),
    actionRequired: false,
    department: "IT",
  },
  {
    id: "8",
    type: "approval",
    priority: "medium",
    status: "archived",
    sender: "Siti Nurhaliza",
    senderRole: "Department Head",
    subject: "Approval - Akses Database Production Environment",
    content:
      "Request akses ke production database untuk troubleshooting issue pada modul sales reporting. Akses diperlukan untuk periode 1 minggu.",
    timestamp: new Date("2025-07-30T13:45:00"),
    actionRequired: true,
    department: "IT",
  },
  {
    id: "9",
    type: "reminder",
    priority: "high",
    status: "unread",
    sender: "Finance System",
    senderRole: "System",
    subject: "Reminder - Monthly Report Submission",
    content:
      "Deadline pengumpulan laporan bulanan departemen adalah besok (3 Agustus 2025). Mohon segera submit laporan melalui sistem ERP.",
    timestamp: new Date("2025-08-02T05:20:00"),
    actionRequired: true,
    department: "Finance",
  },
  {
    id: "10",
    type: "admin",
    priority: "medium",
    status: "unread",
    sender: "General Manager",
    senderRole: "Management",
    subject: "Announcement - New Company Policy Update",
    content:
      "Kebijakan baru mengenai work from home dan hybrid working telah diperbarui. Silakan baca dokumen terlampir dan konfirmasi pemahaman melalui sistem HR.",
    timestamp: new Date("2025-08-01T20:45:00"),
    actionRequired: true,
    department: "HR",
  },
];

// Utility functions untuk styling dan formatting
export const getMessageTypeInfo = (type: MessageType) => {
  const typeConfig = {
    alert: {
      label: "Alert",
      color: "destructive" as const,
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
    },
    approval: {
      label: "Persetujuan",
      color: "default" as const,
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
    },
    system: {
      label: "Sistem",
      color: "secondary" as const,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
    },
    reminder: {
      label: "Pengingat",
      color: "outline" as const,
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
    },
    admin: {
      label: "Admin",
      color: "secondary" as const,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
    },
  };

  return typeConfig[type] || typeConfig.system;
};

export const getPriorityInfo = (priority: MessagePriority) => {
  const priorityConfig = {
    high: {
      label: "Tinggi",
      color: "destructive" as const,
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      icon: "🔴",
    },
    medium: {
      label: "Sedang",
      color: "default" as const,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      icon: "🟡",
    },
    low: {
      label: "Rendah",
      color: "secondary" as const,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      icon: "🟢",
    },
  };

  return priorityConfig[priority] || priorityConfig.medium;
};

export const formatMessageTime = (timestamp: Date): string => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return "Baru saja";
  } else if (minutes < 60) {
    return `${minutes} menit yang lalu`;
  } else if (hours < 24) {
    return `${hours} jam yang lalu`;
  } else if (days < 7) {
    return `${days} hari yang lalu`;
  } else {
    return timestamp.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Filter dan search utilities
export const filterMessages = (
  messages: InboxMessage[],
  filters: {
    search?: string;
    type?: MessageType | "all";
    priority?: MessagePriority | "all";
    status?: MessageStatus | "all";
  }
) => {
  let filtered = [...messages];

  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (msg) =>
        msg.subject.toLowerCase().includes(query) ||
        msg.sender.toLowerCase().includes(query) ||
        msg.content.toLowerCase().includes(query) ||
        msg.department?.toLowerCase().includes(query)
    );
  }

  if (filters.type && filters.type !== "all") {
    filtered = filtered.filter((msg) => msg.type === filters.type);
  }

  if (filters.priority && filters.priority !== "all") {
    filtered = filtered.filter((msg) => msg.priority === filters.priority);
  }

  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter((msg) => msg.status === filters.status);
  }

  return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Statistics calculator
export const calculateStats = (messages: InboxMessage[]) => {
  const unread = messages.filter((msg) => msg.status === "unread").length;
  const actionRequired = messages.filter(
    (msg) => msg.actionRequired && msg.status !== "archived"
  ).length;
  const highPriority = messages.filter(
    (msg) => msg.priority === "high" && msg.status !== "archived"
  ).length;
  const archived = messages.filter((msg) => msg.status === "archived").length;
  const total = messages.length;

  return {
    unread,
    actionRequired,
    highPriority,
    archived,
    total,
  };
};
