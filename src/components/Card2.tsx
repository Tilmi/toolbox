import { FilePlus } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function Card2() {
  return (
    <div>
      <Card>
        <CardHeader className="flex items-center gap-4">
          <FilePlus
            size={45}
            className="rounded-lg bg-green-500/30 border-1 border-green-500/50 p-2 text-green-500 shadow-lg"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>Create Task</CardTitle>
            <CardDescription>Create a new task</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
