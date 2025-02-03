import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const TaskSchema = z.object({
  title: z.string().nonempty("O título é obrigatório"),
  description: z.string().nonempty("A descrição é obrigatória"),
  status: z.enum(["pending", "in_progress", "completed"]),
  dueDate: z.string(),
});

export type TaskFormData = z.infer<typeof TaskSchema>;
export type TaskFormDataWithId = TaskFormData & { id: number };

interface Props {
  task?: TaskFormDataWithId;
}

export const useTask = ({ task }: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      status: "pending",
    },
  });

  useEffect(() => {
    if (!task) return;
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("status", task.status);
    setValue("dueDate", task.dueDate);
  }, [task, setValue]);

  const { mutate: onLogin, isPending } = useMutation({
    mutationFn: async (data: TaskFormData) => {
      const dueDate = new Date(data.dueDate).toISOString();
      if (task && task.id) {
        return api.patch(`/tasks/${task.id}`, { ...data, dueDate });
      } else {
        return api.post("/tasks", { ...data, dueDate });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate(-1);
    },
    onError: (error) => {
      const toastParams = {
        title: "Erro ao criar tarefa",
        description: "Ocorreu um erro ao criar a tarefa, tente novamente",
        variant: "destructive" as const,
      };

      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toastParams.description = "Já existe uma tarefa com esse nome";
        }
      }

      toast(toastParams);
    },
  });

  const onSubmit = handleSubmit((data: TaskFormData) => onLogin(data));

  return {
    register,
    control,
    isPending,
    onSubmit,
    errors,
  };
};
