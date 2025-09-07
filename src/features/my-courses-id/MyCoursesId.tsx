"use client";

import React, { useState } from "react";
import { useGetCourseOnId } from "./useGetCourseOnId";
import CreateCourse from "../create-course/CreateCourse";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

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
      <div className="h-screen overflow-y-auto">
        <div className="flex items-center justify-end">
          <Button
            variant={!editMyCourse ? "default" : "outline"}
            onClick={() => setEditMyCourse((prev) => !prev)}
          >
            <Pen />
            Edit
          </Button>
        </div>
        <div>
          <CreateCourse
            readOnly={true}
            receivedDefaultValues={dataCourseOnId.data.course}
          />
        </div>
      </div>
    );
  }

  // fallback (shouldn’t usually happen)
  return null;
};

export default MyCoursesId;
