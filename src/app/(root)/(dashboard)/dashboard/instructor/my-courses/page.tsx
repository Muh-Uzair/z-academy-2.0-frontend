import InstructorMyCourses from "@/features/instructor-my-courses/InstructorMyCourses";
import { getQueryClient } from "@/providers/get-query-client";
import { getAllCourses } from "@/services/getAllCourses";
import React from "react";

const page: React.FC = () => {
  // VARS
  const queryClient = getQueryClient();

  // FUNCTIONS
  queryClient.prefetchQuery({
    queryKey: ["allCourses"],
    queryFn: getAllCourses,
  });

  // JSX
  return <InstructorMyCourses />;
};

export default page;
