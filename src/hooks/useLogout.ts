import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setOpenDialog?: Dispatch<SetStateAction<boolean>>;
}

export const useLogout = ({ setOpenDialog }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: mutateLogout, status: statusLogout } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    },
    onSuccess: () => {
      // Close dialog
      if (setOpenDialog) {
        setOpenDialog(false);
      }

      // Invalidate the current user query
      queryClient.invalidateQueries({ queryKey: ["currUser"] });

      // Redirect home
      router.push("/");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return { mutateLogout, statusLogout };
};
