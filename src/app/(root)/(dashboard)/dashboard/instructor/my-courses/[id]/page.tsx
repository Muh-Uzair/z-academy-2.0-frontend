import MyCoursesId from "@/features/my-courses-id/MyCoursesId";
import { getQueryClient } from "@/providers/get-query-client";
import { getCourseOid } from "@/services/getCourseOnId";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  // VARS
  const { id } = await params;
  const queryClient = getQueryClient();

  // FUNCTIONS
  queryClient.prefetchQuery({
    queryKey: ["allCourses"],
    queryFn: async () => getCourseOid(id),
  });

  // FUNCTIONS

  // JSX
  return <MyCoursesId id={id} />;
};

export default Page;
