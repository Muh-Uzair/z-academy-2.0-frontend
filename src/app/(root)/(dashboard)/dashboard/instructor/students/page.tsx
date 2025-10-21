// // app/instructor-students/page.tsx
// import InstructorStudents from "@/features/instructor-students/InstructorStudents";
// import { getInstructorStudents } from "@/services/getInstructorStudents";

// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";
// import React from "react";

// const Page = async () => {
//   const queryClient = new QueryClient();

//   // prefetch data on the server
//   await queryClient.prefetchQuery({
//     queryKey: ["studentOnInstructor"],
//     queryFn: getInstructorStudents,
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <InstructorStudents />
//     </HydrationBoundary>
//   );
// };

// export default Page;

// app/instructor-students/page.tsx
import InstructorStudents from "@/features/instructor-students/InstructorStudents";

import React from "react";

const Page = async () => {
  return <InstructorStudents />;
};

export default Page;
