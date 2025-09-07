"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useGetAllCourses } from "./useGetAllCourses";
import LoadingScreen from "@/components/LoadingScreen";
import { ICourse } from "@/types/course-types";

const InstructorMyCourses: React.FC = () => {
  // VARS
  const { dataAllCourses, statusAllCourses } = useGetAllCourses();

  console.log(statusAllCourses);
  console.log(dataAllCourses?.data?.courses);

  // FUNCTIONS

  // JSX

  if (statusAllCourses === "pending") {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col gap-8">
      <section className="pt-4">
        <span className="text-xl font-bold">My Courses</span>
      </section>
      <section className="flex items-center justify-end">
        <Link href={"/dashboard/instructor/my-courses/create"}>
          <Button>
            <Plus />
            Create Course
          </Button>
        </Link>
      </section>
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr.No</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataAllCourses?.data?.courses.map(
              (val: ICourse & { _id: string }, i: number) => (
                <TableRow key={val?.title}>
                  <TableCell>{i + 1} </TableCell>
                  <TableCell>
                    <div className="relative h-[50px] w-[80px] rounded-md bg-stone-100">
                      <Image
                        src={val?.thumbnail || "/placeholder.png"}
                        alt="Course thumbnail"
                        fill
                        sizes="80px" // 👈 tell Next.js the rendered width
                        className="rounded-md object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{val?.title}</TableCell>
                  <TableCell>{val?.level}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/instructor/my-courses/${val?._id}`}>
                      <Button variant={"outline"}>
                        Visit
                        <ArrowRight />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default InstructorMyCourses;
