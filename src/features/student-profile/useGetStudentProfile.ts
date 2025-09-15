import { getsStudentProfile } from "@/services/getStudentProfile";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentProfile = () => {
  const { data: dataStudentProfile, status: statusStudentProfile } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: getsStudentProfile,
  });

  return { dataStudentProfile, statusStudentProfile };
};
