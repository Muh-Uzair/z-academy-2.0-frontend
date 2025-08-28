import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useVerifyOtp = () => {
  const router = useRouter();

  const { mutate: mutateVerifyOtp, status: statusVerifyOtp } = useMutation({
    mutationFn: async ({ otp }: { otp: number }) => {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      return await res.json();
    },
    onError: (error) => {
      console.log("Error:", error);
    },
    onSuccess: () => {
      router.push("/dashboard/student/home");
    },
  });

  return { mutateVerifyOtp, statusVerifyOtp };
};
