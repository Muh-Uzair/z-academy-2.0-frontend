import { getCourseOnId } from "@/services/getCourseOnId";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseOnId = (id: string) => {
  const { data: dataCourseOnId, status: statusCourseOnId } = useQuery({
    queryKey: ["courseOnId"],
    queryFn: async () => getCourseOnId(id),
  });

  return { dataCourseOnId, statusCourseOnId };
};
