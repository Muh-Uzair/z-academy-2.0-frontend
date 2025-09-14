import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: mutateLogin, status: statusLogin } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    },
    onError: () => {
      toast.error("User login failed");
    },
    onSuccess: async (data: {
      data: { jwt: string; user: { userType: "student" | "instructor" } };
    }) => {
      const { jwt } = data?.data;
      localStorage.setItem("jwt", jwt);

      // ✅ Force refetch immediately
      await queryClient.refetchQueries({
        queryKey: ["currUser"],
        type: "active",
      });

      if (data?.data?.user?.userType === "student") {
        router.push("/dashboard/student/home");
      }
      if (data?.data?.user?.userType === "instructor") {
        router.push("/dashboard/instructor/home");
      }
    },
  });

  return { mutateLogin, statusLogin };
};
