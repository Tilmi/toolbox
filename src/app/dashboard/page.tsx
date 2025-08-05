import { Card1 } from "@/components/Card1";
import { Card2 } from "@/components/Card2";
import { Card3 } from "@/components/Card3";
import { Card4 } from "@/components/Card4";
import { Card5 } from "@/components/Card5";
import { Card6 } from "@/components/Card6";
import { Card7 } from "@/components/Card7";
import { Card8 } from "@/components/Card8";
import { Card9 } from "@/components/Card9";

export default function Dashboard() {
  return (
    <div className="grid p-2">
      <h1 className="px-1 text-xl font-medium mb-2">Dashboard</h1>
      <main className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div>
          <Card1 />
        </div>
        <div>
          <Card2 />
        </div>
        <div>
          <Card3 />
        </div>
        <div>
          <Card4 />
        </div>
        <div className="lg:col-span-2 md:col-span-2">
          <Card5 />
        </div>
        <div className="lg:col-span-2 md:col-span-2">
          <Card6 />
        </div>
        <div className="lg:col-span-2 md:col-span-2">
          <Card8 />
        </div>
        <div className="lg:col-span-1 md:col-span-2">
          <Card7 />
        </div>
        <div className="lg:col-span-1 md:col-span-2">
          <Card9 />
        </div>
      </main>
    </div>
  );
}
