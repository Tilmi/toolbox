"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import todos from "@/lib/dataWeek";
import { cn } from "@/lib/utils";
import { Ellipsis, SquarePen, Trash2 } from "lucide-react";

export function RecentTask() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Task Name</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{todo.name}</TableCell>
            <TableCell>{todo.project}</TableCell>
            <TableCell>
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
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis size={15} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <SquarePen className=" h-[1.2rem] w-[1.2rem] mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    <Trash2 className=" h-[1.2rem] w-[1.2rem] mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
