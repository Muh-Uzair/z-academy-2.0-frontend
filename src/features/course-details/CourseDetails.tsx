/* eslint-disable @next/next/no-img-element */

"use client";

import React from "react";
import { useGetCourseOnId } from "../my-courses-id/useGetCourseOnId";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, PlusCircle, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEnrollment } from "./useEnrollment";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Props {
  id: string;
}

interface IInstructor {
  avatar: string;
  bio: string;
  email: string;
  experience: number;
  institute: string;
  name: string;
  specialization: string;
  _id: string;
}

interface ICourse {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  level: string;
  instructorId: IInstructor;
  createdAt: string;
  updatedAt: string;
  enrollmentCount: number;
  rating: number;
}

const CourseDetails: React.FC<Props> = ({ id }) => {
  // VARS
  const { dataCourseOnId, statusCourseOnId } = useGetCourseOnId(id);
  const course: ICourse = dataCourseOnId?.data?.course;
  const { mutateEnrollment, statusEnrollment } = useEnrollment();

  // FUNCTIONS

  const enroll = () => {
    mutateEnrollment({ courseId: id });
  };

  // JSX

  if (statusCourseOnId === "error") {
    return <ErrorScreen />;
  }

  if (statusCourseOnId === "pending") {
    return <LoadingScreen />;
  }

  return (
    <div className="tab:p-[50px] mx-auto max-w-[800px] p-6">
      {/* Course Thumbnail */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl shadow-md">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Course Info */}
      <Card className="mt-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
          <p className="text-muted-foreground mt-1">{course.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="success" className="capitalize">
              {course.level}
            </Badge>
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <DollarSign className="size-4" /> ${course.price}
            </div>
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <Star className="size-4" /> {course.rating} / 5
            </div>
          </div>

          {/* Instructor Section */}
          <div className="mt-4 border-t pt-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <User className="size-5" /> Instructor
            </h3>
            <div className="mt-2 space-y-1 text-sm">
              <p>
                <b>{course.instructorId?.name}</b> •{" "}
                {course.instructorId?.specialization}
              </p>
              <p>{course.instructorId?.institute}</p>
              <p className="text-muted-foreground">
                {course.instructorId?.experience} years experience
              </p>
              <p className="text-muted-foreground">
                Email: {course.instructorId?.email}
              </p>
            </div>
          </div>

          {/* Enroll Button */}
          <div className="mt-6">
            <Button
              onClick={() => enroll()}
              className="flex items-center gap-2"
            >
              {statusEnrollment === "pending" && (
                <>
                  <LoadingSpinner />
                  Enroll
                </>
              )}

              {statusEnrollment !== "pending" && (
                <>
                  {" "}
                  <PlusCircle className="size-5" />
                  Enroll
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetails;
