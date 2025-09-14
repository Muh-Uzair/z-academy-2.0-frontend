import { getInstructorProfile } from "@/services/getInstructorProfile";
import { useQuery } from "@tanstack/react-query";

export const useGetInstructorProfile = () => {
  const { data: dataInstructorProfile, status: statusInstructorProfile } =
    useQuery({
      queryKey: ["instructorProfile"],
      queryFn: getInstructorProfile,
    });

  return { dataInstructorProfile, statusInstructorProfile };
};
