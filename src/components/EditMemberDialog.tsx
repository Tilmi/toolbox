// import * as React from "react";
// import { Dialog } from "@/components/ui/dialog"; // Dialog component
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"; // Input component

// type EditMemberDialogProps = {
//   member: {
//     id: string;
//     name: string;
//     email: string;
//     department: string;
//     role: string;
//     status: string;
//     avatar: string;
//   };
//   onClose: () => void; // Method to handle closing the dialog
// };

// export function EditMemberDialog({ member, onClose }: EditMemberDialogProps) {
//   const [editedMember, setEditedMember] = React.useState(member);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditedMember((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     // Save the edited member (could be an API call here)
//     console.log("Saving member:", editedMember);
//     onClose(); // Close the dialog after saving
//   };

//   return (
//     <Dialog open={true}>
//       {" "}
//       {/* Assuming the Dialog accepts `open` to control visibility */}
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">Edit Member</h2>
//         <div className="mt-4">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium">
//                 Name
//               </label>
//               <Input
//                 id="name"
//                 value={editedMember.name}
//                 name="name"
//                 onChange={handleChange}
//                 className="mt-1"
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium">
//                 Email
//               </label>
//               <Input
//                 id="email"
//                 value={editedMember.email}
//                 name="email"
//                 onChange={handleChange}
//                 className="mt-1"
//               />
//             </div>
//             <div>
//               <label htmlFor="department" className="block text-sm font-medium">
//                 Department
//               </label>
//               <Input
//                 id="department"
//                 value={editedMember.department}
//                 name="department"
//                 onChange={handleChange}
//                 className="mt-1"
//               />
//             </div>
//             <div>
//               <label htmlFor="role" className="block text-sm font-medium">
//                 Role
//               </label>
//               <Input
//                 id="role"
//                 value={editedMember.role}
//                 name="role"
//                 onChange={handleChange}
//                 className="mt-1"
//               />
//             </div>
//             <div>
//               <label htmlFor="status" className="block text-sm font-medium">
//                 Status
//               </label>
//               <Input
//                 id="status"
//                 value={editedMember.status}
//                 name="status"
//                 onChange={handleChange}
//                 className="mt-1"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 flex justify-end space-x-4">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSave}>Save</Button>
//         </div>
//       </div>
//     </Dialog>
//   );
// }
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EditMemberDialogProps = {
  member: {
    id: string;
    name: string;
    email: string;
    department: string;
    role: string;
    status: string;
    avatar: string;
  };
  onClose: () => void;
};

export function EditMemberDialog({ member, onClose }: EditMemberDialogProps) {
  const [editedMember, setEditedMember] = React.useState(member);

  const handleChange = (field: string, value: string) => {
    setEditedMember((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Save the edited member (could be an API call here)
    console.log("Saving member:", editedMember);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={editedMember.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={editedMember.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={editedMember.department}
              onValueChange={(value) => handleChange("department", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technology and Information">
                  Technology and Information
                </SelectItem>
                <SelectItem value="Maintenance Machine">
                  Maintenance Machine
                </SelectItem>
                <SelectItem value="Riset">Riset</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={editedMember.role}
              onValueChange={(value) => handleChange("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={editedMember.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
