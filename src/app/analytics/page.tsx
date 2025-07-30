import { Card10 } from "@/components/Card10";
import { Card11 } from "@/components/Card11";
import { Card12 } from "@/components/Card12";
import { Card13 } from "@/components/Card13";
import ChartTaskStatusPie from "@/components/chartStatus";
import ChartTaskCompleted from "@/components/chartTask";

export default function Analytics() {
  return (
    <div className="grid">
      <h1 className="px-1 text-xl font-medium mb-2">Analytics</h1>
      <main className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div>
          <Card10 />
        </div>
        <div>
          <Card11 />
        </div>
        <div>
          <Card12 />
        </div>
        <div>
          <Card13 />
        </div>
        <div className="lg:col-span-2 md:col-span-2">
          <ChartTaskCompleted />
        </div>
        <div className="lg:col-span-2 md:col-span-2">
          <ChartTaskStatusPie />
        </div>
      </main>
    </div>
  );
}
