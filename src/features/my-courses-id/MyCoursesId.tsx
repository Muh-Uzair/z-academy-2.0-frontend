"use client";

import React, { useState } from "react";
import { useGetCourseOnId } from "./useGetCourseOnId";
import CreateCourse from "../create-course/CreateCourse";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import PageHeading from "@/components/PageHeading";

interface Props {
  id: string;
}

const MyCoursesId: React.FC<Props> = ({ id }) => {
  // VARS
  const { dataCourseOnId, statusCourseOnId } = useGetCourseOnId(id);
  const [editMyCourse, setEditMyCourse] = useState(false);

  // JSX
  if (statusCourseOnId === "pending") {
    return <LoadingScreen />;
  }

  if (statusCourseOnId === "error") {
    return <div className="text-red-500">Failed to load course</div>;
  }

  if (statusCourseOnId === "success" && dataCourseOnId?.data?.course) {
    return (
      <div className="flex h-screen flex-col gap-5 overflow-y-scroll pt-5">
        <section>
          <PageHeading heading="Course Details" />
        </section>
        <section className="flex items-center justify-end">
          <Button
            variant={editMyCourse ? "default" : "outline"}
            onClick={() => setEditMyCourse((prev) => !prev)}
          >
            <Pen />
            Edit
          </Button>
        </section>
        <section>
          <CreateCourse
            readOnly={true}
            receivedDefaultValues={dataCourseOnId.data.course}
            editMyCourse={editMyCourse}
          />
        </section>
      </div>
    );
  }

  // fallback (shouldn’t usually happen)
  return null;
};

export default MyCoursesId;
