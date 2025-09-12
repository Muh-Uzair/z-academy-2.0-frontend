import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEnrollment = () => {
  const { mutate: mutateEnrollment, status: statusEnrollment } = useMutation({
    mutationFn: async ({ courseId }: { courseId: string }) => {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({})); // fallback in case response isn’t JSON

        throw new Error(errorData?.message || "Unable to enroll into course");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Enrollment successful");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Enrollment unsuccessful");
      }
    },
  });

  return { mutateEnrollment, statusEnrollment };
};
