"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  course: {
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
  };
}

const CourseCard: React.FC<Props> = ({ course }) => {
  console.log(course);
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md transition hover:shadow-lg">
      <CardHeader>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-48 w-full rounded-xl object-cover"
        />
        <CardTitle className="mt-3 text-lg font-semibold">
          {course.title}
        </CardTitle>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {course.description}
        </p>
      </CardHeader>

      <CardContent>
        <div className="text-muted-foreground flex justify-between text-sm">
          <span>
            Level: <b>{course.level}</b>
          </span>
          <span>
            Price: <b>${course.price}</b>
          </span>
        </div>
        <p className="mt-2 text-sm">
          Instructor: <b>{course.instructorId?.name || "Unknown"}</b>
          {" • "}
          {course.instructorId?.institute || ""}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button asChild>
          <Link href={`/course-details/${course._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
