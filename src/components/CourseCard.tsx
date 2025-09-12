/* eslint-disable @next/next/no-img-element */

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
import { Badge } from "./ui/badge";

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
  badgeVariant: "success" | "default" | "secondary" | "beginner" | "outline";
}

const CourseCard: React.FC<Props> = ({ course, badgeVariant }) => {
  return (
    <Card key={course._id} className="shadow-md transition hover:shadow-lg">
      <CardHeader>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="tab:h-[260px] laptopM:h-[200px] h-[200px] w-full rounded-xl object-cover"
        />
        <CardTitle className="mt-3 text-lg font-semibold">
          {course.title}
        </CardTitle>
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
          <Link href={`/course-details/${course._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
