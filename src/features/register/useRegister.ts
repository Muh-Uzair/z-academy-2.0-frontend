import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

        return await res.json();
      },
      onError: (error) => {
        console.log("Error:", error);
      },
      onSuccess: () => {
        router.push("/verify-otp?userType=student");
      },
    });

  return { mutateRegisterStudent, statusRegisterStudent };
};
