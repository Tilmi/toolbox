"use client";

import { Card, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CheckCircle } from "lucide-react";
import activities from "@/lib/dataActivity";

export function Card7() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <div className="px-6 space-y-6">
          {activities.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1.5" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>

              {item.description && (
                <div className="pl-7 pt-1">
                  <p className="text-sm text-muted-foreground">
                    “{item.description}”
                  </p>
                  {item.user && (
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <span className="text-muted-foreground">by</span>
                      <Avatar className="h-5 w-5">
                        <AvatarImage
                          src={item.user.image}
                          alt={item.user.name}
                        />
                        <AvatarFallback className="text-xs">
                          {item.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{item.user.name}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
