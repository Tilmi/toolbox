export type Member = {
  id: string;
  name: string;
  email: string;
  department: "Technology and Information" | "Maintenance Machine" | "Riset";
  role: "admin" | "Employees";
  status: "active" | "inactive";
  avatar: string;
};

export const data: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Technology and Information",
    role: "admin",
    status: "active",
    avatar: "/jhon.svg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Maintenance Machine",
    role: "Employees",
    status: "inactive",
    avatar: "/mia.svg",
  },
  {
    id: "3",
    name: "Bee Pérez",
    email: "bee.perez@example.com",
    department: "Riset",
    role: "Employees",
    status: "active",
    avatar: "/bee.svg",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "Technology and Information",
    role: "Employees",
    status: "active",
    avatar: "/nina.svg",
  },
  {
    id: "5",
    name: "Bryan Johnson",
    email: "bryan.johnson@example.com",
    department: "Maintenance Machine",
    role: "Employees",
    status: "active",
    avatar: "/bryan.svg",
  },
  {
    id: "6",
    name: "Jane Wilson",
    email: "jane.wilson@example.com",
    department: "Riset",
    role: "Employees",
    status: "inactive",
    avatar: "/jane.svg",
  },
];
