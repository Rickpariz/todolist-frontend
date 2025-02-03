import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type DesactiveTaskData = {
  id: number;
};

export const useTaskDesactive = () => {
  const queryClient = useQueryClient();

  const { mutate: onDesactive, isPending: isLoadingDesactive } = useMutation({
    mutationFn: async (data: DesactiveTaskData) =>
      api.delete(`/tasks/${data.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => console.log(error),
  });

  return {
    onDesactive,
    isLoadingDesactive,
  };
};
