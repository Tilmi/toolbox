import { RecentTask } from "./recentTask";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Card8() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Task</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentTask />
        </CardContent>
      </Card>
    </div>
  );
}
