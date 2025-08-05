import { FileInput, TrendingUp, UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

export function Card3() {
  return (
    <div>
      <Link href="/teams">
        <Card>
          <CardHeader className="flex items-center gap-4">
            <UserPlus
              size={45}
              className="rounded-lg bg-red-500/30 border-1 border-red-500/50 p-2 text-red-500 shadow-lg"
            />
            <div className="flex flex-col gap-1">
              <CardTitle>Invite Team</CardTitle>
              <CardDescription>Invite users to team</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
