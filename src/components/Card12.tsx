import { Files, Loader } from "lucide-react";
import { Card, CardDescription, CardHeader } from "./ui/card";
import { Progress } from "@/components/ui/progress";

export function Card12() {
  return (
    <div>
      <Card>
        <CardHeader className="flex items-center gap-4 ">
          <Files
            size={45}
            className="rounded-lg bg-yellow-500/30 border-1 border-yellow-500/50 p-2 text-yellow-500 shadow-lg"
          />
          <div className="flex flex-col">
            {/* <CardTitle>Total Project</CardTitle> */}
            <CardDescription>Total Task</CardDescription>
            <div className="flex flex-row items-center gap-2">
              <p className="text-2xl font-semibold">7</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
