import { getAllCourses } from "@/services/getAllCourses";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCourses = () => {
  const { data: dataAllCourses, status: statusAllCourses } = useQuery({
    queryKey: ["allCourses"],
    queryFn: getAllCourses,
  });

  return { dataAllCourses, statusAllCourses };
};
