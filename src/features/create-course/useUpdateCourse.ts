import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateCourseFormValues } from "./CreateCourse";
import { useRouter, useParams } from "next/navigation";

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams(); // get route params
  const courseId = params?.id as string; // assuming your route is like /dashboard/instructor/edit/[id]

  const { mutate: mutateUpdateCourse, status: statusUpdateCourse } =
    useMutation({
      mutationFn: async ({
        formData,
      }: {
        formData: CreateCourseFormValues;
      }) => {
        const res = await fetch(`/api/courses/${courseId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData }),
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Course Updation Failed");
        }

        return await res.json();
      },
      onSuccess: () => {
        toast.success("Course Updated Successfully");
        queryClient.invalidateQueries({ queryKey: ["courseOnId"] });
        queryClient.refetchQueries({ queryKey: ["courseOnId"] });
        queryClient.invalidateQueries({ queryKey: ["allCourses"] });
        queryClient.refetchQueries({ queryKey: ["allCourses"] });
        router.push("/dashboard/instructor/my-courses");
      },
      onError: () => {
        toast.error("Course Updation Failed");
      },
    });

  return { mutateUpdateCourse, statusUpdateCourse };
};
