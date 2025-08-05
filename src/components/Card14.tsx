// "use client";

// import React, { useState } from "react";
// import {
//   Plus,
//   Search,
//   Filter,
//   Users,
//   Share2,
//   MoreHorizontal,
//   Calendar,
//   MessageCircle,
//   Link2,
//   FileText,
//   X,
//   SquarePen,
//   Trash2,
// } from "lucide-react";
// import {
//   TodoItem,
//   Column,
//   TaskCardProps,
//   AddTaskDialogProps,
//   mockTodoData,
//   columns,
//   views,
//   teamMembers,
//   labelOptions,
// } from "../lib/TodoItem";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";

// // Task Card Component
// const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "High":
//         return "text-red-500";
//       case "Medium":
//         return "text-yellow-500";
//       case "Low":
//         return "text-blue-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   const getLabelColor = (color: string) => {
//     switch (color) {
//       case "orange":
//         return "bg-orange-100 text-orange-800";
//       case "blue":
//         return "bg-blue-100 text-blue-800";
//       case "green":
//         return "bg-green-100 text-green-800";
//       case "pink":
//         return "bg-pink-100 text-pink-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div
//       className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-move mb-3"
//       draggable
//       onDragStart={(e) => onDragStart(e, task)}
//     >
//       <div className="flex items-start justify-between mb-2">
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(
//             task.labelColor
//           )}`}
//         >
//           {task.label}
//         </span>
//         {/* Dropdown Menu */}
//         <DropdownMenu>
//           <DropdownMenuTrigger>
//             <button className="text-gray-400 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300">
//               <MoreHorizontal className="w-4 h-4" />
//             </button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent className="bg-white dark:bg-gray-800 rounded-md shadow-lg">
//             <DropdownMenuItem onClick={() => console.log("Edit Task", task.id)}>
//               <SquarePen className="w-4 h-4 mr-2" />
//               Edit
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               variant="destructive"
//               onClick={() => console.log("Delete Task", task.id)}
//             >
//               <Trash2 className="w-4 h-4 mr-2" />
//               Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm md:text-base line-clamp-2">
//         {task.title}
//       </h3>

//       <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
//         {task.description}
//       </p>

//       <div className="flex items-center justify-between mb-3">
//         <span className="text-xs text-gray-500 dark:text-gray-400">
//           Assignees :
//         </span>
//         <div className="flex -space-x-1">
//           {task.assignees.slice(0, 3).map((assignee) => (
//             <img
//               key={assignee.id}
//               className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white dark:border-gray-800 object-cover"
//               src={assignee.avatar}
//               alt={assignee.name}
//             />
//           ))}
//           {task.assignees.length > 3 && (
//             <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
//               +{task.assignees.length - 3}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex items-center justify-between text-xs">
//         <div className="flex items-center text-gray-500 dark:text-gray-400">
//           <Calendar className="w-3 h-3 mr-1" />
//           <span className="hidden sm:inline">{task.dueDate}</span>
//           <span className="sm:hidden">
//             {task.dueDate.split(" ").slice(0, 2).join(" ")}
//           </span>
//         </div>
//         <span className={`font-medium ${getPriorityColor(task.priority)}`}>
//           {task.priority}
//         </span>
//       </div>

//       <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
//         <div className="flex items-center space-x-2 md:space-x-3 text-xs text-gray-500 dark:text-gray-400">
//           <div className="flex items-center">
//             <MessageCircle className="w-3 h-3 mr-1" />
//             <span className="hidden sm:inline">{task.comments} Comments</span>
//             <span className="sm:hidden">{task.comments}</span>
//           </div>
//           <div className="flex items-center">
//             <Link2 className="w-3 h-3 mr-1" />
//             <span className="hidden sm:inline">{task.links} Links</span>
//             <span className="sm:hidden">{task.links}</span>
//           </div>
//           <div className="flex items-center">
//             <FileText className="w-3 h-3 mr-1" />
//             <span className="hidden sm:inline">
//               {task.attachments}/{task.attachments + 1}
//             </span>
//             <span className="sm:hidden">
//               {task.attachments}/{task.attachments + 1}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Add Task Dialog Component
// const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   defaultStatus = "To do",
// }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     status: defaultStatus as TodoItem["status"],
//     priority: "Medium" as TodoItem["priority"],
//     dueDate: "",
//     label: "Not Started",
//     labelColor: "blue" as TodoItem["labelColor"],
//     assignees: [] as number[],
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.title.trim()) return;

//     const selectedAssignees = teamMembers.filter((member) =>
//       formData.assignees.includes(member.id)
//     );

//     // Format date to match existing format
//     let formattedDate = formData.dueDate;
//     if (formData.dueDate) {
//       const date = new Date(formData.dueDate);
//       const months = [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ];
//       formattedDate = `${date.getDate().toString().padStart(2, "0")} ${
//         months[date.getMonth()]
//       } ${date.getFullYear()}`;
//     } else {
//       const today = new Date();
//       const months = [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ];
//       formattedDate = `${today.getDate().toString().padStart(2, "0")} ${
//         months[today.getMonth()]
//       } ${today.getFullYear()}`;
//     }

//     onSubmit({
//       title: formData.title,
//       description: formData.description,
//       status: formData.status,
//       priority: formData.priority,
//       dueDate: formattedDate,
//       label: formData.label,
//       labelColor: formData.labelColor,
//       assignees: selectedAssignees,
//     });

//     // Reset form
//     setFormData({
//       title: "",
//       description: "",
//       status: defaultStatus as TodoItem["status"],
//       priority: "Medium",
//       dueDate: "",
//       label: "Not Started",
//       labelColor: "blue",
//       assignees: [],
//     });
//     onClose();
//   };

//   const toggleAssignee = (memberId: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       assignees: prev.assignees.includes(memberId)
//         ? prev.assignees.filter((id) => id !== memberId)
//         : [...prev.assignees, memberId],
//     }));
//   };

//   // Update default status when it changes
//   React.useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       status: defaultStatus as TodoItem["status"],
//     }));
//   }, [defaultStatus]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-500/30 flex items-center justify-center z-50 p-4">
//       <div className="bg-white dark:bg-black rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//             Add New Task
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Task Title *
//             </label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, title: e.target.value }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
//               placeholder="Enter task title"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Description
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   description: e.target.value,
//                 }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100 resize-none"
//               rows={3}
//               placeholder="Enter task description"
//             />
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Status
//             </label>
//             <select
//               value={formData.status}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   status: e.target.value as TodoItem["status"],
//                 }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
//             >
//               <option value="To do">To do</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Done">Done</option>
//             </select>
//           </div>

//           {/* Priority */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Priority
//             </label>
//             <select
//               value={formData.priority}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   priority: e.target.value as TodoItem["priority"],
//                 }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>

//           {/* Due Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Due Date
//             </label>
//             <input
//               type="date"
//               value={formData.dueDate}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
//               }
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
//             />
//           </div>

//           {/* Label */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Label
//             </label>
//             <div className="grid grid-cols-2 gap-2">
//               {labelOptions.map((item) => (
//                 <button
//                   key={item.label}
//                   type="button"
//                   onClick={() =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       label: item.label,
//                       labelColor: item.color,
//                     }))
//                   }
//                   className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
//                     formData.label === item.label
//                       ? `border-${item.color}-500 bg-${item.color}-100 text-${item.color}-800`
//                       : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400"
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Assignees */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Assignees
//             </label>
//             <div className="grid grid-cols-2 gap-2">
//               {teamMembers.map((member) => (
//                 <button
//                   key={member.id}
//                   type="button"
//                   onClick={() => toggleAssignee(member.id)}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
//                     formData.assignees.includes(member.id)
//                       ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
//                       : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
//                   }`}
//                 >
//                   <img
//                     src={member.avatar}
//                     alt={member.name}
//                     className="w-6 h-6 rounded-full object-cover"
//                   />
//                   <span className="text-sm text-gray-700 dark:text-gray-300">
//                     {member.name}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Add Task
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Main Card14 Component
// const Card14: React.FC = () => {
//   const [tasks, setTasks] = useState<TodoItem[]>(mockTodoData);
//   const [draggedTask, setDraggedTask] = useState<TodoItem | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeView, setActiveView] = useState("Board");
//   const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
//   const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
//   const [defaultStatus, setDefaultStatus] = useState<string>("To do");

//   const handleDragStart = (e: React.DragEvent, task: TodoItem) => {
//     setDraggedTask(task);
//     e.dataTransfer.effectAllowed = "move";
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";
//   };

//   const handleDrop = (e: React.DragEvent, newStatus: string) => {
//     e.preventDefault();
//     if (draggedTask) {
//       setTasks(
//         tasks.map((task) =>
//           task.id === draggedTask.id
//             ? { ...task, status: newStatus as TodoItem["status"] }
//             : task
//         )
//       );
//       setDraggedTask(null);
//     }
//   };

//   const handleAddTask = (
//     newTaskData: Omit<TodoItem, "id" | "comments" | "links" | "attachments">
//   ) => {
//     const newTask: TodoItem = {
//       ...newTaskData,
//       id: Math.max(...tasks.map((t) => t.id)) + 1,
//       comments: 0,
//       links: 0,
//       attachments: 0,
//     };
//     setTasks([...tasks, newTask]);
//   };

//   const openAddTaskDialog = (status: string = "To do") => {
//     setDefaultStatus(status);
//     setIsAddTaskDialogOpen(true);
//   };

//   const filteredTasks = tasks.filter(
//     (task) =>
//       task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getColumnTasks = (columnId: string) => {
//     return filteredTasks.filter((task) => task.status === columnId);
//   };

//   const getColumnColor = (color: string) => {
//     switch (color) {
//       case "orange":
//         return "bg-orange-500";
//       case "blue":
//         return "bg-blue-500";
//       case "purple":
//         return "bg-purple-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-black">
//       {/* Page Header */}
//       <div className="px-4 md:px-6 py-4 md:py-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 space-y-4 md:space-y-0">
//           <div>
//             <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
//               Tasks
//             </h1>
//             <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
//               Keep track of your team's tasks all in one place.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
//             <div className="flex -space-x-1">
//               {teamMembers.slice(0, 4).map((member) => (
//                 <img
//                   key={member.id}
//                   className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
//                   src={member.avatar}
//                   alt={member.name}
//                 />
//               ))}
//               <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
//                 +2
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <button className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 text-sm">
//                 <Users className="w-4 h-4" />
//                 <span className="hidden sm:inline">Invite Member</span>
//                 <span className="sm:hidden">Invite</span>
//               </button>
//               <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-black px-3 md:px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
//                 <Share2 className="w-4 h-4" />
//                 <span>Share</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
//           <div className="flex items-center space-x-4 md:space-x-6 overflow-x-auto">
//             {views.map((view) => (
//               <button
//                 key={view}
//                 onClick={() => setActiveView(view)}
//                 className={`pb-2 font-medium whitespace-nowrap ${
//                   activeView === view
//                     ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
//                     : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
//                 }`}
//               >
//                 {view}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
//             {/* Search Bar */}
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search tasks..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 bg-white dark:bg-black text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
//               />
//             </div>

//             <div className="flex items-center justify-between sm:justify-end">
//               <button
//                 className="sm:hidden flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm bg-white dark:bg-black text-gray-700 dark:text-gray-300"
//                 onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
//               >
//                 <Filter className="w-4 h-4" />
//                 <span>Filters</span>
//               </button>

//               <div className="hidden sm:flex items-center space-x-3">
//                 <button
//                   onClick={() => openAddTaskDialog()}
//                   className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm bg-white dark:bg-black text-gray-700 dark:text-gray-300"
//                 >
//                   <Plus className="w-4 h-4" />
//                   <span>Add Task</span>
//                 </button>
//                 <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
//                   <MoreHorizontal className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Filters */}
//         {isMobileFiltersOpen && (
//           <div className="mt-4 p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-700 md:hidden">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="font-semibold text-gray-900 dark:text-gray-100">
//                 Filters & Sort
//               </h3>
//               <button
//                 onClick={() => setIsMobileFiltersOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="space-y-2">
//               <button className="w-full flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm bg-white dark:bg-black text-gray-700 dark:text-gray-300">
//                 <span>Group by</span>
//               </button>
//               <button className="w-full flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm bg-white dark:bg-black text-gray-700 dark:text-gray-300">
//                 <span>Sort</span>
//               </button>
//               <button
//                 onClick={() => openAddTaskDialog()}
//                 className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Add Task</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Board Content */}
//       <div className="px-4 md:px-6 pb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
//           {columns.map((column) => (
//             <div
//               key={column.id}
//               className="bg-gray-100 dark:bg-black rounded-lg p-3 md:p-4 min-h-[400px] border border-gray-200 dark:border-gray-700"
//               onDragOver={handleDragOver}
//               onDrop={(e) => handleDrop(e, column.id)}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center space-x-2">
//                   <div
//                     className={`w-2 h-2 rounded-full ${getColumnColor(
//                       column.color
//                     )}`}
//                   ></div>
//                   <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
//                     {column.title}
//                   </h2>
//                   <span className="bg-red-600 dark:bg-red-600 text-white dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
//                     {getColumnTasks(column.id).length}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <button
//                     onClick={() => openAddTaskDialog(column.id)}
//                     className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                   <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
//                     <MoreHorizontal className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 {getColumnTasks(column.id).map((task) => (
//                   <TaskCard
//                     key={task.id}
//                     task={task}
//                     onDragStart={handleDragStart}
//                   />
//                 ))}
//               </div>

//               {column.id !== "Done" && (
//                 <button
//                   onClick={() => openAddTaskDialog(column.id)}
//                   className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-center space-x-2 mt-3 text-sm bg-transparent"
//                 >
//                   <Plus className="w-4 h-4" />
//                   <span>Add Task</span>
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add Task Dialog */}
//       <AddTaskDialog
//         isOpen={isAddTaskDialogOpen}
//         onClose={() => setIsAddTaskDialogOpen(false)}
//         onSubmit={handleAddTask}
//         defaultStatus={defaultStatus}
//       />
//     </div>
//   );
// };

// export default Card14;

"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Users,
  Share2,
  MoreHorizontal,
  Calendar,
  MessageCircle,
  Link2,
  FileText,
  X,
  SquarePen,
  Trash2,
  ChevronDown,
} from "lucide-react";

// Import data and types
import {
  TodoItem,
  TaskCardProps,
  AddTaskDialogProps,
  labelOptions,
  mockTodoData,
  columns,
  views,
  teamMembers,
} from "../lib/TodoItem";

// Dropdown Menu Components (Simple Implementation)
const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="relative inline-block text-left">{children}</div>;

const DropdownMenuTrigger: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="cursor-pointer">{children}</div>;

const DropdownMenuContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div
    className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${className}`}
  >
    <div className="py-1" role="menu">
      {children}
    </div>
  </div>
);

const DropdownMenuItem: React.FC<{
  onClick?: () => void;
  variant?: string;
  children: React.ReactNode;
}> = ({ onClick, variant, children }) => (
  <button
    onClick={onClick}
    className={`group flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
      variant === "destructive"
        ? "text-red-600"
        : "text-gray-700 dark:text-gray-300"
    }`}
    role="menuitem"
  >
    {children}
  </button>
);

// Task Card Component
const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getLabelColor = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-100 text-orange-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "green":
        return "bg-green-100 text-green-800";
      case "pink":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-move mb-3"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(
            task.labelColor
          )}`}
        >
          {task.label}
        </span>
        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>

          {isMenuOpen && (
            <DropdownMenuContent className="bg-white dark:bg-gray-800 rounded-md shadow-lg">
              <DropdownMenuItem
                onClick={() => {
                  console.log("Edit Task", task.id);
                  setIsMenuOpen(false);
                }}
              >
                <SquarePen className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => {
                  console.log("Delete Task", task.id);
                  setIsMenuOpen(false);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm md:text-base line-clamp-2">
        {task.title}
      </h3>

      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Assignees :
        </span>
        <div className="flex -space-x-1">
          {task.assignees.slice(0, 3).map((assignee) => (
            <img
              key={assignee.id}
              className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white dark:border-gray-800 object-cover"
              src={assignee.avatar}
              alt={assignee.name}
            />
          ))}
          {task.assignees.length > 3 && (
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
              +{task.assignees.length - 3}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">{task.dueDate}</span>
          <span className="sm:hidden">
            {task.dueDate.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>
        <span className={`font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 md:space-x-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <MessageCircle className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">{task.comments} Comments</span>
            <span className="sm:hidden">{task.comments}</span>
          </div>
          <div className="flex items-center">
            <Link2 className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">{task.links} Links</span>
            <span className="sm:hidden">{task.links}</span>
          </div>
          <div className="flex items-center">
            <FileText className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">
              {task.attachments}/{task.attachments + 1}
            </span>
            <span className="sm:hidden">
              {task.attachments}/{task.attachments + 1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// List View Component
const ListView: React.FC<{
  tasks: TodoItem[];
  onEditTask: (task: TodoItem) => void;
  onDeleteTask: (taskId: number) => void;
}> = ({ tasks, onEditTask, onDeleteTask }) => {
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "status">(
    "dueDate"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500 bg-red-50 dark:bg-red-900/20";
      case "Medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "Low":
        return "text-blue-500 bg-blue-50 dark:bg-blue-900/20";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To do":
        return "text-orange-600 bg-orange-50 dark:bg-orange-900/20";
      case "In Progress":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
      case "Done":
        return "text-green-600 bg-green-50 dark:bg-green-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const getLabelColor = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "blue":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "green":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pink":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "dueDate":
        comparison =
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case "priority":
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
        break;
      case "status":
        const statusOrder = { "To do": 1, "In Progress": 2, Done: 3 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* List Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            All Tasks ({tasks.length})
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "dueDate" | "priority" | "status")
              }
              className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  sortOrder === "desc" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* List Content */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(
                      task.labelColor
                    )}`}
                  >
                    {task.label}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {task.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {task.dueDate}
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {task.comments}
                      </div>
                      <div className="flex items-center">
                        <Link2 className="w-4 h-4 mr-1" />
                        {task.links}
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {task.attachments}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-1">
                      {task.assignees.slice(0, 3).map((assignee) => (
                        <img
                          key={assignee.id}
                          className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                          src={assignee.avatar}
                          alt={assignee.name}
                          title={assignee.name}
                        />
                      ))}
                      {task.assignees.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                          +{task.assignees.length - 3}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onEditTask(task)}
                        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
                        title="Edit task"
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 p-1"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
        </div>
      )}
    </div>
  );
};

// Add Task Dialog Component
const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultStatus = "To do",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: defaultStatus as TodoItem["status"],
    priority: "Medium" as TodoItem["priority"],
    dueDate: "",
    label: "Not Started",
    labelColor: "blue" as TodoItem["labelColor"],
    assignees: [] as number[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const selectedAssignees = teamMembers.filter((member) =>
      formData.assignees.includes(member.id)
    );

    // Format date to match existing format
    let formattedDate = formData.dueDate;
    if (formData.dueDate) {
      const date = new Date(formData.dueDate);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      formattedDate = `${date.getDate().toString().padStart(2, "0")} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    } else {
      const today = new Date();
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      formattedDate = `${today.getDate().toString().padStart(2, "0")} ${
        months[today.getMonth()]
      } ${today.getFullYear()}`;
    }

    onSubmit({
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: formattedDate,
      label: formData.label,
      labelColor: formData.labelColor,
      assignees: selectedAssignees,
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      status: defaultStatus as TodoItem["status"],
      priority: "Medium",
      dueDate: "",
      label: "Not Started",
      labelColor: "blue",
      assignees: [],
    });
    onClose();
  };

  const toggleAssignee = (memberId: number) => {
    setFormData((prev) => ({
      ...prev,
      assignees: prev.assignees.includes(memberId)
        ? prev.assignees.filter((id) => id !== memberId)
        : [...prev.assignees, memberId],
    }));
  };

  // Update default status when it changes
  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      status: defaultStatus as TodoItem["status"],
    }));
  }, [defaultStatus]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Add New Task
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100 resize-none"
              rows={3}
              placeholder="Enter task description"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as TodoItem["status"],
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
            >
              <option value="To do">To do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  priority: e.target.value as TodoItem["priority"],
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Label
            </label>
            <div className="grid grid-cols-2 gap-2">
              {labelOptions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      label: item.label,
                      labelColor: item.color,
                    }))
                  }
                  className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                    formData.label === item.label
                      ? `border-${item.color}-500 bg-${item.color}-100 text-${item.color}-800`
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Assignees */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assignees
            </label>
            <div className="grid grid-cols-2 gap-2">
              {teamMembers.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => toggleAssignee(member.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                    formData.assignees.includes(member.id)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {member.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main TaskManager Component
const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<TodoItem[]>(mockTodoData);
  const [draggedTask, setDraggedTask] = useState<TodoItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("Board");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState<string>("To do");

  const handleDragStart = (e: React.DragEvent, task: TodoItem) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === draggedTask.id
            ? { ...task, status: newStatus as TodoItem["status"] }
            : task
        )
      );
      setDraggedTask(null);
    }
  };

  const handleAddTask = (
    newTaskData: Omit<TodoItem, "id" | "comments" | "links" | "attachments">
  ) => {
    const newTask: TodoItem = {
      ...newTaskData,
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      comments: 0,
      links: 0,
      attachments: 0,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (task: TodoItem) => {
    console.log("Edit task:", task);
    // Implement edit functionality here
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const openAddTaskDialog = (status: string = "To do") => {
    setDefaultStatus(status);
    setIsAddTaskDialogOpen(true);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColumnTasks = (columnId: string) => {
    return filteredTasks.filter((task) => task.status === columnId);
  };

  const getColumnColor = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-500";
      case "blue":
        return "bg-blue-500";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Page Header */}
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Tasks
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Keep track of your team's tasks all in one place.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex -space-x-1">
              {teamMembers.slice(0, 4).map((member) => (
                <img
                  key={member.id}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  src={member.avatar}
                  alt={member.name}
                />
              ))}
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                +2
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 text-sm">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Invite Member</span>
                <span className="sm:hidden">Invite</span>
              </button>
              <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-black px-3 md:px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 md:space-x-6 overflow-x-auto">
            {views.map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`pb-2 font-medium whitespace-nowrap ${
                  activeView === view
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 bg-white dark:bg-black text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end">
              <button
                className="sm:hidden flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm bg-white dark:bg-black text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="hidden sm:flex items-center space-x-3">
                <button
                  onClick={() => openAddTaskDialog()}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm bg-white dark:bg-black text-gray-700 dark:text-gray-300"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
                <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {isMobileFiltersOpen && (
          <div className="mt-4 p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-700 md:hidden">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Filters & Sort
              </h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm bg-white dark:bg-black text-gray-700 dark:text-gray-300">
                <span>Group by</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm bg-white dark:bg-black text-gray-700 dark:text-gray-300">
                <span>Sort</span>
              </button>
              <button
                onClick={() => openAddTaskDialog()}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="px-4 md:px-6 pb-6">
        {activeView === "Board" ? (
          // Board View
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {columns.map((column) => (
              <div
                key={column.id}
                className="bg-gray-100 dark:bg-black rounded-lg p-3 md:p-4 min-h-[400px] border border-gray-200 dark:border-gray-700"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getColumnColor(
                        column.color
                      )}`}
                    ></div>
                    <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                      {column.title}
                    </h2>
                    <span className="bg-red-600 dark:bg-red-600 text-white dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                      {getColumnTasks(column.id).length}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openAddTaskDialog(column.id)}
                      className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {getColumnTasks(column.id).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDragStart={handleDragStart}
                    />
                  ))}
                </div>

                {column.id !== "Done" && (
                  <button
                    onClick={() => openAddTaskDialog(column.id)}
                    className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-center space-x-2 mt-3 text-sm bg-transparent"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Task</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          // List View
          <ListView
            tasks={filteredTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </div>

      {/* Add Task Dialog */}
      <AddTaskDialog
        isOpen={isAddTaskDialogOpen}
        onClose={() => setIsAddTaskDialogOpen(false)}
        onSubmit={handleAddTask}
        defaultStatus={defaultStatus}
      />
    </div>
  );
};

export default TaskManager;
