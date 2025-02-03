import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table";
import { Outlet } from "react-router";

export function Tasks() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <DataTable columns={columns} />
      <Outlet />
    </div>
  );
}
