import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
  const router = useRouter();

  const { mutate: mutateRegisterStudent, status: statusRegisterStudent } =
    useMutation({
      mutationFn: async ({
        name,
        email,
        password,
      }: {
        name: string;
        email: string;
        password: string;
      }) => {
        const res = await fetch("/api/register-student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        // Add this check to manually throw errors
        if (!res.ok || data.error || data.success === false) {
          throw new Error(data.error || data.message || "Registration failed");
        }

        return data;
      },
      onError: (error: Error) => {
        console.log("Error caught:", error.message);
        toast.error(error.message);
      },
      onSuccess: () => {
        router.push("/verify-otp?userType=student");
      },
    });

  return { mutateRegisterStudent, statusRegisterStudent };
};
