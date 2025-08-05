import { Users } from "lucide-react";
import { Card, CardDescription, CardHeader } from "./ui/card";

export function Card15() {
  return (
    <div>
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Users
            size={45}
            className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
          />
          <div className="flex flex-col">
            {/* <CardTitle>Total Project</CardTitle> */}
            <CardDescription>Total Members</CardDescription>
            <p className="text-2xl font-semibold">15</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
