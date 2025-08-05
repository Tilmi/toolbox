// import * as React from "react";
// import { Dialog } from "@/components/ui/dialog"; // Assuming the Dialog component here
// import { Button } from "@/components/ui/button";

// type ViewMemberDialogProps = {
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
// };

// export function ViewMemberDialog({ member, onClose }: ViewMemberDialogProps) {
//   return (
//     <Dialog open={true}>
//       <div className="p-6">
//         <h2 className="text-xl font-semibold">View Member</h2>
//         <div className="mt-4">
//           <div className="flex items-center space-x-4">
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
//               <div className="text-sm">{member.department}</div>
//               <div className="text-sm">{member.role}</div>
//               <div className="text-sm">{member.status}</div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 flex justify-end">
//           <Button variant="outline" onClick={onClose}>
//             Close
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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShieldUser, User } from "lucide-react";

type ViewMemberDialogProps = {
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

export function ViewMemberDialog({ member, onClose }: ViewMemberDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View Member Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={member.avatar}
                alt="Member Avatar"
                className="object-cover"
              />
              <AvatarFallback className="text-lg">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Department
              </label>
              <div className="mt-1">
                <Badge
                  variant="outline"
                  className={
                    member.department === "Technology and Information"
                      ? "bg-blue-100 text-blue-800 border-blue-200"
                      : member.department === "Riset"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : member.department === "Maintenance Machine"
                      ? "bg-red-100 text-red-800 border-red-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  }
                >
                  {member.department}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Role
              </label>
              <div className="mt-1">
                <Badge
                  variant="outline"
                  className={
                    member.role === "admin"
                      ? "bg-red-100 text-red-800 border-red-200"
                      : "bg-green-100 text-green-800 border-green-200"
                  }
                >
                  {member.role === "admin" ? (
                    <>
                      <ShieldUser className=" h-3 w-3" />
                      Admin
                    </>
                  ) : (
                    <>
                      <User className=" h-3 w-3" />
                      Employee
                    </>
                  )}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Status
              </label>
              <div className="mt-1">
                <Badge
                  variant="outline"
                  className={
                    member.status === "active"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  }
                >
                  {member.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
