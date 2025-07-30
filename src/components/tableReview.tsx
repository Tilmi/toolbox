"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import originalTodos from "@/lib/dataWeek";
import { useState } from "react";

export function TableReview() {
  const [todos, setTodos] = useState(originalTodos);

  const handleCheck = (index: number) => {
    const updated = [...todos];
    updated[index].reviewed = !updated[index].reviewed;
    setTodos(updated);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[280px]">Task Name</TableHead>
          <TableHead>Project</TableHead>
          <TableHead className="text-right">Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
              <Checkbox
                checked={todo.reviewed}
                onCheckedChange={() => handleCheck(index)}
              />
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
