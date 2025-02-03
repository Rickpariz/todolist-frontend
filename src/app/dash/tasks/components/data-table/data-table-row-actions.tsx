import { Row } from "@tanstack/react-table";
import { MoreHorizontal, LoaderCircle } from "lucide-react";

import { statuses } from "./data/data";
import { taskSchema } from "./data/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTaskChangeStatus } from "../../hooks/use-task-change-status.hook";
import { useTaskDesactive } from "../../hooks/use-task-desactive.hook";
import { useNavigate } from "react-router";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const navigate = useNavigate();
  const { onChangeStatus, isLoadingChangeStatus } = useTaskChangeStatus();
  const { onDesactive, isLoadingDesactive } = useTaskDesactive();

  const handleChangeStatus = (status: string) => {
    onChangeStatus({
      id: task.id,
      status: status as "pending" | "in_progress" | "completed",
    });
  };

  const handleDesactive = () => {
    onDesactive({ id: task.id });
  };

  const handleView = () => {
    navigate(`${task.id}`);
  };

  const handleUpdate = () => {
    navigate(`${task.id}/update`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          {isLoadingChangeStatus || isLoadingDesactive ? (
            <div className="animate-spin">
              <LoaderCircle />
            </div>
          ) : (
            <>
              <MoreHorizontal />
              <span className="sr-only">Abrir menu</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleView}>Visualizar</DropdownMenuItem>
        <DropdownMenuItem onClick={handleUpdate}>Editar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={task.status.toString()}
              onValueChange={handleChangeStatus}
            >
              {statuses.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDesactive}>Apagar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
