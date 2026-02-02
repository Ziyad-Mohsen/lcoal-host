import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./layouts/AppSidebar";

export default function App() {
  return (
    <>
      <SidebarProvider className="flex flex-col">
        <div className="flex items-center">
          <AppSidebar />
          <Routes>
            <Route path="/*" element={<Home />} />

            {/* TODO: Create custom not found page */}
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </div>
      </SidebarProvider>
    </>
  );
}
