import { Notification } from "@/components/Notification";
import { ProfileSettings } from "@/components/profileSettings";
import { Security } from "@/components/Security";

const Settings = () => {
  return (
    <div className="grid">
      <h1 className="text-xl font-medium mb-2">Settings</h1>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
        <ProfileSettings />
        <Security />
        <Notification />
      </div>
    </div>
  );
};

export default Settings;
