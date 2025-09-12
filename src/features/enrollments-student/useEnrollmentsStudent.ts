import { getAllEnrollmentsStudent } from "@/services/getAllEnrollmentsStudent";
import { useQuery } from "@tanstack/react-query";

export const useEnrollmentsStudent = () => {
  const { data: dataEnrollmentsStudent, status: statusEnrollmentStudent } =
    useQuery({
      queryKey: ["allEnrollmentsStudent"],
      queryFn: getAllEnrollmentsStudent,
    });

  return { dataEnrollmentsStudent, statusEnrollmentStudent };
};
