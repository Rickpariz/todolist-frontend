import { CheckCircle, Circle, Timer } from "lucide-react";

export const statuses = [
  {
    value: "pending",
    label: "Pendente",
    icon: Circle,
  },
  {
    value: "in_progress",
    label: "Em progresso",
    icon: Timer,
  },
  {
    value: "completed",
    label: "Finalizado",
    icon: CheckCircle,
  },
];
