import { CalendarCheck } from "lucide-react";

const meetings = [
  {
    title: "Design Review",
    time: "10:00 AM – 11:00 AM",
    participants: [
      { image: "/mia.svg", fallback: "A" },
      { image: "/nina.svg", fallback: "B" },
      { image: "/jhon.svg", fallback: "C" },
      { image: "/bee.svg", fallback: "D" },
    ],
    color: "bg-indigo-100 text-indigo-500",
    border: "bg-indigo-500",
    iconBg: "bg-indigo-200",
    icon: CalendarCheck,
  },
  {
    title: "Projects Planning",
    time: "10:00 AM – 11:00 AM",
    participants: [
      { image: "/jhon.svg", fallback: "C" },
      { image: "/mia.svg", fallback: "E" },
    ],
    color: "bg-rose-100 text-rose-500",
    border: "bg-rose-500",
    iconBg: "bg-rose-200",
    icon: CalendarCheck,
  },
  {
    title: "Projects Planning",
    time: "10:00 AM – 11:00 AM",
    participants: [
      { image: "/bee.svg", fallback: "B" },
      { image: "/mia.svg", fallback: "C" },
      { image: "/nina.svg", fallback: "E" },
    ],
    color: "bg-green-100 text-green-500",
    border: "bg-green-500",
    iconBg: "bg-green-200",
    icon: CalendarCheck,
  },
];

export default meetings;
