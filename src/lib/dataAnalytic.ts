// lib/analytics-data.ts
export interface dataAnalytics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completionRate: number;
  avgCompletionTime: number;
}

export interface ProjectAnalytics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  onTrackProjects: number;
  delayedProjects: number;
  projectCompletionRate: number;
}

export interface MeetingAnalytics {
  totalMeetings: number;
  thisWeekMeetings: number;
  avgMeetingDuration: number;
  attendanceRate: number;
  actionItemsCreated: number;
  actionItemsCompleted: number;
}

export interface TeamMember {
  id: string;
  name: string;
  tasksCompleted: number;
  productivity: number;
  avatar: string;
}

export interface ActivityData {
  date: string;
  tasks: number;
  meetings: number;
  projects: number;
}

// Mock data untuk demo
export const mockTaskAnalytics: dataAnalytics = {
  totalTasks: 156,
  completedTasks: 124,
  pendingTasks: 28,
  overdueTasks: 4,
  completionRate: 79.5,
  avgCompletionTime: 2.3,
};

export const mockProjectAnalytics: ProjectAnalytics = {
  totalProjects: 12,
  activeProjects: 8,
  completedProjects: 4,
  onTrackProjects: 6,
  delayedProjects: 2,
  projectCompletionRate: 75.0,
};

export const mockMeetingAnalytics: MeetingAnalytics = {
  totalMeetings: 48,
  thisWeekMeetings: 12,
  avgMeetingDuration: 45,
  attendanceRate: 87.5,
  actionItemsCreated: 89,
  actionItemsCompleted: 67,
};

export const mockTopPerformers: TeamMember[] = [
  {
    id: "1",
    name: "Ahmad Rizki",
    tasksCompleted: 23,
    productivity: 95,
    avatar: "AR",
  },
  {
    id: "2",
    name: "Sari Dewi",
    tasksCompleted: 19,
    productivity: 88,
    avatar: "SD",
  },
  {
    id: "3",
    name: "Budi Santoso",
    tasksCompleted: 17,
    productivity: 82,
    avatar: "BS",
  },
];

export const mockActivityData: ActivityData[] = [
  { date: "2024-07-26", tasks: 12, meetings: 3, projects: 2 },
  { date: "2024-07-27", tasks: 8, meetings: 2, projects: 1 },
  { date: "2024-07-28", tasks: 15, meetings: 1, projects: 3 },
  { date: "2024-07-29", tasks: 10, meetings: 4, projects: 2 },
  { date: "2024-07-30", tasks: 18, meetings: 2, projects: 1 },
  { date: "2024-07-31", tasks: 14, meetings: 3, projects: 2 },
  { date: "2024-08-01", tasks: 16, meetings: 5, projects: 3 },
];
