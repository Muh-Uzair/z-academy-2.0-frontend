"use client";

import React, { useState } from "react";
import { useGetInstructorProfile } from "./useGetInstructorProfile";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import PageHeading from "@/components/PageHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, Pen, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLogout } from "@/hooks/useLogout";
import LoadingSpinner from "@/components/LoadingSpinner";

// CMP CMP CMP
const InstructorProfile: React.FC = () => {
  // VARS
  const { dataInstructorProfile, statusInstructorProfile } =
    useGetInstructorProfile();
  const { mutateLogout, statusLogout } = useLogout({});
  const instructorProfile = dataInstructorProfile?.data?.instructorProfile;
  const [openLogout, setOpenLogout] = useState(false);

  // FUNCTIONS

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    mutateLogout();
  };

  console.log(statusLogout);

  // JSX JSX JSX
  if (statusInstructorProfile === "error") {
    return <ErrorScreen />;
  }

  if (statusInstructorProfile === "pending") {
    return <LoadingScreen />;
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[800px]">
        <PageHeading heading="Your Profile" />
        <div className="mb-6 flex justify-end">
          <div className="flex gap-3">
            {/* Logout with confirmation dialog */}
            <Dialog open={openLogout} onOpenChange={setOpenLogout}>
              <DialogTrigger asChild>
                <Button variant={"destructive"}>
                  <LogOut />
                  Logout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Logout</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to log out of your account?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                  <Button variant="ghost" onClick={() => setOpenLogout(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleLogout}>
                    {statusLogout === "pending" && <LoadingSpinner />}
                    Yes, Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button>
              <Pen />
              Edit
            </Button>
          </div>
        </div>
        <Card className="mx-auto shadow-md">
          <CardContent className="space-y-6 p-6">
            {/* Avatar + Name */}
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20">
                {instructorProfile.avatar ? (
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={instructorProfile.avatar}
                      alt={instructorProfile.name}
                    />
                    <AvatarFallback>
                      {instructorProfile?.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="bg-primary-extra-light/50 border-primary-extra-dark flex h-20 w-20 items-center justify-center rounded-full border">
                    <UserIcon className="text-primary-extra-dark h-10 w-10" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {instructorProfile.name}
                </h2>
                <p
                  className="tab:max-w-[300px] laptopM:max-w-[400px] max-w-[200px] truncate text-gray-500"
                  title={instructorProfile.email}
                >
                  {instructorProfile.email}
                </p>
                <Badge>{instructorProfile.userType}</Badge>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-lg font-medium">Bio</h3>
              <p className="mt-1 text-gray-600">
                {instructorProfile.bio && instructorProfile.bio.trim() !== ""
                  ? instructorProfile.bio
                  : "No bio added yet."}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium">Institute</h3>
                <p className="text-gray-600">
                  {instructorProfile.institute || "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Specialization</h3>
                <p className="text-gray-600">
                  {instructorProfile.specialization || "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Experience</h3>
                <p className="text-gray-600">
                  {instructorProfile.experience
                    ? `${instructorProfile.experience} years`
                    : "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Joined</h3>
                <p className="text-gray-600">
                  {new Date(instructorProfile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstructorProfile;
