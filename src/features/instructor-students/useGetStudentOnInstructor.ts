import { getInstructorStudents } from "@/services/getInstructorStudents";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentOnInstructor = () => {
  const { data: dataStudentOnInstructor, status: statusStudentOnInstructor } =
    useQuery({
      queryKey: ["studentOnInstructor"],
      queryFn: getInstructorStudents,
    });

  return { dataStudentOnInstructor, statusStudentOnInstructor };
};
