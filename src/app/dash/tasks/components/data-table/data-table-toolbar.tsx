import { Table } from "@tanstack/react-table";
import { Plus, X } from "lucide-react";

import { statuses } from "./data/data";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-facted-filter";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { useSearch } from "@/hooks/use-search";
import { useNavigate } from "react-router";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const navigate = useNavigate();
  const isFiltered = table.getState().columnFilters.length > 0;
  const { value: filterValue, setValue: setFilterValue } = useSearch<string>(
    (table.getColumn("title")?.getFilterValue() as string) ?? "",
    500,
    (debouncedValue) => {
      table.getColumn("title")?.setFilterValue(debouncedValue);
    }
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar tarefas"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              table.setPageIndex(0);
              setFilterValue("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Limpar
            <X />
          </Button>
        )}
      </div>
      <div className="flex gap-2 items-center justify-center">
        <Button
          size="sm"
          className="h-8 border-dashed"
          onClick={() => navigate("/dash/tasks/create")}
        >
          <Plus />
          <span className="hidden lg:flex">Nova tarefa</span>
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
