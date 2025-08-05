import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Camera, Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <Separator />
        <div className="flex flex-row gap-5">
          <Image src="/logo.svg" alt="logo" width={90} height={90}></Image>
          <Button
            variant={"secondary"}
            className="absolute mx-16 my-3 rounded-full cursor-pointer"
            size={"icon"}
          >
            <Camera size={20} />
          </Button>
          <div className="flex flex-col py-6">
            <h1 className="font-medium mb-1">John Doe</h1>
            <Badge variant={"outline"}>Admin</Badge>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-col">
            <Label htmlFor="name" className="mb-2">
              Username
            </Label>
            <Input id="name" placeholder="Pupuk Kujang" />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="Phone" className="mb-2">
              Phone Number
            </Label>
            <Input id="number" placeholder="(0123) 12345678" />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input id="email" placeholder="pupukkujang@gmail" disabled />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
