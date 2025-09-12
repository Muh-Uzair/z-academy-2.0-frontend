/* eslint-disable @next/next/no-img-element */

"use client";

import React from "react";
import { useEnrollmentsStudent } from "./useEnrollmentsStudent";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageHeading from "@/components/PageHeading";

interface IEnrollment {
  _id: string;
  status: string;
  enrolledAt: string;
  courseId: {
    _id: string;
    title: string;
    description: string;
    level: string;
    price: number;
    rating: number;
    thumbnail?: string;
  };
  studentId: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

const EnrollmentsStudent: React.FC = () => {
  const { dataEnrollmentsStudent, statusEnrollmentStudent } =
    useEnrollmentsStudent();

  if (statusEnrollmentStudent === "error") {
    return <ErrorScreen />;
  }

  if (statusEnrollmentStudent === "pending") {
    return <LoadingScreen />;
  }

  const enrollments = dataEnrollmentsStudent?.data?.enrollments as
    | IEnrollment[]
    | undefined;

  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            No Enrollments Found
          </h3>
          <p className="text-gray-500">
            You haven&apos;t enrolled in any courses yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div>
        <PageHeading heading="Your Enrollments" />
        <div className="grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((enrollment) => (
            <Card
              key={enrollment._id}
              className="overflow-hidden transition hover:shadow-lg"
            >
              {/* Course Thumbnail */}
              <div className="h-full overflow-hidden px-6">
                <img
                  src={
                    enrollment.courseId?.thumbnail ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={enrollment.courseId?.title || "Course"}
                  className="h-full w-full rounded-md object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-1">
                  {enrollment.courseId?.title || "Untitled Course"}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-gray-600">
                  {enrollment.courseId?.description ||
                    "No description available"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Course Info */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <Badge variant="outline" className="capitalize">
                    {enrollment.courseId?.level || "Unknown"}
                  </Badge>
                  <span className="font-medium text-gray-700">
                    💲{enrollment.courseId?.price || 0}
                  </span>
                </div>

                <Separator className="my-3" />

                {/* Student Info */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={
                        enrollment.studentId?.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          enrollment.studentId?.name || "Student",
                        )}`
                      }
                      alt={enrollment.studentId?.name || "Student"}
                    />
                    <AvatarFallback>
                      {enrollment.studentId?.name?.[0] || "S"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{enrollment.studentId?.name}</p>
                    <p className="text-xs text-gray-500">
                      {enrollment.studentId?.email}
                    </p>
                  </div>
                </div>

                {/* Enrollment Info */}
                <div className="mt-4 flex items-center justify-between">
                  <Badge
                    variant={
                      enrollment.status === "enrolled"
                        ? "default"
                        : enrollment.status === "pending"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {enrollment.status || "Unknown"}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {enrollment.enrolledAt
                      ? new Date(enrollment.enrolledAt).toLocaleDateString()
                      : "Unknown date"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentsStudent;
