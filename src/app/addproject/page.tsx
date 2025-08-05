// app/add-project.tsx
"use client";

import { useState } from "react";
import { FormProject } from "@/components/FormProject";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectFormData {
  name: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  projectManager: string;
  teamMembers: string[];
  department: string;
  goals: string[];
  deliverables: string[];
  tags: string[];
  visibility: string;
  notifications: boolean;
}

export default function AddProjectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdProject, setCreatedProject] = useState<ProjectFormData | null>(
    null
  );
  const router = useRouter();

  const handleSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would normally send data to your API
      console.log("Project data:", data);

      setCreatedProject(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error creating project:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Navigate back to projects list or dashboard
    router.push("/projects");
  };

  const handleBackToProjects = () => {
    router.push("/projects");
  };

  const handleCreateAnother = () => {
    setIsSuccess(false);
    setCreatedProject(null);
  };

  if (isSuccess && createdProject) {
    return (
      <div className="flex-1 space-y-4 p-2">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBackToProjects}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">
                Project Created Successfully!
              </CardTitle>
              <CardDescription className="text-base">
                Your project "{createdProject.name}" has been created and is
                ready to go.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Summary */}
              <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                <h3 className="font-semibold">Project Summary:</h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{createdProject.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium capitalize">
                      {createdProject.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority:</span>
                    <span className="font-medium capitalize">
                      {createdProject.priority}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="font-medium">
                      {createdProject.startDate?.toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date:</span>
                    <span className="font-medium">
                      {createdProject.endDate?.toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Members:</span>
                    <span className="font-medium">
                      {createdProject.teamMembers.length} members
                    </span>
                  </div>
                  {createdProject.goals.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goals:</span>
                      <span className="font-medium">
                        {createdProject.goals.length} objectives
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleBackToProjects}
                  className="flex-1 sm:flex-none"
                >
                  View All Projects
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCreateAnother}
                  className="flex-1 sm:flex-none"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Another Project
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  Quick Actions:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    Add Tasks
                  </Button>
                  <Button variant="outline" size="sm">
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" size="sm">
                    Set Milestones
                  </Button>
                  <Button variant="outline" size="sm">
                    Invite Members
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium tracking-tight">
            Create New Project
          </h1>
          <p className="text-muted-foreground">
            Set up a new project for your team to collaborate on
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">New Project Setup</h3>
              <p className="text-sm text-blue-700">
                Fill in the information below to create your project. Required
                fields are marked with *
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <FormProject
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
}
