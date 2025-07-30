import { Folder } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function Card10() {
  return (
    <div>
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Folder
            size={45}
            className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
          />
          <div className="flex flex-col">
            {/* <CardTitle>Total Project</CardTitle> */}
            <CardDescription>Total Project</CardDescription>
            <p className="text-2xl font-semibold">1</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
