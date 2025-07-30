import { TableReview } from "./tableReview";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Card6() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>To do Review</CardTitle>
        </CardHeader>
        <CardContent>
          <TableReview />
        </CardContent>
      </Card>
    </div>
  );
}
