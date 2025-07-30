import { FileCheck2 } from "lucide-react";
import { Card, CardDescription, CardHeader } from "./ui/card";

export function Card11() {
  return (
    <div>
      <Card>
        <CardHeader className="flex items-center gap-4">
          <FileCheck2
            size={45}
            className="rounded-lg bg-green-500/30 border-1 border-green-500/50 p-2 text-green-500 shadow-lg"
          />
          <div className="flex flex-col">
            {/* <CardTitle>Total Project</CardTitle> */}
            <CardDescription>Completed Task</CardDescription>
            <p className="text-2xl font-semibold">7</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
