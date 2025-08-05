import { SwitchDemo } from "./SwitchSettings";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export function Notification() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <Separator />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <p className="font-medium mt-2">Dekstop Notifications</p>
            <p className="text-sm text-muted-foreground italic">
              Get desktop notifications when your organization needs your
              attention
            </p>
          </div>
          <SwitchDemo />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <p className="font-medium mt-2">Email Notifications</p>
            <p className="text-sm text-muted-foreground italic">
              Receive emails whenever your organization needs your attention
            </p>
          </div>
          <SwitchDemo />
        </div>
        <div className="flex flex-row  items-center justify-between">
          <div className="flex flex-col">
            <p className="font-medium">Login Alerts</p>
            <p className="text-sm text-muted-foreground italic">
              Notify on new or unfamiliar logins
            </p>
          </div>
          <SwitchDemo />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium">Notify When</p>
          <div className="flex flex-row items-center gap-2">
            <Checkbox id="updates" />
            <Label htmlFor="updates">Daily Updates</Label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Checkbox id="maintenance" />
            <Label htmlFor="maintenance">Maintenance</Label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Checkbox id="announcment" />
            <Label htmlFor="announcment">Announcment fully read</Label>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
