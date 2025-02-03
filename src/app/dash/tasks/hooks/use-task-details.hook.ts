import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useTaskDetails = (id: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`task-${id}`],
    queryFn: async () => api.get(`/tasks/${id}`),
  });

  return {
    task: data?.data,
    isLoading: isLoading || isFetching,
  };
};
