export interface Assignee {
  id: number;
  name: string;
  avatar: string;
}

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: "To do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  assignees: Assignee[];
  comments: number;
  links: number;
  attachments: number;
  label: string;
  labelColor: "orange" | "blue" | "green" | "pink";
}

export interface Column {
  id: string;
  title: string;
  color: "orange" | "blue" | "purple";
}

export interface AddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    task: Omit<TodoItem, "id" | "comments" | "links" | "attachments">
  ) => void;
  defaultStatus?: string;
}

export interface TaskCardProps {
  task: TodoItem;
  onDragStart: (e: React.DragEvent, task: TodoItem) => void;
}

// Label options for the form
export const labelOptions = [
  { label: "Not Started", color: "blue" as const },
  { label: "In Research", color: "orange" as const },
  { label: "On Track", color: "pink" as const },
  { label: "Complete", color: "green" as const },
];

export const mockTodoData: TodoItem[] = [
  {
    id: 1,
    title: "Writing an Article on AI Technology",
    description:
      "Write a 1000-word article discussing the latest advances in AI technology.",
    status: "To do",
    priority: "Low",
    dueDate: "25 Mar 2023",
    assignees: [
      {
        id: 1,
        name: "John",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: 2,
        name: "Mia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      },
    ],
    comments: 5,
    links: 2,
    attachments: 3,
    label: "Not Started",
    labelColor: "blue",
  },
  {
    id: 2,
    title: "Website Design for E-commerce Platform",
    description:
      "Design the layout for an e-commerce platform, ensuring user-friendly navigation.",
    status: "To do",
    priority: "Medium",
    dueDate: "28 Mar 2023",
    assignees: [
      {
        id: 1,
        name: "John",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: 2,
        name: "Mia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      },
    ],
    comments: 12,
    links: 1,
    attachments: 2,
    label: "In Research",
    labelColor: "orange",
  },
  {
    id: 3,
    title: "Social Media Campaign Planning",
    description: "Develop a social media campaign for the new product launch.",
    status: "In Progress",
    priority: "High",
    dueDate: "30 Mar 2023",
    assignees: [
      {
        id: 1,
        name: "John",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: 2,
        name: "Mia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      },
    ],
    comments: 8,
    links: 1,
    attachments: 2,
    label: "In Research",
    labelColor: "orange",
  },
  {
    id: 4,
    title: "Video Editing for Marketing Promo",
    description: "Edit a 3-minute promotional video for a marketing campaign.",
    status: "In Progress",
    priority: "Low",
    dueDate: "02 Apr 2023",
    assignees: [
      {
        id: 1,
        name: "John",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: 2,
        name: "Mia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      },
    ],
    comments: 3,
    links: 0,
    attachments: 2,
    label: "On Track",
    labelColor: "pink",
  },
  {
    id: 5,
    title: "Customer Survey Analysis",
    description:
      "Analyze data from a recent customer survey and compile insights.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "05 Apr 2023",
    assignees: [
      {
        id: 1,
        name: "John",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: 2,
        name: "Mia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      },
    ],
    comments: 0,
    links: 0,
    attachments: 0,
    label: "On Track",
    labelColor: "pink",
  },
  {
    id: 6,
    title: "Mobile App Bug Fixing",
    description:
      "Identify and fix bugs in the mobile app, ensuring smooth functionality.",
    status: "Done",
    priority: "High",
    dueDate: "07 Apr 2023",
    assignees: [
      {
        id: 1,
        name: "John",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: 2,
        name: "Mia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      },
    ],
    comments: 6,
    links: 0,
    attachments: 1,
    label: "Complete",
    labelColor: "green",
  },
  {
    id: 7,
    title: "Content Creation for Blog",
    description:
      "Write three blog posts (500-600 words each) on topics related to the industry.",
    status: "Done",
    priority: "Low",
    dueDate: "10 Apr 2023",
    assignees: [
      {
        id: 1,
        name: "John",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: 2,
        name: "Mia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      },
    ],
    comments: 4,
    links: 2,
    attachments: 0,
    label: "Not Started",
    labelColor: "blue",
  },
  {
    id: 8,
    title: "Client Presentation Design",
    description:
      "Design a PowerPoint presentation for a client pitch, including visuals and content.",
    status: "Done",
    priority: "Medium",
    dueDate: "12 Apr 2023",
    assignees: [
      {
        id: 1,
        name: "John",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: 2,
        name: "Mia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      },
    ],
    comments: 0,
    links: 0,
    attachments: 0,
    label: "Not Started",
    labelColor: "blue",
  },
];

export const columns: Column[] = [
  { id: "To do", title: "To do", color: "orange" },
  { id: "In Progress", title: "In Progress", color: "blue" },
  { id: "Done", title: "Done", color: "purple" },
];

export const views = ["Board", "List"];

export const teamMembers = [
  {
    id: 1,
    name: "John",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: 2,
    name: "Mia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
  },
  {
    id: 3,
    name: "Nina",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
  },
  {
    id: 4,
    name: "Bee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bee",
  },
];
