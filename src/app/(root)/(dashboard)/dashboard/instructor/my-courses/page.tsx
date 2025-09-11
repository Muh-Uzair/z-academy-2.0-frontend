import InstructorMyCourses from "@/features/instructor-my-courses/InstructorMyCourses";
import { getQueryClient } from "@/providers/get-query-client";
import { getAllCoursesInstructor } from "@/services/getAllCoursesInstructor";
import React from "react";

const page: React.FC = () => {
  // VARS
  const queryClient = getQueryClient();

  // FUNCTIONS
  queryClient.prefetchQuery({
    queryKey: ["allCourses"],
    queryFn: getAllCoursesInstructor,
  });

  // JSX
  return <InstructorMyCourses />;
};

export default page;
