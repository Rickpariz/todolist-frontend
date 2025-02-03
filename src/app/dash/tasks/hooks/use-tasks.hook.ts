import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

export type ChangeStatusData = {
  id: number;
  status: "pending" | "in_progress" | "completed";
};

export const useTasks = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState<SortingState>([]);

  const [orderBy] = sorting;
  const statusFilter = columnFilters.find((c) => c.id === "status");
  const searchFilter = columnFilters.find((c) => c.id === "title");

  const { data: response, isLoading: isLoadingTasks } = useQuery({
    queryKey: [
      "tasks",
      pagination.pageIndex,
      pagination.pageSize,
      orderBy,
      statusFilter,
      searchFilter,
    ],
    queryFn: () =>
      api.get("/tasks", {
        params: {
          pageNumber: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
          ...(searchFilter ? { search: searchFilter.value } : {}),
          ...(statusFilter
            ? {
                status: statusFilter.value,
              }
            : {}),
          ...(orderBy
            ? {
                orderBy: {
                  field: orderBy.id,
                  direction: orderBy.desc ? "desc" : "asc",
                },
              }
            : {}),
        },
      }),
  });

  return {
    tasks: response?.data,
    isLoadingTasks,

    // Pagination
    pagination,
    setPagination,

    // Sorting
    sorting,
    setSorting,

    // filters
    columnFilters,
    setColumnFilters,
  };
};
