"use client";

import React from "react";
import { useGetStudentOnInstructor } from "./useGetStudentOnInstructor";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";
import PageHeading from "@/components/PageHeading";

const InstructorStudents: React.FC = () => {
  // VARS
  const { dataStudentOnInstructor, statusStudentOnInstructor } =
    useGetStudentOnInstructor();

  const allStudents =
    dataStudentOnInstructor?.data?.allStudentForInstructor || [];

  // JSX
  if (statusStudentOnInstructor === "error") {
    return <ErrorScreen />;
  }

  if (statusStudentOnInstructor === "pending") {
    return <LoadingScreen />;
  }

  if (!allStudents.length) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-500">
        No students enrolled yet.
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center pb-[12px]">
      <div className="w-full max-w-[1200px]">
        <PageHeading heading="My Students" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allStudents.map(
            (student: {
              _id: string;
              avatar: string;
              email: string;
              name: string;
              bio: string;
            }) => (
              <Card key={student._id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="relative h-12 w-12">
                    {student.avatar ? (
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} alt={student.name} />
                      </Avatar>
                    ) : (
                      <div className="bg-primary-extra-light/50 border-primary-extra-dark flex h-12 w-12 items-center justify-center rounded-full border">
                        <UserIcon className="text-primary-extra-dark h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <p className="tab:max-w-[280px] max-w-[250px] truncate text-sm text-gray-500">
                      {student.email}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {student.bio?.trim() ? student.bio : "No bio available"}
                  </p>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorStudents;
