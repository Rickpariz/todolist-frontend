import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ChangeStatusData = {
  id: number;
  status: "pending" | "in_progress" | "completed";
};

export const useTaskChangeStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: onChangeStatus, isPending: isLoadingChangeStatus } =
    useMutation({
      mutationFn: async (data: ChangeStatusData) =>
        api.patch(`/tasks/${data.id}`, { status: data.status }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => console.log(error),
    });

  return {
    onChangeStatus,
    isLoadingChangeStatus,
  };
};
