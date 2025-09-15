import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateStudentProfile = ({
  setIsEditing,
}: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateUpdateStudentProfile,
    status: statusUpdateStudentProfile,
  } = useMutation({
    mutationFn: async ({
      formData,
    }: {
      formData: {
        name: string;
        bio?: string | undefined;
      };
    }) => {
      const res = await fetch(`/api/student/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({})); // fallback if not JSON
        throw new Error(errorData?.message || "Profile update failed");
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });
      toast.success("Course updated success");
      setIsEditing(false);
    },
    onError: (error) => {
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Profile update failed");
      }
    },
  });

  return { mutateUpdateStudentProfile, statusUpdateStudentProfile };
};
