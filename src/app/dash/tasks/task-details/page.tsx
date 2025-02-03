import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "@/lib/date";
import { useNavigate, useParams } from "react-router";
import { TaskStatus } from "../components/task-status";
import { LoaderCircle } from "lucide-react";
import { useTaskDetails } from "../hooks/use-task-details.hook";

export function TaskDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const { task, isLoading } = useTaskDetails(taskId ? parseInt(taskId) : 0);

  if (!taskId) return null;

  return (
    <Dialog defaultOpen onOpenChange={() => navigate(-1)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task?.title}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex justify-center mt-2">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Descrição</h4>
              <p className="text-sm text-gray-500">{task?.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Status</h4>
              <TaskStatus status={task?.status} />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Data limite</h4>
              <Badge variant="outline">{format(task?.dueDate, "PP")}</Badge>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
