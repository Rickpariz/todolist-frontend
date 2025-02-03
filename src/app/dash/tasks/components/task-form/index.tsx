import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { TaskFormDataWithId, useTask } from "../../hooks/use-task.hook";

interface Props {
  task?: TaskFormDataWithId;
}

export function TaskForm({ task }: Props) {
  const { onSubmit, register, errors, control, isPending } = useTask({
    task,
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Ex: organizar projeto..."
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Ex: organizar estrutura do projeto..."
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="in_progress">Em progresso</SelectItem>
                <SelectItem value="completed">Concúido</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="dueDate">Data limite</Label>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => {
            return (
              <div className="relative">
                <Input
                  id="dueDate"
                  type="date"
                  className="date-input"
                  onChange={(e) => field.onChange(e.target.value)}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                />
              </div>
            );
          }}
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm">
            {errors.dueDate.type === "invalid_type"
              ? "A data limite é obrigatória"
              : errors.dueDate.message}
          </p>
        )}
      </div>
      <Button disabled={isPending} type="submit">
        {isPending ? "Salvando..." : task?.id ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  );
}
