import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate, useParams } from "react-router";
import { LoaderCircle } from "lucide-react";
import { TaskForm } from "../components/task-form";
import { useTaskDetails } from "../hooks/use-task-details.hook";

export function TaskUpdate() {
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
          <TaskForm task={task} />
        )}
      </DialogContent>
    </Dialog>
  );
}
