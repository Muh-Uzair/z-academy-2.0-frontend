// import React from "react";
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";
// import StudentProfile from "@/features/student-profile/StudentProfile";
// import { getsStudentProfile } from "@/services/getStudentProfile";

// const Page: React.FC = async () => {
//   const queryClient = new QueryClient();

//   // Prefetch karo
//   await queryClient.prefetchQuery({
//     queryKey: ["studentProfile"],
//     queryFn: getsStudentProfile,
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <StudentProfile />
//     </HydrationBoundary>
//   );
// };

// export default Page;

import React from "react";
import StudentProfile from "@/features/student-profile/StudentProfile";

const Page: React.FC = async () => {
  return <StudentProfile />;
};

export default Page;
