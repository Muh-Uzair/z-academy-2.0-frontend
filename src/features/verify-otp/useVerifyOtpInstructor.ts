import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useVerifyOtpInstructor = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate: mutateVerifyOtpInstructor,
    status: statusVerifyOtpInstructor,
  } = useMutation({
    mutationFn: async ({ otp }: { otp: number }) => {
      const res = await fetch("/api/verify-otp-instructor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    },
    onError: () => {
      toast.error("Verification failed");
    },
    onSuccess: async (data) => {
      const { jwt } = data?.data;

      localStorage.setItem("jwt", jwt);

      // ✅ Force refetch currUser instead of only invalidating
      await queryClient.refetchQueries({
        queryKey: ["currUser"],
        type: "active",
      });

      router.push("/dashboard/instructor/home");
    },
  });

  return { mutateVerifyOtpInstructor, statusVerifyOtpInstructor };
};
