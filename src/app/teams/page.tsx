import { Card15 } from "@/components/Card15";
import { Card16 } from "@/components/Card16";
import { Card17 } from "@/components/Card17";
import { Card18 } from "@/components/Card18";
import { TableMember } from "@/components/tableMember";

export default function Teams() {
  return (
    <div className="grid p-2">
      <h1 className="px-1 text-xl font-medium mb-2">Teams</h1>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
          <Card15 />
        </div>
        <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
          <Card16 />
        </div>
        <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
          <Card17 />
        </div>
        <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
          <Card18 />
        </div>
        <div className="lg:col-span-4 md:col-span-2 sm:col-span-1">
          <TableMember />
        </div>
      </main>
    </div>
  );
}
