import { Routes, Route } from "react-router-dom";
import Storage from "@/pages/Storage";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./layouts/AppSidebar";
import { ROUTES } from "./constants";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <SidebarProvider className="flex flex-col">
        <div className="flex items-center">
          <AppSidebar />
          <Routes>
            <Route path={ROUTES.ROOT} element={<Home />} />
            <Route path={`${ROUTES.STORAGE}/*`} element={<Storage />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </div>
      </SidebarProvider>
    </>
  );
}
