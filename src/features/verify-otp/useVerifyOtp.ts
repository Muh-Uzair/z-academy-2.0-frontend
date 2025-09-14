import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useVerifyOtp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: mutateVerifyOtp, status: statusVerifyOtp } = useMutation({
    mutationFn: async ({ otp }: { otp: number }) => {
      const res = await fetch("/api/verify-otp", {
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

      // ✅ Force refetch immediately instead of waiting
      await queryClient.refetchQueries({
        queryKey: ["currUser"],
        type: "active",
      });

      router.push("/dashboard/student/home");
    },
  });

  return { mutateVerifyOtp, statusVerifyOtp };
};
