import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEnrollment = () => {
  const { mutate: mutateEnrollment, status: statusEnrollment } = useMutation({
    mutationFn: async ({ courseId }: { courseId: string }) => {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) {
        throw new Error("Unable to enroll into course");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Enrollment successful");
    },
    onError: () => {
      toast.error("Enrollment unsuccessful");
    },
  });

  return { mutateEnrollment, statusEnrollment };
};
