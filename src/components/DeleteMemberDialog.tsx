// import * as React from "react";
// import { Dialog } from "@/components/ui/dialog"; // Assuming your Dialog component
// import { Button } from "@/components/ui/button";

// type DeleteMemberDialogProps = {
//   member: {
//     id: string;
//     name: string;
//     email: string;
//     department: string;
//     role: string;
//     status: string;
//     avatar: string;
//   };
//   onClose: () => void; // Function to close the dialog
//   onDelete: () => void; // Function to delete the member
// };

// export function DeleteMemberDialog({
//   member,
//   onClose,
//   onDelete,
// }: DeleteMemberDialogProps) {
//   return (
//     <Dialog open={true}>
//       {" "}
//       {/* Assuming Dialog uses 'open' to control visibility */}
//       <div className="p-6">
//         <h2 className="text-xl font-semibold text-red-600">Delete Member</h2>
//         <div className="mt-4">
//           <p>Are you sure you want to delete the member?</p>
//           <div className="flex items-center space-x-4 mt-4">
//             <img
//               src={member.avatar}
//               alt="Avatar"
//               className="h-12 w-12 rounded-full"
//             />
//             <div>
//               <div className="font-medium text-lg">{member.name}</div>
//               <div className="text-sm text-muted-foreground">
//                 {member.email}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 flex justify-end space-x-4">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button variant="destructive" onClick={onDelete}>
//             Delete
//           </Button>
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AlertTriangle } from "lucide-react";

type DeleteMemberDialogProps = {
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
  onDelete: () => void;
};

export function DeleteMemberDialog({
  member,
  onClose,
  onDelete,
}: DeleteMemberDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <DialogTitle className="text-red-600">Delete Member</DialogTitle>
          </div>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            member from the system.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this member?
          </p>

          <div className="flex items-center space-x-4 p-4  border border-muted-foreground rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={member.avatar}
                alt="Member Avatar"
                className="object-cover"
              />
              <AvatarFallback>
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-muted-foreground">
                {member.email}
              </div>
              <div className="text-sm text-muted-foreground">
                {member.department}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete Member
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
