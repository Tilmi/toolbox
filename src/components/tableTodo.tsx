import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import todos from "@/lib/dataWeek";
import { cn } from "@/lib/utils"; // pastikan util `cn` tersedia

export function TableTodo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Task Name</TableHead>
          <TableHead>Project</TableHead>
          <TableHead className="text-right">Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
              <span>{todo.name}</span>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  todo.priority === "high" && "bg-red-500/30 text-red-500",
                  todo.priority === "normal" && "bg-blue-500/30 text-blue-500",
                  todo.priority === "low" && "bg-gray-500/30 text-gray-500"
                )}
              >
                {todo.priority}
              </span>
            </TableCell>
            <TableCell>{todo.project}</TableCell>
            <TableCell className="text-right">{todo.dueDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
