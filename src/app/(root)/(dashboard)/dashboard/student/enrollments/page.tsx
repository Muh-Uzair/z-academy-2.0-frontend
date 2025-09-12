import React from "react";
import { getQueryClient } from "@/providers/get-query-client";
import { getAllEnrollmentsStudent } from "@/services/getAllEnrollmentsStudent";
import EnrollmentsStudent from "@/features/enrollments-student/EnrollmentsStudent";

const Page: React.FC = () => {
  // VARS
  const queryClient = getQueryClient();

  // FUNCTIONS
  queryClient.prefetchQuery({
    queryKey: ["allEnrollmentsStudent"],
    queryFn: getAllEnrollmentsStudent,
  });

  // JSX
  return <EnrollmentsStudent />;
};

export default Page;
