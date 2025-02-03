import { Badge } from "@/components/ui/badge";
import { statuses } from "../data-table/data/data";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200",
  in_progress: "bg-blue-100 text-blue-700 group-hover:bg-blue-200",
  completed: "bg-green-100 text-green-700 group-hover:bg-green-200",
};

export function TaskStatus(props: { status: string }) {
  const status = statuses.find((status) => status.value === props.status);

  if (!status) {
    return null;
  }

  return (
    <div className="group min-w-[120px]">
      <Badge
        className={statusColors[status.value as keyof typeof statusColors]}
      >
        {status.icon && (
          <status.icon
            className={`mr-2 h-4 w-4 ${
              statusColors[status.value as keyof typeof statusColors]
            }`}
          />
        )}
        <span>{status.label}</span>
      </Badge>
    </div>
  );
}
