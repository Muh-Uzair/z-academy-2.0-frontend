import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegisterInstructor = () => {
  const router = useRouter();

  const { mutate: mutateRegisterInstructor, status: statusRegisterInstructor } =
    useMutation({
      mutationFn: async ({
        name,
        email,
        password,
        institute,
        specialization,
        experience,
      }: {
        name: string;
        email: string;
        password: string;
        institute: string;
        specialization: string;
        experience: string;
      }) => {
        const res = await fetch("/api/register-instructor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            institute,
            specialization,
            experience,
          }),
        });

        const data = await res.json();

        // Add this check to manually throw errors
        if (!res.ok || data.error || data.success === false) {
          throw new Error(data.error || data.message || "Registration failed");
        }

        return data;
      },
      onError: () => {
        toast.error("Registration failed");
      },
      onSuccess: () => {
        router.push("/verify-otp?userType=instructor");
      },
    });

  return { mutateRegisterInstructor, statusRegisterInstructor };
};
