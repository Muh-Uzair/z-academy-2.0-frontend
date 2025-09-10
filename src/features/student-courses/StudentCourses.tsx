"use client";

import React from "react";
import { useGetAllCourses } from "./useGetAllCourses";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import PageHeading from "@/components/PageHeading";
import CourseCard from "@/components/CourseCard";

const StudentCourses: React.FC = () => {
  // VARS
  const { dataAllCourses, statusAllCourses } = useGetAllCourses();
  const courses = dataAllCourses?.data?.courses;

  // JSX
  if (statusAllCourses === "error") {
    return <ErrorScreen />;
  }
  if (statusAllCourses === "pending") {
    return <LoadingScreen />;
  }

  return (
    <div className="pb-[50px]">
      <PageHeading heading="All Courses" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {courses?.map(
          (course: {
            _id: string;
            title: string;
            description: string;
            thumbnail: string;
            price: number;
            level: string;
            instructorId: {
              name: string;
              institute: string;
            };
          }) => {
            // pick badge style based on course level
            let badgeVariant:
              | "success"
              | "default"
              | "secondary"
              | "beginner"
              | "outline" = "default";

            if (course.level.toLowerCase() === "beginner") {
              badgeVariant = "beginner";
            } else if (course.level.toLowerCase() === "intermediate") {
              badgeVariant = "default";
            } else if (course.level.toLowerCase() === "advanced") {
              badgeVariant = "success";
            }

            return (
              <CourseCard
                key={course?._id}
                course={course}
                badgeVariant={badgeVariant}
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
