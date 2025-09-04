import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateCourseFormValues } from "./CreateCourse";

export const useCreateCourse = () => {
  const { mutate: mutateCreateCourse, status: statueCreateCourse } =
    useMutation({
      mutationFn: async ({
        formData,
      }: {
        formData: CreateCourseFormValues;
      }) => {
        const res = await fetch(`/api/create-course`, {
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
      },
      onError: () => {
        toast.error("Course Creation Failed");
      },
    });

  return { mutateCreateCourse, statueCreateCourse };
};
