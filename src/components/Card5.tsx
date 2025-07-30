import { TableTodo } from "./tableTodo";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Card5() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>To do this week</CardTitle>
        </CardHeader>
        <CardContent>
          <TableTodo />
        </CardContent>
      </Card>
    </div>
  );
}
