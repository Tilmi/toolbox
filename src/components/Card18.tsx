import { Building, CircleCheck } from "lucide-react";
import { Card, CardDescription, CardHeader } from "./ui/card";

export function Card18() {
  return (
    <div>
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Building
            size={45}
            className="rounded-lg bg-yellow-500/30 border-1 border-yellow-500/50 p-2 text-yellow-500 shadow-lg"
          />
          <div className="flex flex-col">
            {/* <CardTitle>Total Project</CardTitle> */}
            <CardDescription>Total Departements</CardDescription>
            <p className="text-2xl font-semibold">3</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
