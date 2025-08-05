import { SecurityDialog } from "./SecurityDialog";
import { SwitchDemo } from "./SwitchSettings";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

export function Security() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account & Security</CardTitle>
        <Separator />
        <div className="flex flex-row items-center mt-2 justify-between">
          <p className="font-medium">Password </p>
          <SecurityDialog />
        </div>
        <div className="flex flex-row  items-center justify-between">
          <p className="font-medium">Manage Logged Devices:</p>
          <p className="text-blue-400 text-sm">View all active logins</p>
        </div>
        <div className="flex flex-row  items-center justify-between">
          <div className="flex flex-col">
            <p className="font-medium">Two-Factor Authentication (2FA)</p>
            <p className="text-sm text-muted-foreground italic">
              Extra security via OTP or SMS
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
      </CardHeader>
    </Card>
  );
}
