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

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    },
    onError: (error) => {
      console.log("Error:", error);
    },
    onSuccess: (data) => {
      const { jwt } = data?.data;
      if (jwt) {
        localStorage.setItem("jwt", jwt);
        console.log("JWT stored successfully"); // Debug log
        router.push("/dashboard/student/home");
      } else {
        console.error("No JWT token received from server");
      }
    },
  });

  return { mutateVerifyOtp, statusVerifyOtp };
};
