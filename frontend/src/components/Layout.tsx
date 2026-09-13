import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex bio-grid-bg min-h-screen">
      <Sidebar />
      <main className="flex-1 px-4 md:px-8 py-6 max-w-[1400px] mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
