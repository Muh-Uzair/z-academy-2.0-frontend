import StudentCourses from "@/features/student-courses/StudentCourses";
import { getQueryClient } from "@/providers/get-query-client";
import { getAllCourses } from "@/services/getAllCourses";
import React from "react";

const Page: React.FC = () => {
  // VARS
  const queryClient = getQueryClient();

  // FUNCTIONS
  queryClient.prefetchQuery({
    queryKey: ["allCoursesNoAuth"],
    queryFn: getAllCourses,
  });

  // JSX
  return <StudentCourses />;
};

export default Page;
