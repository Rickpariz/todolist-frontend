import { Outlet } from "react-router";
import { Header } from "./components/header";

export function Dash() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
