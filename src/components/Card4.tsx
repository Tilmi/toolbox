import { CalendarPlus } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function Card4() {
  return (
    <div>
      <Card>
        <CardHeader className="flex items-center gap-4">
          <CalendarPlus
            size={45}
            className="rounded-lg bg-purple-500/30 border-1 border-purple-500/50 p-2 text-purple-500 shadow-lg"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>Create Meeting</CardTitle>
            <CardDescription>Create a new meeting</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
