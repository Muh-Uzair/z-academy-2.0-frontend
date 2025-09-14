import InstructorProfile from "@/features/instructor-profile/InstructorProfile";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getInstructorProfile } from "@/services/getInstructorProfile";

const Page: React.FC = async () => {
  const queryClient = new QueryClient();

  // Prefetch karo
  await queryClient.prefetchQuery({
    queryKey: ["instructorProfile"],
    queryFn: getInstructorProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InstructorProfile />
    </HydrationBoundary>
  );
};

export default Page;
