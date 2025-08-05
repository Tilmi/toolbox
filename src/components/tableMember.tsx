"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Eye, ShieldUser, SquarePen, Trash2, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { data, Member } from "@/lib/dataMember";
import { ViewMemberDialog } from "./ViewMemberDialog";
import { EditMemberDialog } from "./EditMemberDialog";
import { DeleteMemberDialog } from "./DeleteMemberDialog";
import { DialogMember } from "./dialogMember";

// Badge components for department, role, and status
const DepartmentBadge = ({ department }: { department: string }) => {
  const badgeColors = {
    "Technology and Information": "bg-blue-100 text-blue-800 border-blue-200",
    "Maintenance Machine": "bg-red-100 text-red-800 border-red-200",
    Riset: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <Badge
      variant="outline"
      className={badgeColors[department as keyof typeof badgeColors]}
    >
      {department}
    </Badge>
  );
};

const RoleBadge = ({ role }: { role: string }) => {
  if (role === "admin") {
    return (
      <Badge
        variant="outline"
        className="bg-red-100 text-red-800 border-red-200"
      >
        <ShieldUser className="w-3 h-3" />
        Admin
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="bg-green-100 text-green-800 border-green-200"
    >
      <User className="w-3 h-3" />
      Employee
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "active") {
    return (
      <Badge
        variant="outline"
        className="bg-green-100 text-green-800 border-green-200"
      >
        <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
        Active
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="bg-gray-100 text-gray-800 border-gray-200"
    >
      <div className="w-2 h-2 bg-gray-600 rounded-full mr-1"></div>
      Inactive
    </Badge>
  );
};

export function TableMember() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(
    null
  );
  const [dialogType, setDialogType] = React.useState<
    "view" | "edit" | "delete" | null
  >(null);

  // Handlers for view, edit, and delete - pindahkan ke dalam komponen
  const handleView = (member: Member) => {
    setSelectedMember(member);
    setDialogType("view");
  };

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setDialogType("edit");
  };

  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setDialogType("delete");
  };

  const handleCloseDialog = () => {
    setDialogType(null);
  };

  // Pindahkan columns definition ke dalam komponen agar bisa akses handler functions
  const columns: ColumnDef<Member>[] = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value: boolean) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "member",
        accessorFn: (row) => row.name,
        header: "Members",
        cell: ({ row }) => {
          const member = row.original;
          return (
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
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
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => {
          const department = row.getValue("department") as string;
          return <DepartmentBadge department={department} />;
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.getValue("role") as string;
          return <RoleBadge role={role} />;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return <StatusBadge status={status} />;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const member = row.original;
          return (
            <div className="flex space-x-2">
              <Button
                onClick={() => handleView(member)}
                variant="ghost"
                size="sm"
              >
                <Eye className=" h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleEdit(member)}
                variant="ghost"
                size="sm"
              >
                <SquarePen className=" h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleDelete(member)}
                variant="ghost"
                size="sm"
              >
                <Trash2 className=" h-4 w-4 text-red-500" />
              </Button>
            </div>
          );
        },
      },
    ],
    [handleView, handleEdit, handleDelete]
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 gap-2">
        <Input
          placeholder="Filter members..."
          value={(table.getColumn("member")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("member")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DialogMember />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Show Dialogs based on dialogType */}
      {dialogType === "view" && selectedMember && (
        <ViewMemberDialog member={selectedMember} onClose={handleCloseDialog} />
      )}
      {dialogType === "edit" && selectedMember && (
        <EditMemberDialog member={selectedMember} onClose={handleCloseDialog} />
      )}
      {dialogType === "delete" && selectedMember && (
        <DeleteMemberDialog
          member={selectedMember}
          onClose={handleCloseDialog}
          onDelete={() => {
            // Handle delete operation (e.g., API call to delete)
            console.log(`Deleted member ${selectedMember.name}`);
            handleCloseDialog();
          }}
        />
      )}

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
