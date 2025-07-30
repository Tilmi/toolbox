"use client";

import { Card, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import meetings from "@/lib/meetings";
import { cn } from "@/lib/utils";

export function Card9() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Meeting Schedule</CardTitle>
        </CardHeader>
        <div className="px-4 pb-6 space-y-4">
          {meetings.map((meeting, index) => {
            const Icon = meeting.icon;
            return (
              <div
                key={index}
                className={cn(
                  "rounded-md flex items-center justify-between p-4 relative",
                  meeting.color
                )}
              >
                {/* Left border */}
                <div
                  className={cn(
                    "absolute left-0 top-0 h-full w-2 rounded-md",
                    meeting.border
                  )}
                />
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {meeting.title}
                  </p>
                  <p className="text-xs text-gray-500">{meeting.time}</p>
                  <div className="flex -space-x-2 mt-2">
                    {meeting.participants.map((p, idx) => (
                      <Avatar
                        key={idx}
                        className="h-6 w-6 border-1 border-white"
                      >
                        <AvatarImage
                          src={p.image}
                          alt={p.fallback}
                          className="object-cover rounded-full"
                        />
                        <AvatarFallback className="text-xs">
                          {p.fallback}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                {/* Icon section */}
                <div className={cn("p-2 rounded-full", meeting.iconBg)}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
