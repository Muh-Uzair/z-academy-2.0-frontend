import { getAllCoursesInstructor } from "@/services/getAllCoursesInstructor";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCourses = () => {
  const { data: dataAllCourses, status: statusAllCourses } = useQuery({
    queryKey: ["allCourses"],
    queryFn: getAllCoursesInstructor,
  });

  return { dataAllCourses, statusAllCourses };
};
