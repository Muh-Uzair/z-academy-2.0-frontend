/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useGetAllCourses } from "./useGetAllCourses";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeading from "@/components/PageHeading";

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
              <Card
                key={course._id}
                className="w-full shadow-md transition hover:shadow-lg"
              >
                <CardHeader>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="tab:h-[260px] laptopM:h-[200px] h-[200px] w-full rounded-xl object-cover"
                  />
                  <CardTitle className="mt-3 text-lg font-semibold">
                    {course.title}
                  </CardTitle>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {course.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant={badgeVariant} className="capitalize">
                      {course.level}
                    </Badge>
                    <span className="text-sm">
                      Price: <b>${course.price}</b>
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Instructor: <b>{course.instructorId?.name || "Unknown"}</b>
                    {" • "}
                    {course.instructorId?.institute || ""}
                  </p>
                </CardContent>

                <CardFooter className="flex justify-end">
                  <Button asChild>
                    <Link href={`/course-details/${course._id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          },
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
