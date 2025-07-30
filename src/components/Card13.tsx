import { FileCheck2, FileClock } from "lucide-react";
import { Card, CardDescription, CardHeader } from "./ui/card";

export function Card13() {
  return (
    <div>
      <Card>
        <CardHeader className="flex items-center gap-4">
          <FileClock
            size={45}
            className="rounded-lg bg-red-500/30 border-1 border-red-500/50 p-2 text-red-500 shadow-lg"
          />
          <div className="flex flex-col">
            {/* <CardTitle>Total Project</CardTitle> */}
            <CardDescription>Pending Task</CardDescription>
            <p className="text-2xl font-semibold">3</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
