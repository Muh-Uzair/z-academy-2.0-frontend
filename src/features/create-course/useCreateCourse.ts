import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateCourseFormValues } from "./CreateCourse";
import { useRouter } from "next/navigation";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: mutateCreateCourse, status: statueCreateCourse } =
    useMutation({
      mutationFn: async ({
        formData,
      }: {
        formData: CreateCourseFormValues;
      }) => {
        const res = await fetch(`/api/courses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData }),
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Course Creation Failed");
        }

        return await res.json();
      },
      onSuccess: () => {
        toast.success("Course Created Successfully");
        queryClient.invalidateQueries({ queryKey: ["allCourses"] });
        router.push("/dashboard/instructor/my-courses");
      },
      onError: () => {
        toast.error("Course Creation Failed");
      },
    });

  return { mutateCreateCourse, statueCreateCourse };
};
