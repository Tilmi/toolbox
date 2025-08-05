import { FolderPlus } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

export function Card1() {
  return (
    <div>
      <Link href="/mainProject">
        <Card>
          <CardHeader className="flex items-center gap-4">
            <FolderPlus
              size={45}
              className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
            />
            <div className="flex flex-col gap-1">
              <CardTitle>Create Project</CardTitle>
              <CardDescription>Create a new project</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
