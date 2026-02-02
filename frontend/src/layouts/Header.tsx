import { ThemeToggle } from "@/components/themeToggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Upload } from "lucide-react";

export default function Header() {
  return (
    <div className="relative flex items-center justify-between p-3 border-b shadow-md z-20 bg-background">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <Button>
          Upload <Upload />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
